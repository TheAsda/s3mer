import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { createPeer } from '../../lib/webrtc';
import socket, { Socket } from 'socket.io-client';
import {
  HostRequest,
  StartStreamRequest,
} from '../../../../common/contract/streamer';
import { ConnectStreamResponse } from '../../../../common/contract/viewer';
import { createSocket } from '../../lib/socket';

export interface StreamerProps {
  streamerId: string;
}

export const Streamer = (props: StreamerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<string>();
  const [viewers, setViewers] = useState(0);
  const peerRef = useRef<RTCPeerConnection>();
  const socketRef = useRef<Socket>();
  const answerRef = useRef(0);

  useEffect(() => {
    socketRef.current = createSocket();
    socketRef.current.on('room-hosted', () => {
      setStatus('Room hosted');
    });
    socketRef.current.on('stream-started', () => {
      setStatus('Stream started');
    });
    socketRef.current.on('stream-stopped', () => {
      setStatus('Stream stopped');
    });
    const req: HostRequest = {
      streamerId: props.streamerId,
    };
    socketRef.current?.emit('host', req);
  }, []);

  const startStream = () => {
    // @ts-ignore
    if (!navigator.mediaDevices.getDisplayMedia) {
      alert(
        'navigator.mediaDevices.getDisplayMedia not supported on your browser, use the latest version of Chrome'
      );
    }
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({ video: true })
      .then(async (stream: MediaStream) => {
        videoRef.current!.srcObject = stream;
        peerRef.current = createPeer();
        console.log(stream.getTracks());
        stream
          .getTracks()
          .forEach((track) => peerRef.current!.addTrack(track, stream));
        peerRef.current.onicecandidate = (e) => {
          if (!socketRef.current || !peerRef.current!.localDescription) {
            return;
          }
          const req: StartStreamRequest = {
            streamerId: props.streamerId,
            offer: peerRef.current!.localDescription,
          };
          socketRef.current.emit('start-stream', req);
          socketRef.current.on('answer', async (res: ConnectStreamResponse) => {
            console.log('Got answer', res.answer);
            await peerRef.current?.setRemoteDescription(
              new RTCSessionDescription(res.answer)
            );
          });
        };
        const offer = await peerRef.current!.createOffer();
        await peerRef.current!.setLocalDescription(offer);
      });
  };

  const stopStream = () => {
    // @ts-ignore
    const tracks: MediaStreamTrack[] = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current!.srcObject = null;
  };

  return (
    <div>
      <video autoPlay={true} ref={videoRef} />
      <span>Viewers: {viewers}</span>
      <span>Status: {status}</span>
      <button onClick={startStream}>Start streaming</button>
      <button onClick={stopStream}>Stop streaming</button>
    </div>
  );
};
