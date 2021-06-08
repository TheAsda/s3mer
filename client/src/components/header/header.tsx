import React from 'react';
import { Text } from '../text/text';
import { useVisitorId } from '../../lib/useVisitorId';

export const Header = () => {
  const visitorId = useVisitorId();

  return (
    <div className="flex justify-end px-2">
      <Text className="font-bold">{visitorId}</Text>
    </div>
  );
};
