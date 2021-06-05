import React from 'react';
import { useParams } from 'react-router-dom';
import { useVisitorId } from '../../lib/useVisitorId';
import { Streamer } from '../streamer/streamer';
import { Viewer } from '../viewer/viewer';

export interface StreamProps {}

export const Stream = (props: StreamProps) => {
  const { streamId } = useParams<{ streamId: string }>();
  const visitorId = useVisitorId();

  if (!visitorId) {
    return <span>Loading</span>;
  }
  if (visitorId === streamId) {
    return <Streamer streamerId={visitorId} />;
  }
  return <Viewer streamerId={streamId} viewerId={visitorId} />;
};
