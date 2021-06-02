import React, { useEffect, useRef, useState } from 'react';
import socket, { Socket } from 'socket.io-client';
import { StartStreamResponse } from '../../../../common/contract/streamer';
import {
  ConnectStreamRequest,
  JoinRequest,
  JoinResponse,
} from '../../../../common/contract/viewer';
import { createSocket } from '../../lib/socket';
import { createPeer, createViewerPeer } from '../../lib/webrtc';

export interface ViewerProps {
  streamerId: string;
  viewerId: string;
}

export const Viewer = (props: ViewerProps) => {
  const [status, setStatus] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>();
  const socketRef = useRef<Socket>();

  const connect = () => {};

  useEffect(() => {
    socketRef.current = createSocket();
    socketRef.current.on('room-joined', async (res: JoinResponse) => {
      setStatus('Room joined');
      peerRef.current = createPeer();
      peerRef.current.ontrack = (e) => {
        setStatus('Got track');
        videoRef.current!.srcObject = e.streams[0];
      };
      peerRef.current!.addTransceiver('video', { direction: 'recvonly' });
      peerRef.current.onicecandidate = (e) => {
        if (!peerRef.current?.localDescription) {
          return;
        }
        const req: ConnectStreamRequest = {
          answer: peerRef.current.localDescription,
          streamerId: props.streamerId,
        };
        socketRef.current?.emit('connect-stream', req);
      };
      peerRef.current.oniceconnectionstatechange = function () {
        console.log('ICE state: ', peerRef.current!.iceConnectionState);
      };
      await peerRef.current?.setRemoteDescription(res.offer);
      const answer = await peerRef.current!.createAnswer();
      await peerRef.current?.setLocalDescription(answer);
      // socketRef.current!.on(
      //   'stream-started',
      //   async (req: StartStreamResponse) => {
      //   }
      // );
    });
    const req: JoinRequest = {
      streamerId: props.streamerId,
      viewerId: props.viewerId,
    };
    socketRef.current.emit('join', req);
  }, []);

  return (
    <div>
      <video autoPlay={true} ref={videoRef} />
      <button>Connect</button>
      <p>{props.streamerId}</p>
      <p>{props.viewerId}</p>
      <p>Status: {status}</p>
    </div>
  );
};
