import React, { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export type ButtonVariantType = 'primary' | 'secondary' | 'accent';

const buttonVariants: Record<ButtonVariantType, string> = {
  primary: 'text-paris-white bg-cello hover:bg-cello-400',  
  secondary: 'text-cello border border-cello hover:bg-casper-100',
  accent: 'text-paris-white bg-jelly-bean hover:bg-jelly-bean-400',
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariantType;
}

export const Button = ({ variant, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx(
        buttonVariants[variant ?? 'primary'],
        'p-2 rounded-xl focus:outline-none focus:ring focus:ring-offset-jelly-bean-400',
        props.className
      )}
    />
  );
};
