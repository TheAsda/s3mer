import axios from 'axios';
import { RefObject } from 'react';

function createPeer() {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
    ],
  });
  return peer;
}

export function createStreamerPeer(streamerId: string) {
  const peer = createPeer();
  peer.onnegotiationneeded = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
      streamerId,
    };

    const { data } = await axios.post('http://localhost:9000/host', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  };
  return peer;
}

export function createViewerPeer(
  streamerId: string,
  videoRef: RefObject<HTMLVideoElement>
) {
  const peer = createPeer();
  peer.ontrack = (e) => {
    if (videoRef.current) {
      videoRef.current.srcObject = e.streams[0];
    }
  };
  peer.onnegotiationneeded = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
      streamerId,
    };

    const { data } = await axios.post('http://localhost:9000/join', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  };
  return peer;
}
