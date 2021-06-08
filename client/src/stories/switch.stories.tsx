import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Switch } from '../components/switch/switch';

export default {
  title: 'Switch',
  component: Switch,
} as Meta;

export const Variants = () => {
  const [state, setState] = useState(false);
  return (
    <div className="flex gap-4 items-center">
      <Switch checked={state} onChange={setState} name="Example switch" />
    </div>
  );
};
