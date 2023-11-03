FROM node:14-slim as frontend
WORKDIR /usr/src/app
COPY ./package.json* ./
RUN npm install
COPY . .
RUN [ "npm", "run", "build" ]

FROM nginx
WORKDIR /etc/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=frontend /usr/src/app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]