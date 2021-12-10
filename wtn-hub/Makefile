
export PROJECT_DIR=${shell cd .. && pwd}
export BACKEND_DIR=${shell cd .. && cd wtn-backend && pwd}
export FRONTEND_DIR=${shell cd .. && cd wtn-frontend && pwd}
export DATABASE_DIR=${shell cd .. && cd wtn-db && pwd}

export HUB_DIR=${shell pwd}

export SERVICE_NAME=wtn
export BACKEND_PORT=7001
export REACT_APP_PORT=3000

setup:
	docker network create wtn-database-net

clear-setup:
	docker network rm wtn-database-net

clear-image:
	docker image rm wtn-frontend-image && \
	docker image rm wtn-backend-image

start:
	export $(shell grep -v '^#' env/backend.env | xargs) && \
	export $(shell grep -v '^#' env/postgres.env | xargs) && \
	export $(shell grep -v '^#' env/frontend.env | xargs) && \
	docker-compose \
	-f docker-compose.yml \
	up -d

build:
	export $(shell grep -v '^#' env/backend.env | xargs) && \
	export $(shell grep -v '^#' env/postgres.env | xargs) && \
	export $(shell grep -v '^#' env/frontend.env | xargs) && \
	docker-compose \
	-f docker-compose.yml \
	up -d --build

restart:
	make stop && make start


get-db-ip:
	docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' wtn-database

stop:
	docker-compose \
	-f docker-compose.yml \
	down