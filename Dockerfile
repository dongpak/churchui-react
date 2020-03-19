FROM node:13.10.1-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
RUN npm install axios

COPY ./public .
COPY ./public/index.html ./public/index.html
COPY ./src .
COPY ./src/index.js ./src/index.js
COPY ./src/index.css ./src/index.css
COPY ./node_modules .

EXPOSE 3000

CMD npm start
