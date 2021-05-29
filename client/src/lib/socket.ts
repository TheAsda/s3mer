import openSocket from 'socket.io-client';

// @ts-ignore
const url = import.meta.env.API_URL as string ?? 'http://localhost:9000';

export function getSocket() {
  return openSocket(url);
}
