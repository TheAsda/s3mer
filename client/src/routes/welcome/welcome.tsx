import React, { useEffect, useState } from 'react';
import { useVisitorId } from '../../lib/useVisitorId';
import { Heading } from '../../components/heading/heading';
import { Text } from '../../components/text/text';
import { Link } from '../../components/link/link';

export const Welcome = () => {
  const visitorId = useVisitorId();

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-5 background">
      <Heading level={1} className="opacity-0 animate-fade-in">
        S3mer - P2P streaming service
      </Heading>
      <Link
        to={`/stream/${visitorId}`}
        variant="button"
        className="opacity-0 animate-fade-in animation-delay-200"
      >
        Start streaming
      </Link>
      <Text
        size="lg"
        className="text-center opacity-0 animate-fade-in animation-delay-400"
      >
        P2P means that every piece of video is going directly to your viewers.
        Nothing is stored on the server. It works via <strong>WebRTC</strong>{' '}
        technology.
      </Text>
    </div>
  );
};
