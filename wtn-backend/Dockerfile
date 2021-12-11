FROM node:14.17-alpine3.14

RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

# RUN npm install --platform=linux --arch=x64 --ignore-scripts=false --verbose

RUN yarn install

RUN yarn add sharp

CMD [ "yarn", "dev" ]