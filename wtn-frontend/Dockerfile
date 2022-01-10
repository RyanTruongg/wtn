FROM node:14.17-alpine3.14

WORKDIR /app

COPY /build/ ./build

RUN yarn global add serve

CMD ["serve", "-s", "build"]