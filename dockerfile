FROM node:lts as modules

WORKDIR /modules
COPY package.json .
COPY client/package.json ./client
COPY server/package.json ./server
RUN npm run install-deps

FROM node:lts as builder

WORKDIR /app

COPY --from=modules /modules .
COPY . .
RUN npm run build
RUN cd build/server && npm install

FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/build /app

ENV NODE_ENV=production
CMD [ "node","build/server/app.js" ]