export interface HostRequest {
  streamerId: string;
}

export interface StartStreamRequest {
  streamerId: string;
  offer: string;
}

export interface StartStreamResponse {
  offer: string;
}

export interface StopStreamRequest {
  streamerId: string;
}
