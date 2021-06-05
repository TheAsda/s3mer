export interface IOfferStorage {
  set(id: string, offer: RTCSessionDescription): void;
  get(id: string): RTCSessionDescription;
  has(id: string): boolean;
  unset(id: string): void;
}
