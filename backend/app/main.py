import asyncio
import os
import pathlib

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from .auth import router as auth_router, read_secret
from .reservations import router as res_router
from .admin import router as admin_router
from .items import router as items_router, SEED_ITEMS
from . import db

app = FastAPI()

# Session middleware — must be added before routes
app.add_middleware(SessionMiddleware, secret_key=read_secret('SESSION_SECRET'))

app.include_router(auth_router)
app.include_router(res_router)
app.include_router(admin_router)
app.include_router(items_router)


@app.on_event('startup')
def startup():
    db.init_db()
    with db.get_db() as conn:
        db.seed_items(conn, SEED_ITEMS)


# Live-reload (dev only) — the frontend is transpiled in-browser, so uvicorn's
# --reload alone can't refresh it. We stream a fingerprint of the frontend files
# over SSE and inject a snippet into index.html that reloads when it changes.
# Registered before the static mounts so they take precedence over '/' .
if os.getenv('ENV', 'dev') != 'prod':
    _WATCH_DIRS = ('src', 'public')

    def _fingerprint() -> str:
        latest = 0.0
        for d in _WATCH_DIRS:
            for p in pathlib.Path(d).rglob('*'):
                if p.is_file():
                    latest = max(latest, p.stat().st_mtime)
        return f'{latest:.0f}'

    _LIVERELOAD_SNIPPET = """
<script>
  (function () {
    var es = new EventSource('/__livereload');
    es.onmessage = function (e) {
      if (window.__lrToken && window.__lrToken !== e.data) location.reload();
      window.__lrToken = e.data;
    };
  })();
</script>
"""

    @app.get('/', response_class=HTMLResponse)
    @app.get('/index.html', response_class=HTMLResponse)
    async def dev_index():
        html = pathlib.Path('public/index.html').read_text()
        return html.replace('</body>', _LIVERELOAD_SNIPPET + '</body>')

    @app.get('/__livereload')
    async def livereload():
        async def gen():
            while True:
                yield f'data: {_fingerprint()}\n\n'
                await asyncio.sleep(1)
        return StreamingResponse(gen(), media_type='text/event-stream')


# Static files — src/ before public/ so /src/* hits the right mount
app.mount('/src', StaticFiles(directory='src'), name='src')
app.mount('/', StaticFiles(directory='public', html=True), name='public')
