FROM node:16.7-alpine as nodejs

ADD ./apps/api /app/apps/api
ADD ./package.json /app/package.json
ADD ./nest-cli.json /app/nest-cli.json
ADD ./shared/utils /app/shared/utils

WORKDIR  /app

RUN npm install --legacy-peer-deps
RUN npm run build:api
CMD ["node", "apps/api/dist/apps/api/src/main"]


