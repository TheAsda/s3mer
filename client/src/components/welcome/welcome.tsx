import React, { useEffect, useState } from 'react';
import { useVisitorId } from '../../lib/useVisitorId';
import { Heading } from '../heading/heading';
import { Text } from '../text/text';
import { Link } from '../link/link';
import cx from 'classnames';

export const Welcome = () => {
  const visitorId = useVisitorId();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-5 dark:bg-gray-700 bg-gradient-to-r from-cello-100 to-gigas-400 bg-500 dark:from-cello-600 dark:to-gigas-400">
      <Heading
        level={1}
        className={cx(
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
          'transition- delay-100 duration-500 transform  dark:text-cello-100 animate-fade-in transition-fade'
        )}
      >
        S3mer - P2P streaming service
      </Heading>
      <Link
        to={`/stream/${visitorId}`}
        variant="button"
        className={cx(
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
          'transition- delay-200 duration-500 transform hover:animate-bounce transition-fade'
        )}
      >
        Start streaming
      </Link>
      <Text
        size="lg"
        className={cx(
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
          'transition- delay-300 duration-500 transform text-center transition-fade'
        )}
      >
        P2P means that every piece of video is going directly to your viewers.
        Nothing is stored on the server. It works via <strong>WebRTC</strong>{' '}
        technology.
      </Text>
    </div>
  );
};
