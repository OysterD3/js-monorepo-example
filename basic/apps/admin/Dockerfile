FROM node:16.7-alpine as nodejs

ADD ./vite.config.ts /app/vite.config.ts
ADD ./apps/admin /app/apps/admin
ADD ./package.json /app/package.json
ADD ./tsconfig.json /app/tsconfig.json
ADD ./public /app/public
ADD ./shared/utils /app/shared/utils

WORKDIR  /app

RUN npm install --legacy-peer-deps
RUN npm run build:admin

FROM golang:1.17-alpine as golang

ADD ./go.mod /app/go.mod
ADD ./go.sum /app/go.sum
ADD ./apps/portal/main.go /app/main.go

WORKDIR  /app

RUN go mod tidy

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-w -s" -o main ./main.go

FROM alpine:latest

COPY --from=golang /app/main /app/main
COPY --from=nodejs /app/apps/admin/dist /app/dist

WORKDIR  /app

ENTRYPOINT ./main 3000


