# Detect host architecture (amd64/arm64); override with PLATFORM=linux/amd64
HOST_ARCH    := $(shell docker version --format '{{.Server.Arch}}')
PLATFORM     ?= linux/$(HOST_ARCH)
PLATFORM_ARG := --set "*.platform=$(PLATFORM)"

ENV   ?= dev
IMAGE ?= baby-gift-registry
TAG   ?= dev

# DB bind-mount dir on the host; must be owned by the container user (uid 999).
DB_DIR  ?= dbs/db-data
APP_UID ?= 999
APP_GID ?= 999

# Service name differs per profile: dev uses 'web', prod uses 'web-prod'
SVC = $(if $(filter prod,$(ENV)),web-prod,web)

COMPOSE   = docker compose --profile $(ENV) --env-file ops/deployments/$(ENV).env
BAKE      = docker buildx bake --file docker-bake.hcl
NO_CACHE  ?=
CACHE_ARG  = $(if $(filter 1,$(NO_CACHE)),--no-cache,)

.PHONY: build serve logs down shell uv/update check-secrets prepare-data help

help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n\nTargets:\n"} \
	  /^[a-zA-Z_\/%-]+:.*##/ { printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build: ## Build the web image
	IMAGE='$(IMAGE)' TAG='$(TAG)' $(BAKE) $(CACHE_ARG) $(PLATFORM_ARG) web

serve: check-secrets build ## Build and start the stack (logs follow; ctrl-c brings it down)
	$(COMPOSE) up -d --remove-orphans $(SVC)
	$(COMPOSE) logs -f
	$(COMPOSE) down

logs: ## Tail web service logs
	$(COMPOSE) logs -f $(SVC)

down: ## Stop and remove containers
	$(COMPOSE) down

shell: ## Open a shell in the running web container
	$(COMPOSE) exec $(SVC) bash

uv/update: ## Update uv lockfile via the built image (keeps uv off the host)
	docker run --rm \
	  -v $(PWD)/pyproject.toml:/app/pyproject.toml \
	  -v $(PWD)/uv.lock:/app/uv.lock \
	  $(IMAGE):uv bash -c "cd /app && uv sync --all-groups"

prepare-data: ## Create the DB bind-mount dir owned by the container user (uid 999); run once on a Linux server
	@mkdir -p $(DB_DIR)
	@owner=$$(stat -c '%u' $(DB_DIR) 2>/dev/null || stat -f '%u' $(DB_DIR)); \
	if [ "$$owner" = "$(APP_UID)" ]; then \
	  echo "$(DB_DIR) already owned by $(APP_UID); nothing to do."; \
	else \
	  echo "Chowning $(DB_DIR) to $(APP_UID):$(APP_GID) (sudo)…"; \
	  sudo chown -R $(APP_UID):$(APP_GID) $(DB_DIR); \
	fi

check-secrets: ## Verify prod secret files exist (no-op in dev)
	@if [ "$(ENV)" = "prod" ]; then \
	  for f in ops/deployments/secrets/guest_password \
	           ops/deployments/secrets/admin_password \
	           ops/deployments/secrets/session_secret; do \
	    test -f "$$f" || { echo "Missing secret file: $$f"; exit 1; }; \
	  done; \
	fi
