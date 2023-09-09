FROM node:17

WORKDIR /confectionary-backend

COPY package*.json ./

ARG MONGODB_URI = development
ENV MONGODB_URI=${MONGODB_URI}

RUN npm install

COPY /pictures /usr/share/nginx/html/pictures

COPY . .

EXPOSE 3004

CMD ["node", "app.js"]