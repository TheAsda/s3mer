import socket from 'socket.io-client';

export function createSocket() {
  return socket('https://95.165.104.170:9000');
}
