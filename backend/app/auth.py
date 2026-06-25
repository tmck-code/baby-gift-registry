import os
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix='/api/auth')


def read_secret(env_var: str) -> str:
    file_var = env_var + '_FILE'
    path = os.getenv(file_var)
    if path:
        with open(path) as f:
            return f.read().rstrip()
    return os.getenv(env_var, '')


class LoginBody(BaseModel):
    email: str
    password: str


class AdminLoginBody(BaseModel):
    password: str


@router.post('/login')
async def login(body: LoginBody, request: Request):
    if body.password != read_secret('GUEST_PASSWORD'):
        raise HTTPException(status_code=401, detail='Invalid password')
    request.session['email'] = body.email
    return {'email': body.email}


@router.post('/logout')
async def logout(request: Request):
    request.session.clear()
    return {'ok': True}


@router.get('/me')
async def me(request: Request):
    email = request.session.get('email')
    if not email:
        raise HTTPException(status_code=401, detail='Not authenticated')
    return {'email': email}


@router.post('/admin-login')
async def admin_login(body: AdminLoginBody, request: Request):
    if body.password != read_secret('ADMIN_PASSWORD'):
        raise HTTPException(status_code=401, detail='Invalid password')
    request.session['is_admin'] = True
    return {'is_admin': True}


def get_current_user(request: Request) -> str:
    email = request.session.get('email')
    if not email:
        raise HTTPException(status_code=401, detail='Not authenticated')
    return email


def require_admin(request: Request) -> None:
    if not request.session.get('is_admin'):
        raise HTTPException(status_code=401, detail='Admin required')
