// @ts-ignore
import freeice from 'freeice';

export const iceServers: RTCIceServer[] = [
  ...freeice(),
  { urls: ['stun:95.165.104.170:3478'] },
  {
    urls: ['turn:95.165.104.170:3478'],
    username: 'user',
    credential: 'password',
  },
];
