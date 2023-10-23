import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ComponentSize } from '../utility/types';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  borderOffset?: boolean;
  size?: ComponentSize;
  disabled?: boolean;
  warning?: boolean;
  variant: 'primary' | 'warning';
  label?: string;
  labelalt?: string;
  labelWarning?: string;
  name?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      placeholder,
      borderOffset,
      size,
      disabled,
      className,
      variant,
      label,
      labelalt,
      labelWarning,
      name,
      type,
      ...props
    },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      'input border border-base-300 bg-base-100',
      className,
      clsx({
        [`input-${size}`]: size,
        [`focus:outline-offset-0`]: !borderOffset,
        'border-red-500 focus:ring ring-red-200 focus:shadow-sm':
          variant === 'warning',
        'focus:border-primary focus:ring ring-primary/50 focus:shadow-sm':
          variant === 'primary',
      })
    );

    return (
      <div>
        {label && (
          <label className="label" htmlFor={name}>
            <span className="label-text base1">{label}</span>
          </label>
        )}
        <input
          {...props}
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classes}
          disabled={disabled}
        />
        {labelalt && (
          <label className="-mt-0.5 label">
            <span className="label-text-alt caption2 opacity-80">
              {labelalt}
            </span>
          </label>
        )}
        {labelWarning && variant === 'warning' && (
          <label className="-mt-0.5 label">
            <span className="label-text-alt caption2 text-red-500">
              {labelWarning}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
