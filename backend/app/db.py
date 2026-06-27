import os
import sqlite3

DB_PATH = os.getenv('DB_PATH', '/app/data/registry.db')

_DDL = '''
CREATE TABLE IF NOT EXISTS items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    store       TEXT    NOT NULL DEFAULT '',
    category    TEXT    NOT NULL DEFAULT 'nursery',
    qty         INTEGER NOT NULL DEFAULT 1,
    image       TEXT,
    url         TEXT,
    icon        TEXT    NOT NULL DEFAULT 'gift',
    tint        TEXT    NOT NULL DEFAULT 'var(--sage-100)',
    most_wanted INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reservations (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id    INTEGER NOT NULL,
    email      TEXT    NOT NULL COLLATE NOCASE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(item_id, email)
);
'''

# Columns an admin may set when creating/editing an item.
ITEM_COLUMNS = ('title', 'store', 'category', 'qty', 'image', 'url', 'icon', 'tint', 'most_wanted')


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_db() as conn:
        conn.executescript(_DDL)


def seed_items(conn: sqlite3.Connection, items: list[dict]) -> None:
    '''Populate the items table from a seed list, but only when it is empty.'''
    count = conn.execute('SELECT COUNT(*) AS c FROM items').fetchone()['c']
    if count:
        return
    for it in items:
        create_item(conn, it)


# --- items ----------------------------------------------------------------

def list_items(conn: sqlite3.Connection) -> list[dict]:
    rows = conn.execute('SELECT * FROM items ORDER BY id').fetchall()
    return [dict(row) for row in rows]


def get_item(conn: sqlite3.Connection, item_id: int) -> dict | None:
    row = conn.execute('SELECT * FROM items WHERE id = ?', (item_id,)).fetchone()
    return dict(row) if row else None


def create_item(conn: sqlite3.Connection, fields: dict) -> dict:
    cols = [c for c in ITEM_COLUMNS if c in fields]
    placeholders = ', '.join('?' for _ in cols)
    cursor = conn.execute(
        f'INSERT INTO items ({", ".join(cols)}) VALUES ({placeholders})',
        [fields[c] for c in cols],
    )
    conn.commit()
    return get_item(conn, cursor.lastrowid)


def update_item(conn: sqlite3.Connection, item_id: int, fields: dict) -> dict | None:
    cols = [c for c in ITEM_COLUMNS if c in fields]
    if not cols:
        return get_item(conn, item_id)
    assignments = ', '.join(f'{c} = ?' for c in cols)
    cursor = conn.execute(
        f'UPDATE items SET {assignments} WHERE id = ?',
        [fields[c] for c in cols] + [item_id],
    )
    conn.commit()
    if cursor.rowcount == 0:
        return None
    return get_item(conn, item_id)


def delete_item(conn: sqlite3.Connection, item_id: int) -> bool:
    cursor = conn.execute('DELETE FROM items WHERE id = ?', (item_id,))
    conn.execute('DELETE FROM reservations WHERE item_id = ?', (item_id,))
    conn.commit()
    return cursor.rowcount > 0


# --- reservations ---------------------------------------------------------

def get_reservation_counts(conn: sqlite3.Connection) -> dict[int, int]:
    rows = conn.execute(
        'SELECT item_id, COUNT(*) AS cnt FROM reservations GROUP BY item_id'
    ).fetchall()
    return {row['item_id']: row['cnt'] for row in rows}


def get_my_reservations(conn: sqlite3.Connection, email: str) -> set[int]:
    rows = conn.execute(
        'SELECT item_id FROM reservations WHERE email = ?', (email,)
    ).fetchall()
    return {row['item_id'] for row in rows}


def reserve(conn: sqlite3.Connection, item_id: int, email: str, max_qty: int) -> bool:
    current = conn.execute(
        'SELECT COUNT(*) AS cnt FROM reservations WHERE item_id = ?', (item_id,)
    ).fetchone()['cnt']
    if current >= max_qty:
        return False
    try:
        conn.execute(
            'INSERT INTO reservations (item_id, email) VALUES (?, ?)', (item_id, email)
        )
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False


def unreserve(conn: sqlite3.Connection, item_id: int, email: str) -> bool:
    cursor = conn.execute(
        'DELETE FROM reservations WHERE item_id = ? AND email = ?', (item_id, email)
    )
    conn.commit()
    return cursor.rowcount > 0


def get_all_reservations(conn: sqlite3.Connection) -> list[dict]:
    rows = conn.execute(
        'SELECT item_id, email, created_at FROM reservations ORDER BY item_id, created_at'
    ).fetchall()
    return [dict(row) for row in rows]
