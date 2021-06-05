export interface IIdStorage {
  set(id: string, socketId: string): void;
  get(id: string): string;
  unset(socketId: string): string;
}
