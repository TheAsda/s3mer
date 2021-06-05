export const SocketEvents = {
  HOST: 'host',
  JOIN: 'join',
  START_STREAM: 'start-stream',
  STOP_STREAM: 'stop-stream',
  OFFER: 'offer',
  ANSWER: 'answer',
  ICE_CANDIDATE: 'ice-candidate',
  DISCONNECT: 'disconnect',

  UPDATE_VIEWERS_LIST: 'update-viewers-list',
  CLOSE: 'close',
} as const;
