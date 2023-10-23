import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import ModalActions from './ModalActions';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  responsive?: boolean;
  onClickBackdrop?: () => void;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    { children, open, responsive, onClickBackdrop, className, ...props },
    ref
  ): JSX.Element => {
    const containerClasses = twMerge(
      'modal modal-middle bg-base-100 bg-opacity-60 backdrop-blur',
      clsx({
        'modal-open z-50': open,
        'modal-bottom sm:modal-middle': responsive,
      })
    );

    const bodyClasses = twMerge(
      'modal-box relative bg-base-100 border-2 border-base-300 transform',
      className
    );

    return (
      <div
        aria-label="Modal"
        aria-hidden={!open}
        aria-modal={open}
        className={containerClasses}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            if (onClickBackdrop) {
              onClickBackdrop();
            }
          }
        }}
      >
        <div {...props} className={bodyClasses} ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Actions: ModalActions,
});
