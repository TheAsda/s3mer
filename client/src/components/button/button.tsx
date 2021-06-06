import React, { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export type ButtonVariantType = 'primary' | 'secondary' | 'accent';

const buttonVariants: Record<ButtonVariantType, string> = {
  primary: 'bg-blue-400',
  secondary: 'bg-gray-400',
  accent: 'bg-pink-400',
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariantType;
}

export const Button = ({ variant, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx(buttonVariants[variant ?? 'primary'], 'p-2 rounded-xl', props.className)}
    />
  );
};
