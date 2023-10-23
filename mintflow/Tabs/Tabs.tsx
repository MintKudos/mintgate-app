import React, { cloneElement, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Tab, { TabProps } from './Tab';

export type TabsProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactElement<TabProps<T>>[];
  value?: T;
  center?: boolean;
};

const TabsInner = <T extends string | number | undefined>(
  props: TabsProps<T>,
  ref?: React.ForwardedRef<T>
): JSX.Element => {
  const { children, value, onChange, className, center, ...rest } = props;

  const classes = twMerge(
    'px-0 md:px-3 flex center space-x-12 border-b border-base-300 w-full',
    className,
    clsx({
      'justify-center': center,
    })
  );

  return (
    <div role="tablist" {...rest} key={value} className={classes}>
      {children}
    </div>
  );
};

export default Object.assign(TabsInner, { Tab });
