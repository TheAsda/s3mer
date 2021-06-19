import React from 'react';
import { useParams } from 'react-router-dom';
import { useVisitorId } from '../../lib/useVisitorId';
import { Streamer } from '../../components/streamer/streamer';
import { Viewer } from '../../components/viewer/viewer';
import { ToastProvider } from '../../components/toast/toast';

export interface StreamProps {}

export const Stream = (props: StreamProps) => {
  const { streamId } = useParams<{ streamId: string }>();
  const visitorId = useVisitorId();

  return (
    <ToastProvider duration={2000}>
      <main className="flex-grow background flex flex-col items-center justify-center">
        <div className="w-full xl:w-full xl:max-w-7xl ">
          {!visitorId ? (
            <span>Loading</span>
          ) : visitorId === streamId ? (
            <Streamer streamerId={visitorId} />
          ) : (
            <Viewer streamerId={streamId} viewerId={visitorId} />
          )}
        </div>
      </main>
    </ToastProvider>
  );
};
