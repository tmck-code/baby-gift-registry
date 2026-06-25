# Backend source of truth for item quantities (max reservations per item).
# Mirrors qty fields from src/data.js.

ITEM_QTY: dict[int, int] = {
    1:  1,   # Muslin swaddle set
    2:  1,   # Walnut crib
    3:  1,   # Blackout cloud nightlight
    4:  1,   # Bottle starter kit
    5:  1,   # High chair, oat
    6:  1,   # Convertible car seat
    7:  1,   # Compact stroller
    8:  1,   # Soft cloth book bundle
    9:  1,   # Wooden play gym
    10: 1,   # The nursery glider (group gift)
    11: 1,   # First-year diaper fund (group gift)
    12: 1,   # Lambskin play mat
}
