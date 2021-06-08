import React, { ComponentPropsWithoutRef } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import cx from 'classnames';

export type LinkVariantType = 'inline' | 'button';

const linkVariant: Record<LinkVariantType, string> = {
  inline: 'underline text-cello',
  button: 'text-gray-200 rounded-md flex gap-1 items-center bg-cello-300 p-2',
};

export interface LinkProps extends RouterLinkProps {
  variant?: LinkVariantType;
}

export const Link = ({ variant, ...props }: LinkProps) => {
  let children;

  switch (variant ?? 'inline') {
    case 'inline':
      children = props.children;
      break;

    default:
      children = (
        <>
          {props.children} <ExternalLinkIcon className="w-5 h-5" />
        </>
      );
      break;
  }

  return (
    <RouterLink
      {...props}
      tabIndex={0}
      className={cx(
        linkVariant[variant ?? 'inline'],
        'cursor-pointer focus:outline-none focus:ring focus:ring-cello-100',
        props.className
      )}
    >
      {children}
    </RouterLink>
  );
};
