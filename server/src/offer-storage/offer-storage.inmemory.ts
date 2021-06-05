import { IOfferStorage } from './offer-storage';

export class InmemoryOfferStorage implements IOfferStorage {
  store: Record<string, RTCSessionDescription>;
  constructor() {
    this.store = {};
  }

  set(id: string, offer: RTCSessionDescription): void {
    this.store[id] = offer;
  }

  get(id: string): RTCSessionDescription {
    if (!this.store[id]) {
      throw new Error('Offer for id is not set');
    }
    const offer = this.store[id];
    delete this.store[id];
    return offer;
  }
}
