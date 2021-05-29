import React, { useEffect, useRef, useState } from 'react';
import { createViewerPeer } from '../../lib/webrtc';

export interface ViewerProps {
  streamerId: string;
  viewerId: string;
}

export const Viewer = (props: ViewerProps) => {
  const [msg, setMsg] = useState('Not connected');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {}, []);

  return (
    <div>
      <video autoPlay ref={videoRef} />
      <button
        onClick={() => {
          const peer = createViewerPeer(props.streamerId, videoRef);
          peer.addTransceiver('video', { direction: 'recvonly' });
        }}
      >
        Connect
      </button>
      <p>{props.streamerId}</p>
      <p>{props.viewerId}</p>
      <p>Status: {msg}</p>
    </div>
  );
};
