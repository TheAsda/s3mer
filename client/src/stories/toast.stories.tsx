import React from 'react';
import { Meta } from '@storybook/react';
import { ToastProvider, ToastType, useToast } from '../components/toast/toast';
import { Button } from '../components/button/button';

export default {
  title: 'Toast',
  component: ToastProvider,
} as Meta;

const TypeButton = (props: { type: ToastType }) => {
  const toast = useToast();
  return (
    <Button onClick={() => toast(props.type, props.type)}>{props.type}</Button>
  );
};

export const Types = () => {
  return (
    <ToastProvider duration={100000}>
      <div className="flex gap-2">
        <TypeButton type="info" />
        <TypeButton type="success" />
        <TypeButton type="warning" />
        <TypeButton type="error" />
      </div>
    </ToastProvider>
  );
};
