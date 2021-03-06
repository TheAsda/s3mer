import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
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
      <div className="max-h-screen overflow-hidden absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-1/3">
        {toasts.map((item) => {
          return (
            <Message
              message={item.msg}
              type={item.type}
              onRemove={() => removeToast(item.id)}
            />
          );
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
