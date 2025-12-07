FROM node:21-alpine3.18 AS base

WORKDIR /app
COPY resources/tmp/app/package.json .

RUN npm install --silent
COPY resources/tmp/app .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host" ]
