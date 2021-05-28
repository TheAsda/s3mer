import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

export interface StreamerProps {
  streamerId: string;
}

export const Streamer = (props: StreamerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [viewers, setViewers] = useState(0);

  const startStream = () => {
    // @ts-ignore
    if (navigator.mediaDevices.getDisplayMedia === undefined) {
      return;
    }
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({ video: true })
      .then((stream: MediaStream) => {
        videoRef.current!.srcObject = stream;
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
      <button onClick={startStream}>Start streaming</button>
      <button onClick={stopStream}>Stop streaming</button>
    </div>
  );
};
