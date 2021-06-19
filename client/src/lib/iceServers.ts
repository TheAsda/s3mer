// @ts-ignore
import freeice from 'freeice';

export const iceServers: RTCIceServer[] = [
  ...freeice(),
  { urls: ['stun:turn.okinazuno.me:3478'] },
  {
    urls: ['turn:turn.okinazuno.me:3478'],
    username: 'user',
    credential: 'password',
  },
];
