import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ComponentSize } from '../utility/types';

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & {
  variant?: 'filled' | 'outline ';
  size?: ComponentSize;
  responsive?: boolean;
};

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    { children, variant, size, responsive, className, ...props },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      'badge  py-3',
      className,
      clsx({
        [`badge-${size}`]: size,
        [`bg-base-200 border-none text-base-content`]: variant === 'filled',
        [`badge-${variant}`]: variant != 'filled',
        'badge-xs md:badge-sm lg:badge-md xl:badge-lg': responsive,
      })
    );

    return (
      <div aria-label="Badge" {...props} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
