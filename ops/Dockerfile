# syntax=docker/dockerfile:1

##############################################################################
# base-builder — uv + managed Python
##############################################################################
FROM ghcr.io/astral-sh/uv:0.9-trixie-slim AS base-builder

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PYTHON_INSTALL_DIR=/python \
    UV_PYTHON_PREFERENCE=only-managed

RUN rm -f /etc/apt/apt.conf.d/docker-clean && \
    uv python install 3.12

##############################################################################
# web-uv-builder — install web dependency group
##############################################################################
FROM base-builder AS web-uv-builder

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --only-group web

##############################################################################
# web-os-builder — slim Debian base with ca-certificates
##############################################################################
FROM debian:trixie-slim AS web-os-builder

RUN rm -f /etc/apt/apt.conf.d/docker-clean && \
    apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

##############################################################################
# web — final runtime image
##############################################################################
FROM web-os-builder AS web

WORKDIR /app

RUN groupadd --system --gid 999 appuser && \
    useradd --system --gid 999 --uid 999 --create-home appuser

COPY --link --from=web-uv-builder --chown=999:999 /app/.venv /app/.venv
COPY --link --from=web-uv-builder --chown=999:999 /python /python

COPY --chown=appuser:appuser ./backend /app/backend
COPY --chown=appuser:appuser ./public /app/public
COPY --chown=appuser:appuser ./src /app/src

RUN mkdir -p /app/data && chown 999:999 /app/data

ENV PATH="/app/.venv/bin:$PATH"

USER 999

CMD ["python", "-m", "backend"]
