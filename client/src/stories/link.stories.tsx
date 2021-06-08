import React from 'react';
import { Meta } from '@storybook/react';
import { Link } from '../components/link/link';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Link',
  component: Link,
} as Meta;

export const Variants = () => {
  return (
    <BrowserRouter>
      <div className="flex gap-4 items-center p-4 dark:bg-gray-700">
        <Link to={''} variant="inline">
          Inline link
        </Link>
        <Link to={''} variant="button">
          Button link
        </Link>
      </div>
    </BrowserRouter>
  );
};
