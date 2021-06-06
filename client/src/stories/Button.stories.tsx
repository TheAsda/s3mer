import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from '../components/button/button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

export const Primary = () => {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">accent</Button>
    </div>
  );
};
