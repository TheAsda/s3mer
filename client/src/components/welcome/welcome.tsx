import React from 'react';
import { useVisitorId } from '../../lib/useVisitorId';
import { Heading } from '../heading/heading';
import { Text } from '../text/text';
import { Link } from '../link/link';

export const Welcome = () => {
  const visitorId = useVisitorId();

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-5 dark:bg-gray-700">
      <Heading level={1} className="dark:text-cello-100">S3mer - P2P streaming service</Heading>
      <Link to={`/stream/${visitorId}`} variant="button">
        Start streaming
      </Link>
      <Text size="lg" className="text-center">
        P2P means that every piece of video is going directly to your viewers.
        Nothing is stored on the server. It works via <strong>WebRTC</strong>{' '}
        technology.
      </Text>
    </div>
  );
};
