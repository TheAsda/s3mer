import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';
import cx from 'classnames';

export type ButtonVariantType = 'primary' | 'secondary' | 'accent';

const buttonVariants: Record<ButtonVariantType, string> = {
  primary: 'text-paris-white bg-cello hover:bg-cello-400',
  secondary: 'text-cello border border-cello hover:bg-casper-100',
  accent: 'text-paris-white bg-jelly-bean hover:bg-jelly-bean-400',
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
    children = <span className={iconSize}>{icon}</span>;
  } else {
    children = (
      <>
        {leftIcon && <span className={iconSize}>{leftIcon}</span>}
        {props.children}
        {rightIcon && <span className={iconSize}>{rightIcon}</span>}
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
        'p-2 rounded-xl focus:outline-none focus:ring focus:ring-offset-jelly-bean-400 flex items-stretch gap-1',
        props.className
      )}
    />
  );
};
