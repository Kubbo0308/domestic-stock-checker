# include .env

# 変数設定
BACKEND_CONTAINER := backend

# コマンド
.PHONY: build
build:
	docker compose build --no-cache

.PHONY: up
up:
	docker compose up

.PHONY: down
down:
	docker compose down

.PHONY: ps
ps:
	docker compose ps

.PHONY: restart
restart:
	docker compose up --force-recreate --build --abort-on-container-exit

.PHONY: up-backend
up-backend:
	docker compose up -d ${BACKEND_CONTAINER}

backend-container: up-backend
	docker compose exec ${BACKEND_CONTAINER} bash

generate-mock-data-for-test: up-backend
	./scripts/generate-mock-data-for-test.sh ${BACKEND_CONTAINER}