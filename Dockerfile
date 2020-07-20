FROM nginx:alpine

EXPOSE 5000

COPY workflow-frontend /workflow-frontend

WORKDIR /workflow-frontend
# Clean up already installed stuff
RUN rm -rf node_modules

RUN apk add yarn
RUN yarn install
RUN yarn build

RUN rm -rf /usr/share/nginx/html
RUN cp nginx.conf /etc/nginx/nginx.conf
RUN cp -avr dist /usr/share/nginx/html
