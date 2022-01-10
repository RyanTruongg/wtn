FROM node:14.17-alpine3.14

WORKDIR /app

COPY jsconfig.json ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

CMD ["yarn", "start"]
