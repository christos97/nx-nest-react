FROM node:16.20.0

WORKDIR /usr/src/app

RUN apt -y update && apt -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY --chown=node:node dist/apps/render-service/package.json ./

RUN npm install --prod

COPY --chown=node:node dist/apps/render-service ./

CMD [ "main" ]
