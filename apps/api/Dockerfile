FROM node:16-alpine

WORKDIR /usr/src/app

COPY --chown=node:node dist/apps/api/package.json ./

RUN npm install --prod

COPY --chown=node:node dist/apps/api ./

CMD [ "main" ]
