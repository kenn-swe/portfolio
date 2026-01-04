FROM node:25.2.1-alpine3.22 AS base

WORKDIR /app
COPY resources/tmp/app/package.json .

RUN npm install --silent
COPY resources/tmp/app .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host" ]
