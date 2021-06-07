import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from '../components/button/button';

export default {
  title: 'Button',
  component: Button,
} as Meta;
//https://colors.dopely.top/palette-generator/I14l1eNlL7a

export const Primary = () => {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
    </div>
  );
};
