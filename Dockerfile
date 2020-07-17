FROM node:12

EXPOSE 5000

COPY workflow-frontend /workflow-frontend

WORKDIR /workflow-frontend
# Clean up already installed stuff
RUN rm -rf node_modules
RUN yarn install

CMD yarn start
