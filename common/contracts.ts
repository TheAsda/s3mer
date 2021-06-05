export interface HostRequest {
  streamerId: string;
}

export interface HostResponse {
  streamerId: string;
}

export interface JoinRequest {
  streamerId: string;
  viewerId: string;
}

export interface JoinResponse {
  streamerId: string;
  viewerId: string;
}

export interface StartStreamRequest {
  streamerId: string;
  // key: viewerId, value: offer
  offers: Record<string, RTCSessionDescriptionInit>;
}

export interface StartStreamResponse {
  streamerId: string;
  offer: RTCSessionDescriptionInit;
}

export interface StopStreamRequest {
  streamerId: string;
}

export interface StopStreamResponse {
  streamerId: string;
}

export interface OfferRequest {
  streamerId: string;
  viewerId: string;
  offer: RTCSessionDescriptionInit;
}

export interface OfferResponse {
  streamerId: string;
  viewerId: string;
  offer: RTCSessionDescriptionInit;
}

export interface AnswerRequest {
  streamerId: string;
  viewerId: string;
  answer: RTCSessionDescriptionInit;
}

export interface AnswerResponse {
  streamerId: string;
  viewerId: string;
  answer: RTCSessionDescriptionInit;
}

export interface IceCandidateRequest {
  targetId: string;
  senderId: string;
  candidate: RTCIceCandidate;
}

export interface IceCandidateResponse {
  targetId: string;
  senderId: string;
  candidate: RTCIceCandidate;
}

export interface UpdateViewersListResponse {
  streamerId: string;
  viewerIds: string[];
}

export interface CloseResponse {
  streamerId: string;
}
