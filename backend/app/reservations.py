from fastapi import APIRouter, Depends, HTTPException
from .auth import get_current_user
from .items import ITEM_QTY
from . import db

router = APIRouter(prefix='/api/reservations')


@router.get('')
def list_reservations(email: str = Depends(get_current_user)):
    with db.get_db() as conn:
        counts = db.get_reservation_counts(conn)
        mine = db.get_my_reservations(conn, email)
    return {
        item_id: {'count': counts.get(item_id, 0), 'mine': item_id in mine}
        for item_id in ITEM_QTY
    }


@router.post('/{item_id}')
def reserve(item_id: int, email: str = Depends(get_current_user)):
    if item_id not in ITEM_QTY:
        raise HTTPException(status_code=404, detail='Item not found')
    with db.get_db() as conn:
        ok = db.reserve(conn, item_id, email, ITEM_QTY[item_id])
    if not ok:
        raise HTTPException(status_code=409, detail='Already reserved or qty exceeded')
    return {'ok': True}


@router.delete('/{item_id}')
def unreserve(item_id: int, email: str = Depends(get_current_user)):
    if item_id not in ITEM_QTY:
        raise HTTPException(status_code=404, detail='Item not found')
    with db.get_db() as conn:
        ok = db.unreserve(conn, item_id, email)
    if not ok:
        raise HTTPException(status_code=404, detail='Reservation not found')
    return {'ok': True}
