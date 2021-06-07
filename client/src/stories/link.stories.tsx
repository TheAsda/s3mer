import React from 'react';
import { Meta } from '@storybook/react';
import { Link } from '../components/link/link';

export default {
  title: 'Link',
  component: Link,
} as Meta;

export const Variants = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link variant="inline">Inline link</Link>
      <Link variant="button">Button link</Link>
    </div>
  );
};
