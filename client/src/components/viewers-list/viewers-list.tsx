import React, { ComponentPropsWithoutRef } from 'react';
import { Text } from '../text/text';
import cx from 'classnames';

export interface ViewersListProps extends ComponentPropsWithoutRef<'div'> {
  streamerId: string;
  viewerId: string;
  viewers: string[];
}

export const ViewersList = ({
  streamerId,
  viewerId,
  viewers,
  ...props
}: ViewersListProps) => {
  return (
    <div
      {...props}
      className={cx(
        'm-1 p-1 border-2 border-cello-400 rounded-xl flex flex-col items-stretch gap-1',
        props.className
      )}
    >
      <Text size="lg" isSpan className="border border-gigas-400 p-1 rounded-md">
        {streamerId === viewerId ? 'You are hosting' : `${streamerId} is host`}
      </Text>
      <ul className="flex flex-col gap-1">
        {viewers
          .filter((viewer) => viewer !== streamerId)
          .map((viewer, i) => (
            <li
              key={viewer}
              className={cx(
                i % 2 === 0 ? 'bg-cello-200' : 'bg-gigas-200',
                'rounded-md p-1 bg-opacity-25'
              )}
            >
              <Text>{viewer}</Text>
            </li>
          ))}
      </ul>
    </div>
  );
};
