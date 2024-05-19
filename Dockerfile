FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# This is necessary because the API is not waiting for the DB server to be ready before trying to connect to it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

EXPOSE 8080

CMD [ "node", "/usr/src/app/dist/server.js" ]