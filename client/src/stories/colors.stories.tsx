import React from 'react';
import { Meta } from '@storybook/react';
import cx from 'classnames';

export default {
  title: 'Theme',
} as Meta;

const ColorTile = (props: { color: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cx(
          props.color,
          'h-28 w-28 grid place-items-center text-center'
        )}
      ></div>
      <span className="text-center w-full select-all">{props.color}</span>
    </div>
  );
};

const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const ColorLine = (props: { title: string; color: string }) => {
  const colors = shades.map((shade) => `bg-${props.color}-${shade}`);
  return (
    <div>
      <h1 className="text-center">{props.title}</h1>
      {colors.map((color) => (
        <ColorTile color={color} />
      ))}
    </div>
  );
};

export const Colors = () => {
  return (
    <div className="flex gap-4">
      <ColorLine title="Gray" color="gray" />
      <ColorLine title="Primary" color="cello" />
      <ColorLine title="Accent" color="gigas" />
      <ColorLine title="Success" color="pastel-green" />
      <ColorLine title="Warning" color="bright-sun" />
      <ColorLine title="Error" color="carnation" />
    </div>
  );
};
