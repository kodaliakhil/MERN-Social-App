FROM node:20.12.2-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start" ]
