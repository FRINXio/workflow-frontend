FROM node:12

EXPOSE 5000

WORKDIR /app

COPY ./ ./

RUN yarn install

CMD yarn start
