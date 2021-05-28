import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import fastifySocket from 'fastify-socket.io';
import { Server } from 'socket.io';

const isDev = process.env.NODE_ENV !== 'production';
const app = fastify();

if (!isDev) {
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'build', 'client'),
  });
  app.get('/', (request, reply) => {
    reply.sendFile('index.html');
  });
}

app.register(fastifySocket, {});

app.get('/connect', (request, reply) => {});

app.ready(() => {
  (app.io as Server).on('connection', (socket) => {
    socket.on('hostRoom', (streamerId: string) => {
      console.log(`Hosting room with id ${streamerId}`);
    });
    socket.on('joinRoom', (streamerId: string, viewerId: string) => {
      console.log(`Viewer ${viewerId} joining room ${streamerId}`);
    });
  });
});

app.listen(process.env.PORT ?? 9000, (err, address) =>
  console.log(`Fastify listening on ${address}`)
);
