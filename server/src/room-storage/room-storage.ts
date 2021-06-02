export interface IRoomStorage {
  exists(id: string): boolean;
  create(streamerId: string): void;
  startStream(streamerId: string, offer: RTCSessionDescription): void;
  stopStream(streamerId: string): void;
  delete(streamerId: string): void;
  join(streamerId: string, viewerId: string): RTCSessionDescription;
  connect(streamerId: string): RTCSessionDescription;
  leave(streamerId: string, viewerId: string): void;
}
