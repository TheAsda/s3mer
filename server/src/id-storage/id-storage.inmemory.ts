import { IIdStorage } from './id-storage';

export class InmemoryIdStorage implements IIdStorage {
  store: Record<string, string>;
  constructor() {
    this.store = {};
  }

  set(id: string, socketId: string): void {
    this.store[id] = socketId;
  }

  get(id: string): string {
    if (!this.store[id]) {
      throw new Error('Id does not set');
    }
    return this.store[id];
  }

  unset(socketId: string): string {
    let id: string | null = null;
    this.store = Object.entries(this.store).reduce((acc, cur) => {
      if (cur[1] === socketId) {
        id = cur[0];
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
}
