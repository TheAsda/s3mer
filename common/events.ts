export const SocketEvents = {
  HOST: 'host',
  JOIN: 'join',
  START_STREAM: 'start-stream',
  STOP_STREAM: 'stop-stream',
  ANSWER: 'answer',
  ICE_CANDIDATE: 'ice-candidate',
  DISCONNECT: 'disconnect',
  UPDATE_VIEWER_LIST: 'update-viewer-list'
} as const;

// offer storage or peer hosting on join
