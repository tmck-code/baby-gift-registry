from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from .auth import require_admin
from .items import serialize
from . import db

router = APIRouter(prefix='/api/admin')


class ItemCreate(BaseModel):
    title: str = Field(min_length=1)
    qty: int = Field(default=1, ge=1)
    store: str = ''
    category: str = 'nursery'
    image: str | None = None
    url: str | None = None
    icon: str = 'gift'
    tint: str = 'var(--sage-100)'
    most_wanted: bool = False


class ItemUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    qty: int | None = Field(default=None, ge=1)
    store: str | None = None
    category: str | None = None
    image: str | None = None
    url: str | None = None
    icon: str | None = None
    tint: str | None = None
    most_wanted: bool | None = None


def _clean(fields: dict) -> dict:
    '''Normalise payloads: blank image/url become NULL, bools become ints.'''
    out = dict(fields)
    for key in ('image', 'url'):
        if key in out and isinstance(out[key], str) and not out[key].strip():
            out[key] = None
    if 'most_wanted' in out and out['most_wanted'] is not None:
        out['most_wanted'] = int(bool(out['most_wanted']))
    return out


@router.get('/reservations')
def all_reservations(admin=Depends(require_admin)):
    with db.get_db() as conn:
        rows = db.get_all_reservations(conn)

    grouped: dict[int, list[dict]] = {}
    for row in rows:
        item_id = row['item_id']
        grouped.setdefault(item_id, []).append({
            'email': row['email'],
            'created_at': row['created_at'],
        })

    return [
        {'item_id': item_id, 'reservations': reservations}
        for item_id, reservations in sorted(grouped.items())
    ]


@router.get('/items')
def list_items(admin=Depends(require_admin)):
    with db.get_db() as conn:
        items = db.list_items(conn)
        rows = db.get_all_reservations(conn)

    reservations: dict[int, list[dict]] = {}
    for row in rows:
        reservations.setdefault(row['item_id'], []).append({
            'email': row['email'],
            'created_at': row['created_at'],
        })

    result = []
    for it in items:
        out = serialize(it)
        out['reservations'] = reservations.get(it['id'], [])
        out['reservedCount'] = len(out['reservations'])
        result.append(out)
    return result


@router.post('/items', status_code=201)
def create_item(body: ItemCreate, admin=Depends(require_admin)):
    with db.get_db() as conn:
        item = db.create_item(conn, _clean(body.model_dump()))
    return serialize(item)


@router.put('/items/{item_id}')
def update_item(item_id: int, body: ItemUpdate, admin=Depends(require_admin)):
    fields = _clean(body.model_dump(exclude_unset=True))
    with db.get_db() as conn:
        item = db.update_item(conn, item_id, fields)
    if item is None:
        raise HTTPException(status_code=404, detail='Item not found')
    return serialize(item)


@router.delete('/items/{item_id}')
def delete_item(item_id: int, admin=Depends(require_admin)):
    with db.get_db() as conn:
        ok = db.delete_item(conn, item_id)
    if not ok:
        raise HTTPException(status_code=404, detail='Item not found')
    return {'ok': True}
