FROM node:14-slim
WORKDIR /srre-crm-api
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]