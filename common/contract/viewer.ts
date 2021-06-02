export interface JoinRequest {
  streamerId: string;
  viewerId: string;
}

export interface JoinResponse {
  offer: RTCSessionDescription;
}

export interface ConnectRequest {
  streamerId: string;
  viewerId: string;
}

export interface ConnectResponse {
  offer: RTCSessionDescription;
}

export interface ConnectStreamRequest {
  streamerId: string;
  answer: RTCSessionDescription;
}

export interface ConnectStreamResponse {
  answer: RTCSessionDescription;
}
