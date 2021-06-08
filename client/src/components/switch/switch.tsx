import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import cx from 'classnames';

export interface SwitchProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  name: string;
}

export const Switch = (props: SwitchProps) => {
  return (
    <HeadlessSwitch
      className={cx(
        props.checked ? 'bg-cello-300' : 'bg-gray-300 dark:bg-gray-400',
        'relative inline-flex items-center h-6 rounded-full w-11 focus:ring focus:ring-cello-100 focus:outline-none'
      )}
      checked={props.checked}
      onChange={props.onChange}
    >
      <span className="sr-only">{props.name}</span>
      <span
        className={cx(
          props.checked ? 'translate-x-6' : 'translate-x-1',
          'inline-block w-4 h-4 bg-white rounded-full transform transition ease-in duration-100'
        )}
      />
    </HeadlessSwitch>
  );
};
