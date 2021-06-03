import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { StartStreamResponse } from '../../../../common/contract/streamer';
import {
  ConnectRequest,
  ConnectResponse,
  ConnectStreamRequest,
  JoinRequest,
  JoinResponse,
} from '../../../../common/contract/viewer';
import { createSocket } from '../../lib/socket';
import { createPeer } from '../../lib/webrtc';

export interface ViewerProps {
  streamerId: string;
  viewerId: string;
}

export const Viewer = (props: ViewerProps) => {
  const [status, setStatus] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>(createPeer());
  const socketRef = useRef<Socket>(createSocket());

  useEffect(() => {
    peerRef.current.ontrack = (e) => {
      setStatus('Got track');
      videoRef.current!.srcObject = e.streams[0];
    };
    peerRef.current.onicecandidate = (e) => {
      const req = {
        streamerId: props.streamerId,
        candidate: e.candidate,
      };
      socketRef.current.emit('add-ice-candidate', req);
    };
    socketRef.current.on('stream-started', async (res: StartStreamResponse) => {
      peerRef.current.setRemoteDescription(JSON.parse(res.offer));
      peerRef.current.createAnswer();
    });
    socketRef.current.on(
      'ice-candidate',
      (res: { candidate: RTCIceCandidate }) => {
        peerRef.current.addIceCandidate(res.candidate);
      }
    );
    socketRef.current.on('room-joined', () => {
      setStatus('Room joined');
    });

    const req: JoinRequest = {
      streamerId: props.streamerId,
      viewerId: props.viewerId,
    };
    socketRef.current.emit('join', req);
  }, []);

  const connect = async () => {
    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);
    const req: ConnectStreamRequest = {
      answer: JSON.stringify(answer),
      streamerId: props.streamerId,
    };
    socketRef.current?.emit('set-answer', req);
  };

  return (
    <div>
      <video autoPlay={true} ref={videoRef} />
      <button onClick={connect}>Connect</button>
      <p>{props.streamerId}</p>
      <p>{props.viewerId}</p>
      <p>Status: {status}</p>
    </div>
  );
};
