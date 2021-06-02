export interface HostRequest {
  streamerId: string;
}

export interface StartStreamRequest {
  streamerId: string;
  offer: RTCSessionDescription;
}

export interface StartStreamResponse {
  offer: RTCSessionDescription;
}

export interface StopStreamRequest {
  streamerId: string;
}
