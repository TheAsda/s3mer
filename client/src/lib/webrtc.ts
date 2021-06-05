import { iceServers } from './iceServers';

export function createPeer() {
  const peer = new RTCPeerConnection({
    iceServers,
  });
  return peer;
}
