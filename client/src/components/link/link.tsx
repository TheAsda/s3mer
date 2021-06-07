import React, { ComponentPropsWithoutRef } from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import cx from 'classnames';

export type LinkVariantType = 'inline' | 'button';

const linkVariant: Record<LinkVariantType, string> = {
  inline: 'underline',
  button: 'rounded-md flex gap-1 items-center bg-casper-300 p-2',
};

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  variant?: LinkVariantType;
}

export const Link = ({ variant, ...props }: LinkProps) => {
  return (
    <a {...props} tabIndex={0} className={cx(linkVariant[variant ?? 'inline'], 'text-cello cursor-pointer focus:outline-none focus:ring focus:ring-offset-jelly-bean-400')}>
      {variant === 'inline' && props.children}
      {variant === 'button' && (
        <>
          {props.children} <ExternalLinkIcon className="w-5 h-5" />
        </>
      )}
    </a>
  );
};
