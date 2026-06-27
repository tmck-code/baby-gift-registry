from fastapi import APIRouter, Depends
from .auth import get_current_user
from . import db

router = APIRouter(prefix='/api/items')

# Initial registry, used to seed the items table on first run. After that the
# table is the source of truth and items are managed via the admin interface.
SEED_ITEMS: list[dict] = [
    {'title': 'Muslin swaddles', 'store': 'Any brand', 'category': 'nursery', 'qty': 5, 'icon': 'baby', 'tint': 'var(--sage-100)', 'most_wanted': 1},
    {'title': 'Walnut crib', 'store': 'Crate & Kids', 'category': 'nursery', 'qty': 1, 'icon': 'bed', 'tint': 'var(--terracotta-100)', 'url': 'https://www.crateandbarrel.com/'},
    {'title': 'Blackout cloud nightlight', 'store': 'Hatch', 'category': 'nursery', 'qty': 1, 'icon': 'moon', 'tint': 'var(--ink-100)'},
    {'title': 'Bottle starter kit', 'store': "Dr. Brown's", 'category': 'feeding', 'qty': 2, 'icon': 'milk', 'tint': 'var(--honey-100)'},
    {'title': 'High chair', 'store': 'Lalo', 'category': 'feeding', 'qty': 1, 'icon': 'utensils', 'tint': 'var(--sage-100)', 'most_wanted': 1},
    {'title': 'Pyjamas (0–3m)', 'store': 'Any brand', 'category': 'nursery', 'qty': 5, 'icon': 'shirt', 'tint': 'var(--terracotta-100)'},
    {'title': 'Convertible car seat', 'store': 'Nuna', 'category': 'travel', 'qty': 1, 'icon': 'car', 'tint': 'var(--ink-100)'},
    {'title': 'Soft cloth books', 'store': 'Any brand', 'category': 'play', 'qty': 4, 'icon': 'book-open', 'tint': 'var(--honey-100)'},
    {'title': 'Wooden play gym', 'store': 'Lalo', 'category': 'play', 'qty': 1, 'icon': 'puzzle', 'tint': 'var(--sage-100)'},
    {'title': 'Newborn onesies', 'store': 'Any brand', 'category': 'nursery', 'qty': 6, 'icon': 'shirt', 'tint': 'var(--terracotta-100)'},
    {'title': 'Burp cloths', 'store': 'Any brand', 'category': 'feeding', 'qty': 4, 'icon': 'droplet', 'tint': 'var(--honey-100)'},
    {'title': 'Lambskin play mat', 'store': 'Binibamba', 'category': 'nursery', 'qty': 1, 'icon': 'square', 'tint': 'var(--sage-100)'},
]


def serialize(item: dict) -> dict:
    '''Convert a DB row into the shape the frontend expects.'''
    return {
        'id': item['id'],
        'title': item['title'],
        'store': item['store'],
        'category': item['category'],
        'qty': item['qty'],
        'image': item['image'],
        'url': item['url'],
        'icon': item['icon'],
        'tint': item['tint'],
        'mostWanted': bool(item['most_wanted']),
    }


@router.get('')
def list_gifts(email: str = Depends(get_current_user)):
    with db.get_db() as conn:
        return [serialize(it) for it in db.list_items(conn)]
