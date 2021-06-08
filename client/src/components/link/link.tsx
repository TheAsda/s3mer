import React, { ComponentPropsWithoutRef } from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import cx from 'classnames';

export type LinkVariantType = 'inline' | 'button';

const linkVariant: Record<LinkVariantType, string> = {
  inline: 'underline text-cello',
  button: 'text-gray-300 rounded-md flex gap-1 items-center bg-cello-300 p-2',
};

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  variant?: LinkVariantType;
}

export const Link = ({ variant, ...props }: LinkProps) => {
  return (
    <a {...props} tabIndex={0} className={cx(linkVariant[variant ?? 'inline'], 'cursor-pointer focus:outline-none focus:ring focus:ring-cello-100')}>
      {variant === 'inline' && props.children}
      {variant === 'button' && (
        <>
          {props.children} <ExternalLinkIcon className="w-5 h-5" />
        </>
      )}
    </a>
  );
};
