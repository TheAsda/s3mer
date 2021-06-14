import React, { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';

export type TextSizeType = 'sm' | 'md' | 'lg';

const textSize: Record<TextSizeType, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

export interface TextProps extends ComponentPropsWithoutRef<'p' | 'span'> {
  isSpan?: boolean;
  size?: TextSizeType;
  disableDark?: boolean;
}

export const Text = ({ isSpan, size, disableDark, ...props }: TextProps) => {
  if (isSpan) {
    return (
      <span
        {...props}
        className={cx(
          textSize[size ?? 'md'],
          'text-cello',
          !disableDark && 'dark:text-cello-200',
          props.className
        )}
      />
    );
  }
  return (
    <p
      {...props}
      className={cx(
        textSize[size ?? 'md'],
        'text-cello',
        !disableDark && 'dark:text-cello-200',
        props.className
      )}
    />
  );
};
