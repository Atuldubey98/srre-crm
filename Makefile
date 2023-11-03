docker-build-frontend-prod:
	docker build -t frontend ./frontend
docker-build-backend-prod:
	docker build -t backend ./backend

## Run this rest will be setup on its own
docker-run-prod:
	make docker-build-frontend-prod
	make docker-build-backend-prod
	docker-compose up -d