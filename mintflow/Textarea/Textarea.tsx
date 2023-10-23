import React, { cloneElement, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type TextareaProps<T> = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value'
> & {
  initialValue?: T;
  value?: T;
  warning?: boolean;
  variant: 'primary' | 'warning';
  disabled?: boolean;
  label?: string;
  labelalt?: string;
  labelWarning?: string;
  onValChange?: (value: T) => void;
  onChange?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  key?: string;
  borderOffset?: boolean;
  maxLength?: number;
  id?: string;
  name?: string;
};

const TextareaInner = <T extends string | number | undefined>(
  props: TextareaProps<T>,
  ref: React.ForwardedRef<HTMLTextAreaElement>
): JSX.Element => {
  const {
    initialValue,
    value,
    key,
    variant,
    label,
    labelalt,
    labelWarning,
    disabled,
    placeholder,
    warning,
    name,
    maxLength,
    onValChange,
    onChange,
    borderOffset,
    className,
    ...rest
  } = props;

  const classes = twMerge(
    'textarea bg-base-100 border border-base-300',
    className,
    clsx({
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
      <textarea
        {...props}
        key={key}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          if (onChange) onChange(e);
          if (onValChange) onValChange(e.currentTarget?.value as T);
        }}
        className={classes}
        disabled={disabled}
        maxLength={maxLength}
        ref={ref}
      />
      {labelalt && (
        <label className="-mt-1 label">
          <span className="label-text-alt caption2 opacity-80">{labelalt}</span>
        </label>
      )}
      {labelWarning && warning && (
        <label className="-mt-1 label">
          <span className="label-text-alt caption2 text-red-500">
            {labelWarning}
          </span>
        </label>
      )}
    </div>
  );
};

// Make forwardRef work with generic component
const Textarea = React.forwardRef(TextareaInner) as <T>(
  props: TextareaProps<T> & { ref?: React.ForwardedRef<HTMLTextAreaElement> }
) => ReturnType<typeof TextareaInner>;

export default Object.assign(Textarea);
