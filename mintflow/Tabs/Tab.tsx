import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type TabProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  value: T;
  active?: boolean;
};

const TabInner = <T extends string | number | undefined>(
  { children, value, active, hidden, className, style, ...props }: TabProps<T>,
  ref?: React.ForwardedRef<T>
): JSX.Element => {
  const classes = twMerge(
    'cursor-pointer group inline-flex items-center py-1 px-1 base1 transition ease-in-out duration-150',
    className,
    clsx({
      'border-b-2 border-primary hover:text-base-content text-base-content':
        active === true,
      'border-transparent border-b-2 hover:border-base-300 text-base-content opacity-80 hover:opacity-80 hover:text-base-content':
        active === false,
      hidden: hidden,
    })
  );

  return (
    <div
      suppressHydrationWarning={true}
      key={value + '-' + children.toString()}
      role="tab"
      {...props}
      className={classes}
      style={style}
    >
      {children.toString()}
    </div>
  );
};

export default TabInner;
