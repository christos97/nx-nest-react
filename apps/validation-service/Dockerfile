FROM node:16-alpine

WORKDIR /usr/src/app

COPY --chown=node:node dist/apps/validation-service/package.json ./

RUN npm install --prod

COPY --chown=node:node dist/apps/validation-service ./

CMD [ "main" ]
