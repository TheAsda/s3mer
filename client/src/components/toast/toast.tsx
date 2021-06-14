import { XIcon } from '@heroicons/react/solid';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Button } from '../button/button';
import { Text } from '../text/text';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Message } from './message';

const ToastContext = createContext<
  | { setState: Dispatch<SetStateAction<ToastState[]>>; duration: number }
  | undefined
>(undefined);

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProviderProps {
  duration: number;
}

interface ToastState {
  id: Symbol;
  msg: string;
  type?: ToastType;
}

export const ToastProvider = (props: PropsWithChildren<ToastProviderProps>) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const removeToast = (id: Symbol) => {
    setToasts((s) => {
      const newState = s.filter((item) => item.id !== id);
      return newState.length === s.length ? s : newState;
    });
  };

  return (
    <>
      <ToastContext.Provider
        value={{ setState: setToasts, duration: props.duration }}
      >
        {props.children}
      </ToastContext.Provider>
      <div className="absolute bottom-0 right-0 p-2 flex flex-col gap-2 items-end">
        {toasts.map((item) => {
          return <Message message={item.msg} type={item.type} />;
        })}
      </div>
    </>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be within provider');
  }

  const toast = (msg: string, type?: ToastType) => {
    context.setState((s) => {
      const id = Symbol();
      setTimeout(
        () =>
          context.setState((s) => {
            const newState = s.filter((item) => item.id !== id);
            return newState.length === s.length ? s : newState;
          }),
        context.duration
      );
      return s.concat({ msg, type, id });
    });
  };

  return toast;
};
