from fastapi import APIRouter, Depends, HTTPException
from .auth import get_current_user
from . import db

router = APIRouter(prefix='/api/reservations')


@router.get('')
def list_reservations(email: str = Depends(get_current_user)):
    with db.get_db() as conn:
        counts = db.get_reservation_counts(conn)
        mine = db.get_my_reservations(conn, email)
        item_ids = [it['id'] for it in db.list_items(conn)]
    return {
        item_id: {'count': counts.get(item_id, 0), 'mine': item_id in mine}
        for item_id in item_ids
    }


@router.post('/{item_id}')
def reserve(item_id: int, email: str = Depends(get_current_user)):
    with db.get_db() as conn:
        item = db.get_item(conn, item_id)
        if item is None:
            raise HTTPException(status_code=404, detail='Item not found')
        ok = db.reserve(conn, item_id, email, item['qty'])
    if not ok:
        raise HTTPException(status_code=409, detail='Already reserved or qty exceeded')
    return {'ok': True}


@router.delete('/{item_id}')
def unreserve(item_id: int, email: str = Depends(get_current_user)):
    with db.get_db() as conn:
        item = db.get_item(conn, item_id)
        if item is None:
            raise HTTPException(status_code=404, detail='Item not found')
        ok = db.unreserve(conn, item_id, email)
    if not ok:
        raise HTTPException(status_code=404, detail='Reservation not found')
    return {'ok': True}
