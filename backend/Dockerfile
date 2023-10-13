FROM node:14.21.3-alpine3.17
WORKDIR /srre-crm-api
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]