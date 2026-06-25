from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from .auth import router as auth_router, read_secret
from .reservations import router as res_router
from .admin import router as admin_router
from . import db

app = FastAPI()

# Session middleware — must be added before routes
app.add_middleware(SessionMiddleware, secret_key=read_secret('SESSION_SECRET'))

app.include_router(auth_router)
app.include_router(res_router)
app.include_router(admin_router)


@app.on_event('startup')
def startup():
    db.init_db()


# Static files — src/ before public/ so /src/* hits the right mount
app.mount('/src', StaticFiles(directory='src'), name='src')
app.mount('/', StaticFiles(directory='public', html=True), name='public')
