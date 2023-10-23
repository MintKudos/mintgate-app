import React, { cloneElement, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ComponentColor, ComponentSize } from '../utility/types';

import SelectOption, { SelectOptionProps } from './SelectOption';

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type SelectProps<T> = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange' | 'value' | 'size' | 'color'
> & {
  children: ReactElement<SelectOptionProps<T>>[];
  initialValue?: T;
  value?: T;
  label?: string;
  onChange?: (value: T) => void;
  size?: ComponentSize;
  borderOffset?: boolean;
  name?: string;
  id?: string;
};

const SelectInner = <T extends string | number | undefined>(
  props: SelectProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>
): JSX.Element => {
  const {
    children,
    initialValue,
    value,
    label,
    onChange,
    size,
    name,
    id,
    borderOffset,
    className,
    ...rest
  } = props;

  const classes = twMerge(
    'select border border-base-300 focus:shadow-sm focus:ring focus:border-primary ring-primary/50',
    className,
    clsx({
      [`select-${size}`]: size,
      [`focus:outline-offset-0`]: !borderOffset,
    })
  );

  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    value || initialValue
  );

  return (
    <div>
      {label && (
        <label className="label" htmlFor={name}>
          <span className="label-text base1">{label}</span>
        </label>
      )}
      <select
        {...rest}
        ref={ref}
        name={name}
        id={id}
        className={classes}
        onChange={(e) => {
          setSelectedValue(e.currentTarget.value as T);
          onChange && onChange(e.currentTarget.value as T);
        }}
      >
        {children.map((child) => {
          return cloneElement(child, {
            selectedValue: selectedValue,
          });
        })}
      </select>
    </div>
  );
};

// Make forwardRef work with generic component
const Select = React.forwardRef(SelectInner) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> }
) => ReturnType<typeof SelectInner>;

export default Object.assign(Select, { Option: SelectOption });
