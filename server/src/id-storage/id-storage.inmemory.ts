import { IIdStorage } from './id-storage';

export class InmemoryIdStorage implements IIdStorage {
  store: Record<string, string>;
  streamers: string[];
  constructor() {
    this.store = {};
    this.streamers = [];
  }

  set(id: string, socketId: string, isStreamer = false): void {
    this.store[id] = socketId;
    if (isStreamer) {
      this.streamers.push(socketId);
    }
  }

  get(id: string): string {
    if (!this.store[id]) {
      throw new Error('Id does not set');
    }
    return this.store[id];
  }

  getBySocketId(socketId: string): string {
    const id = Object.entries(this.store).find(
      (record) => record[1] === socketId
    )?.[0];
    if (!id) {
      throw new Error('Cannot find id by socket id');
    }
    return id;
  }

  unset(socketId: string): string {
    let id: string | null = null;
    this.store = Object.entries(this.store).reduce((acc, cur) => {
      if (cur[1] === socketId) {
        id = cur[0];
        this.streamers = this.streamers.filter(
          (socketId) => socketId !== cur[1]
        );
        return acc;
      }
      acc[cur[0]] = cur[1];
      return acc;
    }, {} as Record<string, string>);
    if (id === null) {
      throw new Error('Record with socketId is not set');
    }
    return id;
  }

  isStreamer(socketId: string): boolean {
    return this.streamers.includes(socketId);
  }
}
