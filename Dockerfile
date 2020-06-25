FROM node:12

EXPOSE 5000

# "keycloak-client" is a local module dependency of workflow-frontend

COPY workflow-frontend /workflow-frontend
COPY keycloak-client /keycloak-client

WORKDIR /workflow-frontend
RUN yarn install

CMD yarn start
