export interface IRoomStorage {
  exists(id: string): boolean;
  create(streamerId: string): void;
  startStream(streamerId: string, offer: string): void;
  stopStream(streamerId: string): void;
  delete(streamerId: string): void;
  join(streamerId: string, viewerId: string): string | undefined;
  connect(streamerId: string): string;
  leave(streamerId: string, viewerId: string): void;
}
