import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import {
  ComponentBrandColors,
  ComponentSize,
} from '../utility/types'

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
>  & {
    color?: ComponentBrandColors
    size?: ComponentSize
    value?: string
  }

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ color, size, name, value, className, ...props }, ref): JSX.Element => {
    const classes = twMerge(
      'radio',
      className,
      clsx({
        [`radio-${size}`]: size,
        [`radio-${color}`]: color,
      })
    )

    return (
      <input
        {...props}
        ref={ref}
        type="radio"
        name={name}
        value={value}
        className={classes}
      />
    )
  }
)

Radio.displayName = 'Radio'

export default Radio
