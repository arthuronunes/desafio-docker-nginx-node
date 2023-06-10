FROM node:14.17.0-slim

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "npm", "start"]