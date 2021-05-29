import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import fastifyCors from 'fastify-cors';
// @ts-ignore
import webrtc from 'wrtc';

const isDev = process.env.NODE_ENV !== 'production';
const app = fastify();

if (!isDev) {
  console.log('Running in production');
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'build', 'client'),
  });
  app.get('/', (request, reply) => {
    reply.sendFile('index.html');
  });
}
if (isDev) {
  console.log('Running in development');
  app.register(fastifyCors);
}

const streams: Record<string, MediaStream> = {};

app.post('/host', async (request, reply) => {
  console.log('Creating host');
  const peer: RTCPeerConnection = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
    ],
  });
  peer.ontrack = (e) =>
    (streams[(request.body as any).streamerId] = e.streams[0]);
  const desc = new webrtc.RTCSessionDescription((request.body as any).sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  reply.send({
    sdp: peer.localDescription,
  });
});

app.post('/join', async (request, reply) => {
  console.log('Joining room');
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
    ],
  });
  const desc = new webrtc.RTCSessionDescription((request.body as any).sdp);
  await peer.setRemoteDescription(desc);
  streams[(request.body as any).streamerId]
    .getTracks()
    .forEach((track) =>
      peer.addTrack(track, streams[(request.body as any).streamerId])
    );
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  reply.send({
    sdp: peer.localDescription,
  });
});

app.listen(process.env.PORT ?? 9000, (err, address) =>
  console.log(`Fastify listening on ${address}`)
);
