import React from 'react';
import { useParams } from 'react-router-dom';
import { useVisitorId } from '../../lib/useVisitorId';
import { Streamer } from '../streamer/streamer';
import { Viewer } from '../viewer/viewer';

export interface StreamProps {}

export const Stream = (props: StreamProps) => {
  const { streamId } = useParams<{ streamId: string }>();
  const visitorId = useVisitorId();

  return (
    <div className="flex-grow background flex flex-col items-center justify-center">
      <div className="w-full lg:w-full lg:max-w-4xl xl:max-w-7xl ">
        {!visitorId ? (
          <span>Loading</span>
        ) : visitorId === streamId ? (
          <Streamer streamerId={visitorId} />
        ) : (
          <Viewer streamerId={streamId} viewerId={visitorId} />
        )}
      </div>
    </div>
  );
};
