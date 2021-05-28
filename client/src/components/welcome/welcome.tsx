import React from 'react';
import { Link } from 'react-router-dom';
import { useVisitorId } from '../../lib/useVisitorId';

export const Welcome = () => {
  const visitorId = useVisitorId();

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="font-bold text-4xl">S3mer - P2P streaming service</h1>
      <Link
        to={`/stream/${visitorId}`}
        className="p-2 bg-palatinate-purple-500 rounded-md"
      >
        Let's go streaming
      </Link>
      <p className="text-xl">
        P2P means that every piece of video is going directly to your viewers.
        Nothing is stored on the server.
      </p>
    </div>
  );
};
