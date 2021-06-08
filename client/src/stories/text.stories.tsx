import React from 'react';
import { Meta } from '@storybook/react';
import { Text } from '../components/text/text';

export default {
  title: 'Text',
  component: Text,
} as Meta;

export const Variants = () => {
  return (
    <div className="flex flex-col gap-4">
      <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum saepe
        pariatur minus deleniti natus ut dignissimos fugiat quibusdam facere
        dolores deserunt enim molestiae placeat nulla illum, dicta, nemo, maxime
        error.
      </Text>
      <Text isSpan>This is span</Text>
    </div>
  );
};

export const Sizes = () => {
  return (
    <div className="flex flex-col">
      <Text size="sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, amet?
      </Text>
      <Text size="md">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, amet?
      </Text>
      <Text size="lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, amet?
      </Text>
    </div>
  );
};
