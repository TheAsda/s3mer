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
  offer?: RTCSessionDescription;
}

export interface StartStreamRequest {
  streamerId: string;
  // key: viewerId, value: offer
  offers: Record<string, RTCSessionDescription>;
}

export interface StartStreamResponse {
  streamerId: string;
  offer: RTCSessionDescription;
}

export interface StopStreamRequest {
  streamerId: string;
}

export interface StopStreamResponse {
  streamerId: string;
}

export interface AnswerRequest {
  streamerId: string;
  viewerId: string;
  answer: RTCSessionDescription;
}

export interface AnswerResponse {
  streamerId: string;
  viewerId: string;
  answer: RTCSessionDescription;
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
  viewerIds: string[];
}

export interface CloseResponse {
  streamerId: string;
}
