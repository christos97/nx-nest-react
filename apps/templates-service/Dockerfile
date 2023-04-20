FROM node:16.20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY ./dist/apps/templates-service/ ./

RUN pnpm install --frozen-lockfile --prod

CMD [ "node", "./main" ]
