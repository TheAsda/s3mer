import socket from 'socket.io-client';

export function createSocket() {
  return socket(import.meta.env.PROD ? '/' : import.meta.env.VITE_API_URL);
}
