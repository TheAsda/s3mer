export interface IIdStorage {
  set(id: string, socketId: string, isStreamer?: boolean): void;
  isStreamer(socketId: string): boolean;
  get(id: string): string;
  getBySocketId(socketId: string): string;
  unset(socketId: string): string | null;
}
