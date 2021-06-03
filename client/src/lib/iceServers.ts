// @ts-ignore
import freeice from 'freeice';

export const iceServers: RTCIceServer[] = [
  ...freeice(),
  { urls: ['stun:13.69.189.124:3478'] },
  {
    urls: ['turn:13.69.189.124:3478'],
    username: 'user',
    credential: 'password',
  },
];
