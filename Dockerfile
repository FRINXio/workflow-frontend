FROM nginx:alpine

EXPOSE 5000

RUN apk add yarn

WORKDIR /workflow-frontend
COPY . .

RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn build

RUN rm -rf /usr/share/nginx/html
RUN cp nginx.conf /etc/nginx/nginx.conf
RUN cp -avr dist /usr/share/nginx/html
