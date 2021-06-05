import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { createPeer } from '../../lib/webrtc';
import { Socket } from 'socket.io-client';
import { createSocket } from '../../lib/socket';
import { SocketEvents } from '../../../../common/events';
import { HostRequest } from '../../../../common/contracts';

export interface StreamerProps {
  streamerId: string;
}

export const Streamer = (props: StreamerProps) => {
  const [status, setStatus] = useState<string>();
  const [viewers, setViewers] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>(createPeer());
  const socketRef = useRef<Socket>(createSocket());

  useEffect(() => {
    peerRef.current.onicecandidate = (e) => {
      const req = {
        streamerId: props.streamerId,
        candidate: e.candidate,
      };
      socketRef.current.emit('add-ice-candidate', req);
    };
    socketRef.current.on('room-hosted', () => {
      setStatus('Room hosted');
    });
    socketRef.current.on('stream-started', () => {
      setStatus('Stream started');
    });
    socketRef.current.on('stream-stopped', () => {
      setStatus('Stream stopped');
    });
    socketRef.current.on('ice-candidate', ({ candidate }) => {
      peerRef.current.addIceCandidate(candidate);
    });
    // socketRef.current.on('answer', async (res: ConnectStreamResponse) => {
    //   console.log('Got answer', res.answer);
    //   await peerRef.current.setRemoteDescription(JSON.parse(res.answer));
    // });

    const req: HostRequest = {
      streamerId: props.streamerId,
    };
    socketRef.current.emit(SocketEvents.HOST, req);
  }, []);

  const startStream = () => {
    // @ts-ignore
    if (!navigator.mediaDevices.getDisplayMedia) {
      alert(
        'navigator.mediaDevices.getDisplayMedia not supported on your browser, use the latest version of Chrome'
      );
      return;
    }

    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({ video: true })
      .then(async (stream: MediaStream) => {
        videoRef.current!.srcObject = stream;
        stream
          .getTracks()
          .forEach((track) => peerRef.current.addTrack(track, stream));

        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        // const req: StartStreamRequest = {
        //   streamerId: props.streamerId,
        //   offer: JSON.stringify(offer),
        // };
        // socketRef.current!.emit('start-stream', req);
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
