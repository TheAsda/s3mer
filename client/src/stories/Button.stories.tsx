import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '../components/button/button';
import { ClipboardIcon, ArrowRightIcon, CogIcon } from '@heroicons/react/solid';

export default {
  title: 'Button',
  component: Button,
} as Meta;
//https://colors.dopely.top/palette-generator/I14l1eNlL7a

export const Primary = () => {
  return (
    <div className="p-4 flex gap-4 dark:bg-gray-700">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
    </div>
  );
};

export const Sizes = () => {
  return (
    <div className="p-4 flex gap-4 items-center dark:bg-gray-700">
      <Button size="sm">Small</Button>
      <Button size="md">Middle</Button>
      <Button size="lg">Large</Button>
    </div>
  );
};

export const IconButton = () => {
  return (
    <div className="p-4 flex gap-4 items-center dark:bg-gray-700">
      <Button icon={<CogIcon />} />
      <Button leftIcon={<ClipboardIcon />}>Copy to clipboard</Button>
      <Button rightIcon={<ArrowRightIcon />}>Next</Button>
    </div>
  );
};
