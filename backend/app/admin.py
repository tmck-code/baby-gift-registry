from fastapi import APIRouter, Depends
from .auth import require_admin
from . import db

router = APIRouter(prefix='/api/admin')


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
