export interface JoinRequest {
  streamerId: string;
  viewerId: string;
}

export interface JoinResponse {
  offer?: string;
}

export interface ConnectRequest {
  streamerId: string;
  viewerId: string;
}

export interface ConnectResponse {
  offer?: string;
}

export interface ConnectStreamRequest {
  streamerId: string;
  answer: string;
}

export interface ConnectStreamResponse {
  answer: string;
}
