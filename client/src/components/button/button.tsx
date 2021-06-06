import React, { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export type ButtonVariantType = 'primary' | 'secondary' | 'accent';

const buttonVariants: Record<ButtonVariantType, string> = {
  primary: '',
  secondary: '',
  accent: '',
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariantType;
}

export const Button = ({ variant, ...props }: ButtonProps) => {
  return <button className={cx(buttonVariants[variant ?? 'primary'],'')}></button>;
};
