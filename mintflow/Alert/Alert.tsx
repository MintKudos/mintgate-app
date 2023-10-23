import React, { forwardRef, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { ComponentStatus } from '../utility/types';
import { useTimeoutFn } from 'react-use';

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  status?: ComponentStatus;
  innerClassName?: string;
  open: boolean;
  autoClose?: (x: any) => void;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      icon,
      status,
      className,
      open,
      innerClassName,
      autoClose,
      ...props
    },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      'alert fixed top-20 right-10 w-auto rounded-box',
      className,
      clsx({
        [`alert-${status}`]: status,
      })
    );

    // console.log('Alert Open', open);
    useTimeoutFn(
      () => {
        autoClose && autoClose(null);
      },
      open && autoClose ? 2000 : 0 // start if open and autoClose method passed
    );

    return (
      <Transition
        show={open}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div role="alert" {...props} ref={ref} className={classes}>
          <div className="flex-1">
            {icon}
            <label>{children}</label>
          </div>
        </div>
      </Transition>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
