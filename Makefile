docker-build-frontend-prod:
	docker build -t frontend ./frontend
docker-build-backend-prod:
	docker build -t backend ./backend
docker-run-prod:
	make docker-build-frontend-prod
	make docker-build-backend-prod
	docker-compose up -d