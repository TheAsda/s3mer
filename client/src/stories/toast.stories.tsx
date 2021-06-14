import React from 'react';
import { Meta } from '@storybook/react';
import { ToastProvider, ToastType, useToast } from '../components/toast/toast';
import { Button } from '../components/button/button';

export default {
  title: 'Toast',
  component: ToastProvider,
} as Meta;

const TypeButton = (props: {
  type: ToastType;
  message: string;
  title: string;
}) => {
  const toast = useToast();
  return (
    <Button onClick={() => toast(props.message, props.type)}>
      {props.title}
    </Button>
  );
};

export const Types = () => {
  return (
    <ToastProvider duration={100000}>
      <div className="flex gap-2">
        <TypeButton type="info" message="Info" title="Info" />
        <TypeButton type="success" message="Success" title="Success" />
        <TypeButton type="warning" message="Warning" title="Warning" />
        <TypeButton type="error" message="Error" title="Error" />
      </div>
    </ToastProvider>
  );
};

export const Long = () => {
  return (
    <ToastProvider duration={3000}>
      <div className="flex gap-2">
        <TypeButton
          type="info"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi molestias quia deserunt provident temporibus aliquam laboriosam adipisci, impedit officiis suscipit illo atque repellendus fugit tempore delectus, iste exercitationem cum asperiores."
          title="Long message"
        />
      </div>
    </ToastProvider>
  );
};
