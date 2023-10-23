import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ComponentColor, ComponentPosition } from '../utility/types';

export type TooltipProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  message: string;
  open?: boolean;
  color?: ComponentColor;
  position?: ComponentPosition;
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { message, children, open, color, position, className, ...props },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      'tooltip cursor-default z-40',
      className,
      clsx({
        [`tooltip-${color}`]: color,
        [`tooltip-${position}`]: position,
        'tooltip-open': open,
      })
    );

    return (
      <div
        role="tooltip"
        {...props}
        ref={ref}
        data-tip={message}
        className={classes}
      >
        {children}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
