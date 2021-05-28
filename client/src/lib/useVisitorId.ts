import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useVisitorId = () => {
  const [visitorId, setVisitorId] = useLocalStorage<string | null>(
    'visitor-id',
    null
  );
  useEffect(() => {
    if (visitorId === null) {
      setVisitorId(nanoid(5));
    }
  }, [visitorId]);
  if (visitorId === null) {
    return '';
  }
  return visitorId;
};
