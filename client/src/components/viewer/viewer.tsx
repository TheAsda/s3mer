import React, { useEffect, useRef, useState } from 'react';

export interface ViewerProps {
  streamerId: string;
  viewerId: string;
}

export const Viewer = (props: ViewerProps) => {
  const [msg, setMsg] = useState('Not connected');

  return (
    <div>
      <p>{props.streamerId}</p>
      <p>{props.viewerId}</p>
      <p>Status: {msg}</p>
    </div>
  );
};
