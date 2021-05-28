import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';

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

app.get('/kek', (reqest, reply) => {
  reply.send('Hi');
});

app.listen(process.env.PORT ?? 9000, (err, address) =>
  console.log(`Fastify listening on ${address}`)
);
