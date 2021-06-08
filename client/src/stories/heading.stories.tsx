import React from 'react';
import { Meta } from '@storybook/react';
import { Heading } from '../components/heading/heading';

export default {
  title: 'Heading',
  component: Heading,
} as Meta;

export const Levels = () => {
  return (
    <div className="flex flex-col gap-4 dark:bg-gray-700 p-4">
      <Heading level={1}>First level</Heading>
      <Heading level={2}>Second level</Heading>
      <Heading level={3}>Third level</Heading>
      <Heading level={4}>Fourth level</Heading>
      <Heading level={5}>Fifth level</Heading>
    </div>
  );
};
