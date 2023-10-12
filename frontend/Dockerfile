#react
FROM node:14-slim as frontend
WORKDIR /srre-crm-frontend
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

#nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=frontend /srre-crm-frontend/dist .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]