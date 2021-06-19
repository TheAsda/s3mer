ARG SENTRY_URL

FROM node:lts as modules

WORKDIR /modules
COPY ./package.json .
COPY ./package-lock.json .
COPY ./client/package.json ./client/
COPY ./client/package-lock.json ./client/
COPY ./server/package.json ./server/
COPY ./server/package-lock.json ./server/
RUN npm run install-deps

FROM node:lts as builder

WORKDIR /app

COPY --from=modules /modules .
COPY . .
ENV VITE_SENTRY_URL=${SENTRY_URL}
RUN npm i -g cross-env
RUN cross-env VITE_SENTRY_URL=${SENTRY_URL} npm run build
RUN cd build/server && npm install --production

FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/build /app

ENV NODE_ENV=production
ENV SENTRY_URL=${SENTRY_URL}
CMD [ "node","server/app.js" ]