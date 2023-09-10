FROM node:14

WORKDIR /confectionery-backend

COPY package*.json ./

ARG MONGODB_URI=development
ENV MONGODB_URI=${MONGODB_URI}

RUN npm install

COPY . .

EXPOSE 3004

CMD ["node", "index.js"]
