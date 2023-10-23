import React, { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ComponentSize } from '../utility/types';

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  type?: string;
  size?: ComponentSize;
  variant?: 'primary' | 'secondary' | 'nav' | 'warning' | 'neutral';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  circle?: boolean;
  className?: string;
  target?: '_blank' | '_self';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size,
      type,
      active,
      startIcon,
      endIcon,
      circle,
      fullWidth,
      loading,
      variant,
      disabled,
      className,
      target,
      style,
      ...props
    },
    ref
  ): JSX.Element => {
    startIcon = startIcon || null;
    endIcon = endIcon || null;
    variant = variant || 'primary';
    // loading = true; // testing

    const classes = twMerge(
      'btn normal-case transition-all ease-in-out duration-200 hover:scale-102',
      className,
      clsx(((startIcon && !loading) || endIcon) && 'gap-2', {
        [`btn-${size}`]: size === 'lg',
        [`btn-${size} h-9 ${circle && 'w-9'}`]: size === 'sm',
        'btn btn-circle': circle,
        'btn-block': fullWidth,
        'btn-disabled bg-base-200': disabled || loading,
        'btn-primary hover:bg-secondary hover:border-secondary text-primary-content hover:shadow-elevationMedium focus:shadow-none':
          variant === 'primary',
        'btn-outline bg-base-100 border border-base-300 hover:bg-base-100 hover:border-base-300 hover:text-base-content hover:shadow-elevationMedium focus:shadow-none':
          variant === 'secondary',
        'btn border-none bg-red-200 text-red-600 hover:text-white hover:border-2 hover:red-600 hover:bg-red-600 group-hover:text-white hover:shadow-elevationMedium focus:shadow-none':
          variant === 'warning',
        'bg-neutral hover:bg-primary hover:border-primary text-primary-content hover:shadow-elevationMedium focus:shadow-none':
          variant === 'neutral',
        [`${
          active ? 'text-primary opacity-100' : 'text-base-content'
        } btn-ghost base2 opacity-60 hover:text-base-content hover:opacity-100 hover:bg-base-200 shadow-none`]:
          variant === 'nav',
        loading: loading,
      })
    );

    return (
      <button
        {...props}
        ref={ref}
        className={classes}
        style={style}
        type={type ? type : 'button'}
        disabled={disabled || loading}
      >
        {loading ? null : startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
