import React, { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';

export type HeadingLevelType = 1 | 2 | 3 | 4 | 5;

export interface HeadingProps
  extends ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5'> {
  level: HeadingLevelType;
}

export const Heading = ({ level, ...props }: HeadingProps) => {
  switch (level) {
    case 1:
      return <h1 {...props} className={cx(props.className, 'text-5xl text-cello dark:text-cello-200')} />;
    case 2:
      return <h2 {...props} className={cx(props.className, 'text-4xl text-cello dark:text-cello-200')} />;
    case 3:
      return <h3 {...props} className={cx(props.className, 'text-3xl text-cello dark:text-cello-200')} />;
    case 4:
      return <h4 {...props} className={cx(props.className, 'text-2xl text-cello dark:text-cello-200')} />;
    case 5:
      return <h5 {...props} className={cx(props.className, 'text-xl text-cello dark:text-cello-200')} />;

    default:
      throw new Error('Unknown level');
  }
};
