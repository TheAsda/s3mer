import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import cx from 'classnames';

export type ButtonVariantType = 'primary' | 'secondary' | 'accent';

const buttonVariants: Record<ButtonVariantType, string> = {
  primary: 'text-gray-200 bg-cello-500 hover:bg-cello-400 dark:bg-cello-300 dark:hover:bg-cello-300',
  secondary: 'text-cello border border-cello hover:bg-gray-100 hover:bg-opacity-10 dark:text-cello-200 dark:border-cello-200',
  accent: 'text-gray-200 bg-gigas-500 hover:bg-gigas-400',
};

export type ButtonSizeType = 'sm' | 'md' | 'lg';

const buttonSizes: Record<ButtonSizeType, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  variant,
  size,
  icon,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  let iconSize: string;
  switch (size) {
    case 'sm':
      iconSize = 'w-5 h-5';
      break;
    case 'lg':
      iconSize = 'w-7 h-7';
      break;
    case 'md':
    default:
      iconSize = 'w-6 h-6';
      break;
  }
  let children: ReactNode;
  if (icon) {
    children = <span className={cx('self-center',iconSize)}>{icon}</span>;
  } else {
    children = (
      <>
        {leftIcon && <span className={cx('self-center',iconSize)}>{leftIcon}</span>}
        {props.children}
        {rightIcon && <span className={cx('self-center',iconSize)}>{rightIcon}</span>}
      </>
    );
  }

  return (
    <button
      {...props}
      children={children}
      className={cx(
        buttonVariants[variant ?? 'secondary'],
        buttonSizes[size ?? 'md'],
        'p-2 rounded-xl focus:outline-none focus:ring focus:ring-cello-100 flex items-stretch gap-1',
        props.className
      )}
    />
  );
};
