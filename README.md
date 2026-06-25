# baby-gift-registry

Gift registry for a baby shower. React SPA frontend served by a FastAPI/uvicorn backend with SQLite reservations.

## Setup

### Prerequisites

- [uv](https://docs.astral.sh/uv/getting-started/installation/) — Python package manager
- Docker with BuildKit

### 1. Generate the lockfile

```bash
uv lock
```

### 2. Create secret files

```bash
echo -n 'your-guest-password' > ops/deployments/secrets/guest_password
echo -n 'your-admin-password' > ops/deployments/secrets/admin_password
python3 -c "import secrets; print(secrets.token_hex(32), end='')" > ops/deployments/secrets/session_secret
```

The guest password is the shared password you give out with invitations. The admin password unlocks the reservation list.

### 3. Build and run

```bash
make serve
```

Visit `http://localhost:8000`.

## Usage

- **Guests** — enter their email and the shared guest password to access the registry and reserve items
- **Admin** — on the login screen, click "Registry owner? Sign in as admin" and enter the admin password to see the full reservation list

## Make targets

```
make build      Build the Docker image
make serve      Build and start (logs follow; ctrl-c brings it down)
make logs       Tail web service logs
make down       Stop and remove containers
make shell      Open a shell in the running container
make uv/update  Update the uv lockfile via the built image
```

## Production

Create TLS certs and place them at:

```
ops/security/certs/fullchain.pem
ops/security/certs/privkey.pem
```

Then run:

```bash
ENV=prod make serve
```

## Customising the registry

Edit `src/data.js` to change gift items, quantities, event details, and categories. The `qty` field on each gift controls how many reservations are allowed (default `1`).

If you change item IDs or quantities, also update `backend/app/items.py` to match — the backend uses that dict to enforce reservation limits.
