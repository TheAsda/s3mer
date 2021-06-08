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
}

export const Text = ({ isSpan, size, ...props }: TextProps) => {
  if (isSpan) {
    return <span {...props} className={cx(textSize[size ?? 'md'], 'text-cello')} />;
  }
  return <p {...props} className={cx(textSize[size ?? 'md'], 'text-cello')} />;
};
