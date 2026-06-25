import os
import sqlite3

DB_PATH = os.getenv('DB_PATH', '/app/data/registry.db')

_DDL = '''
CREATE TABLE IF NOT EXISTS reservations (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id    INTEGER NOT NULL,
    email      TEXT    NOT NULL COLLATE NOCASE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(item_id, email)
)
'''


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_db() as conn:
        conn.execute(_DDL)


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
