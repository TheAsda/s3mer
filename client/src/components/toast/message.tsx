import React, { ReactNode, useRef, useState } from 'react';
import type { ToastType } from './toast';
import cx from 'classnames';
import { Text } from '../text/text';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  XCircleIcon,
} from '@heroicons/react/outline';

export interface MessageProps {
  message: string;
  type?: ToastType;
  onRemove: () => void;
}

const types: Record<ToastType, string> = {
  info: 'bg-cello-200',
  success: 'bg-pastel-green-500',
  warning: 'bg-bright-sun-500',
  error: 'bg-carnation-500',
};

const iconClasses = 'w-5 h-5 text-cello';

const icons: Record<ToastType, ReactNode> = {
  info: <ExclamationCircleIcon className={iconClasses} />,
  success: <CheckCircleIcon className={iconClasses} />,
  warning: <ExclamationIcon className={iconClasses} />,
  error: <XCircleIcon className={iconClasses} />,
};

export const Message = (props: MessageProps) => {
  return (
    <div
      className={cx(
        types[props.type ?? 'info'],
        'rounded-lg p-2 flex gap-2 items-center animate-slide-down mt-2 max-w-full'
      )}
      onClick={props.onRemove}
    >
      {icons[props.type ?? 'info']}
      <Text disableDark size="lg" className="font-semibold select-none">
        {props.message}
      </Text>
    </div>
  );
};
