import {
  AlreadyHostedError,
  AlreadyJoinedError,
  NotHostedError,
  NotJoinedError,
  StreamNotStartedError,
} from '../errors/room';
import { IRoomStorage } from './room-storage';

interface Room {
  hostId: string;
  viewerIds: string[];
  offer?: string;
}

export class InmemoryRoomStorage implements IRoomStorage {
  private readonly store: Record<string, Room | undefined>;
  constructor() {
    this.store = {};
  }

  startStream(streamerId: string, offer: string): void {
    if (!this.exists(streamerId)) {
      throw new NotHostedError(streamerId);
    }
    this.store[streamerId]!.offer = offer;
  }

  exists(id: string): boolean {
    return this.store[id] !== undefined;
  }

  create(streamerId: string): void {
    // if (this.exists(streamerId)) {
    //   throw new AlreadyHostedError(streamerId);
    // }
    this.store[streamerId] = {
      hostId: streamerId,
      viewerIds: [],
    };
  }

  delete(streamerId: string): void {
    if (!this.exists(streamerId)) {
      throw new NotHostedError(streamerId);
    }
    this.store[streamerId] = undefined;
  }

  join(streamerId: string, viewerId: string): string | undefined {
    if (!this.exists(streamerId)) {
      throw new NotHostedError(streamerId);
    }
    const room = this.store[streamerId];
    // if (room?.offer === undefined) {
    //   throw new StreamNotStartedError(streamerId);
    // }
    const viewers = room!.viewerIds;
    // if (viewers.includes(viewerId)) {
    //   throw new AlreadyJoinedError(viewerId);
    // }
    viewers.push(viewerId);
    return room?.offer;
  }

  leave(streamerId: string, viewerId: string): void {
    if (!this.exists(streamerId)) {
      throw new NotHostedError(streamerId);
    }
    const room = this.store[streamerId];
    const viewers = room!.viewerIds;
    if (!viewers.includes(viewerId)) {
      throw new NotJoinedError(viewerId);
    }
    room!.viewerIds = viewers.filter((id) => id !== viewerId);
  }

  stopStream(streamerId: string): void {
    if (!this.exists(streamerId)) {
      throw new NotHostedError(streamerId);
    }
    this.store[streamerId]!.offer = undefined;
  }

  connect(streamerId: string): string {
    if (!this.exists(streamerId)) {
      throw new NotHostedError(streamerId);
    }
    const room = this.store[streamerId];
    if (room?.offer === undefined) {
      throw new StreamNotStartedError(streamerId);
    }
    return room.offer;
  }
}
