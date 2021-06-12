FROM node:lts as builder

WORKDIR /app
COPY . .
RUN npm run install-deps
RUN npm run build
RUN cd build/server && npm install

FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/build /app

ENV NODE_ENV=production
CMD [ "node","build/server/app.js" ]