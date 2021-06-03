import { iceServers } from './iceServers';

export function createPeer() {
  console.log(iceServers);
  const peer = new RTCPeerConnection({
    iceServers,
  });
  return peer;
}
