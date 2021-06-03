import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import fastifyCors from 'fastify-cors';
import { readFileSync } from 'fs';
import { Server } from 'socket.io';
import { IRoomStorage } from './room-storage/room-storage';
import { InmemoryRoomStorage } from './room-storage/room-storage.inmemory';
import {
  HostRequest,
  StartStreamRequest,
  StartStreamResponse,
  StopStreamRequest,
} from '../../common/contract/streamer';
import {
  ConnectRequest,
  ConnectResponse,
  ConnectStreamRequest,
  ConnectStreamResponse,
  JoinRequest,
  JoinResponse,
} from '../../common/contract/viewer';

const isDev = process.env.NODE_ENV !== 'production';
const app = fastify({
  https: {
    key: readFileSync(join(__dirname, '..', 'localhost-key.pem')),
    cert: readFileSync(join(__dirname, '..', 'localhost.pem')),
  },
});

const io = new Server(app.server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
// let roomStorage: IRoomStorage;

if (!isDev) {
  console.log('Running in production');
  // roomStorage = new InmemoryRoomStorage();
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'client'),
  });
  app.get('/', (request, reply) => {
    reply.sendFile('index.html');
  });
  app.get('/stream/:id', (request, reply) => {
    reply.sendFile('index.html');
  });
}
if (isDev) {
  console.log('Running in development');
  // roomStorage = new InmemoryRoomStorage();
  app.register(fastifyCors);
}

io.on('connection', (socket) => {
  socket.on('host', (req: HostRequest) => {
    console.log('Hosting room');
    // roomStorage.create(req.streamerId);
    socket.join(req.streamerId);
    socket.to(req.streamerId).emit('room-hosted');
  });
  socket.on('start-stream', (req: StartStreamRequest) => {
    console.log('Starting stream');
    // roomStorage.startStream(req.streamerId, req.offer);
    const res: StartStreamResponse = {
      offer: req.offer,
    };
    socket.to(req.streamerId).emit('stream-started', res);
  });
  socket.on('stop-stream', (req: StopStreamRequest) => {
    console.log('Stopping stream');
    // roomStorage.stopStream(req.streamerId);
    socket.to(req.streamerId).emit('stream-stopped');
  });
  socket.on('join', (req: JoinRequest) => {
    console.log('Joining room');
    // const offer = roomStorage.join(req.streamerId, req.viewerId);
    socket.join(req.streamerId);
    socket.emit('room-joined');
  });
  // socket.on('connect-stream', (req: ConnectRequest) => {
  //   console.log('Connecting stream');
  //   // const offer = roomStorage.join(req.streamerId, req.viewerId);
  //   const response: ConnectResponse = {
  //     offer: ,
  //   };
  //   socket.emit('stream-connected', response);
  // });
  socket.on('set-answer', async (req: ConnectStreamRequest) => {
    console.log('Answer');
    const response: ConnectStreamResponse = {
      answer: req.answer,
    };
    socket.to(req.streamerId).emit('answer', response);
  });
  socket.on(
    'add-ice-candidate',
    async (req: { streamerId: string; candidate: any }) => {
      console.log('add-ice-candidate', req.candidate);
      if (!req.candidate) {
        console.log('empty candidate');
        return;
      }
      socket.to(req.streamerId).emit('ice-candidate', { candidate: req.candidate });
    }
  );
});

app.listen(process.env.PORT ?? 9000, '0.0.0.0', (err, address) =>
  console.log(`Fastify listening on ${address}`)
);
