# Run the container with `docker run -p 3000:3000 -t server`.
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --chown=node:node dist/apps/i18n-service/package.json ./

RUN npm install --prod

COPY --chown=node:node dist/apps/i18n-service ./

CMD [ "main" ]

