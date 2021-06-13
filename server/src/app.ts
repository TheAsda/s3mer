import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import fastifyCors from 'fastify-cors';
import { readFileSync } from 'fs';
import { Server } from 'socket.io';
import { IIdStorage } from './id-storage/id-storage';
import { InmemoryIdStorage } from './id-storage/id-storage.inmemory';
import { SocketEvents } from '../../common/events';
import {
  AnswerRequest,
  AnswerResponse,
  CloseResponse,
  HostRequest,
  HostResponse,
  IceCandidateRequest,
  IceCandidateResponse,
  JoinRequest,
  JoinResponse,
  OfferRequest,
  OfferResponse,
  StartStreamRequest,
  StartStreamResponse,
  StopStreamRequest,
  UpdateViewersListResponse,
} from '../../common/contracts';
import { createLogger, transports, format } from 'winston';

const isDev = process.env.NODE_ENV !== 'production';
const app = fastify({
  // https: {
  //   cert: readFileSync(join(__dirname, '..', 'cert.crt')),
  //   ca: readFileSync(join(__dirname, '..', 'ca.crt')),
  //   key: readFileSync(join(__dirname, '..', 'private.key')),
  // },
});

const io = new Server(
  app.server,
  isDev
    ? {
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST'],
          credentials: true,
        },
      }
    : {}
);

let idStorage: IIdStorage;
// let offerStorage: IOfferStorage;
const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
  ],
});

if (!isDev) {
  console.log('Running in production');
  // TODO: replace with redis
  idStorage = new InmemoryIdStorage();
  // offerStorage = new InmemoryOfferStorage();
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'client'),
  });
  app.get('/', (request, reply) => {
    logger.info('Getting index page');
    reply.sendFile('index.html');
  });
  app.get('/stream/:id', (request, reply) => {
    logger.info('Getting stream page');
    reply.sendFile('index.html');
  });
}
if (isDev) {
  console.log('Running in development');
  idStorage = new InmemoryIdStorage();
  // offerStorage = new InmemoryOfferStorage();
  app.register(fastifyCors);
}

io.on('connection', (socket) => {
  const updateViewersList = (streamerId: string) => {
    const room = Array.from(io.sockets.adapter.rooms.get(streamerId)!);
    const res: UpdateViewersListResponse = {
      streamerId: streamerId,
      viewerIds: room.map((id) => idStorage.getBySocketId(id)),
    };
    io.to(room).emit(SocketEvents.UPDATE_VIEWERS_LIST, res);
  };
  const findRoom = (viewerId: string): string => {
    const rooms = io.sockets.adapter.rooms;
    for (const [streamerId, room] of rooms.entries()) {
      if (room.has(viewerId)) {
        return streamerId;
      }
    }
    throw new Error('Viewer is not in any room');
  };

  socket.on(SocketEvents.HOST, (req: HostRequest) => {
    logger.info('Hosting room', {
      streamerId: req.streamerId,
      socketId: socket.id,
    });
    idStorage.set(req.streamerId, socket.id, true);
    socket.join(req.streamerId);
    const res: HostResponse = {
      streamerId: req.streamerId,
    };
    io.to(req.streamerId).emit(SocketEvents.HOST, res);
  });
  socket.on(SocketEvents.JOIN, (req: JoinRequest) => {
    logger.info('Joining room', {
      streamerId: req.streamerId,
      viewerId: req.viewerId,
      socketId: socket.id,
    });
    idStorage.set(req.viewerId, socket.id);
    socket.join(req.streamerId);
    const res: JoinResponse = {
      streamerId: req.streamerId,
      viewerId: req.viewerId,
    };
    io.emit(SocketEvents.JOIN, res);
    updateViewersList(req.streamerId);
  });
  socket.on(SocketEvents.START_STREAM, (req: StartStreamRequest) => {
    logger.info('Starting stream', { streamerId: req.streamerId });
    for (const [viewerId, offer] of Object.entries(req.offers)) {
      const socketId = idStorage.get(viewerId);
      const res: StartStreamResponse = {
        streamerId: req.streamerId,
        viewerId: viewerId,
        offer: offer,
      };
      socket.to(socketId).emit(SocketEvents.START_STREAM, res);
    }
    socket.emit(SocketEvents.START_STREAM, { streamerId: req.streamerId });
  });
  socket.on(SocketEvents.STOP_STREAM, (req: StopStreamRequest) => {
    logger.info('Stopping stream', { streamerId: req.streamerId });
    const res: StopStreamRequest = {
      streamerId: req.streamerId,
    };
    io.to(req.streamerId).emit(SocketEvents.STOP_STREAM, res);
  });
  socket.on(SocketEvents.OFFER, (req: OfferRequest) => {
    logger.info('Offer', { streamerId: req.streamerId });
    const socketId = idStorage.get(req.viewerId);
    const res: OfferResponse = {
      streamerId: req.streamerId,
      viewerId: req.viewerId,
      offer: req.offer,
    };
    socket.to(socketId).emit(SocketEvents.OFFER, res);
  });
  socket.on(SocketEvents.ANSWER, (req: AnswerRequest) => {
    logger.info('Answer', { streamerId: req.streamerId });
    const socketId = idStorage.get(req.streamerId);
    const res: AnswerResponse = {
      streamerId: req.streamerId,
      viewerId: req.viewerId,
      answer: req.answer,
    };
    socket.to(socketId).emit(SocketEvents.ANSWER, res);
  });
  socket.on(SocketEvents.ICE_CANDIDATE, (req: IceCandidateRequest) => {
    logger.info('Ice candidate', {
      senderId: req.senderId,
      targetId: req.targetId,
    });
    const socketId = idStorage.get(req.targetId);
    const res: IceCandidateResponse = {
      targetId: req.targetId,
      senderId: req.senderId,
      candidate: req.candidate,
    };
    socket.to(socketId).emit(SocketEvents.ICE_CANDIDATE, res);
  });
  socket.on(SocketEvents.DISCONNECT, async () => {
    logger.info('Disconnected', { socketId: socket.id });
    const isStreamer = idStorage.isStreamer(socket.id);
    const id = idStorage.unset(socket.id);
    if (!id) {
      logger.debug('Socket is not present in id storage', {
        id,
        socketId: socket.id,
      });
      return;
    }
    socket.leave(id);
    if (isStreamer) {
      const res: CloseResponse = {
        streamerId: id,
      };
      socket.to(id).emit(SocketEvents.CLOSE, res);
    } else {
      const streamerId = findRoom(id);
      await socket.leave(streamerId);
      updateViewersList(streamerId);
    }
  });
});

app.listen(
  process.env.PORT ?? 9000,
  isDev ? 'localhost' : '0.0.0.0',
  (err, address) => console.log(`Fastify listening on ${address}`)
);
