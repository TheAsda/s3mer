import React, { useEffect, useState } from 'react';
import { useVisitorId } from '../../lib/useVisitorId';
import { Heading } from '../heading/heading';
import { Text } from '../text/text';
import { Link } from '../link/link';
import cx from 'classnames';

export const Welcome = () => {
  const visitorId = useVisitorId();

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-5 dark:bg-gray-700 bg-gradient-to-r from-cello-100 to-gigas-400 bg-500 dark:from-cello-600 dark:to-gigas-400">
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
