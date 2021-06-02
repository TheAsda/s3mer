import axios from 'axios';
import { RefObject } from 'react';
import { iceServers } from './iceServers';

const axiosInstance = axios.create({
  baseURL: undefined,
});

export function createPeer() {
  const peer = new RTCPeerConnection({
    iceServers,
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

    const { data } = await axiosInstance.post('/host', payload);
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

    const { data } = await axiosInstance.post('/join', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  };
  return peer;
}
