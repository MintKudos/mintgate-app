import React from 'react';

export type SelectOptionProps<T> = Omit<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  'value'
> & {
  selectedValue?: T;
  value: T;
  key?: number;
};

const Option = <T extends string | number | undefined>({
  selectedValue,
  value,
  key,
  children,
  ...props
}: SelectOptionProps<T>): JSX.Element => {
  return (
    <option {...props} selected={value === selectedValue} key={key}>
      {children}
    </option>
  );
};

export default Option;
