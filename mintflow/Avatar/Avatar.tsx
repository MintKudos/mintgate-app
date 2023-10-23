import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Fastly from 'components/utility/Fastly';
import AvatarGroup from './AvatarGroup';
// import Avvvatars from 'avvvatars-react';
import { useOvermind } from 'stores/Overmind';
import dynamic from 'next/dynamic';

const Avvvatars = dynamic(() => import('avvvatars-react'), { ssr: false });

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  letters?: string;
  size?: '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  shape?: 'square' | 'circle';
  color?: string;
  border?: boolean;
  borderSize?: '1' | '2' | '4' | '8';
  borderColor?: string;
  shadow?: boolean;
  online?: boolean;
  offline?: boolean;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      letters,
      size,
      shape,
      color,
      border,
      borderColor,
      online,
      offline,
      borderSize,
      shadow,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    src = src?.replace('https://ipfs.io', 'https://ipfs.mintgate.io');
    src = src?.replace('mintgate.app', 'mintgate.io');

    const containerClasses = twMerge(
      'avatar',
      className,
      clsx({
        online: online,
        offline: offline,
        placeholder: !src,
      })
    );

    const imgClasses = clsx({
      ring: border,
      [`ring-${borderColor}`]: borderColor,
      [`ring-${borderSize}`]: borderSize,
      'rounded-btn': shape === 'square',
      'rounded-full': shape === 'circle',
      'w-28 h-28 text-3xl': size === '2xl',
      'w-24 h-24 text-3xl': size === 'xl',
      'w-20 h-20': size === 'lg',
      'w-14 h-14': !size || size === 'md',
      'w-12 h-12': size === 'sm',
      'w-10 h-10': size === 'xs',
      'shadow-elevationMedium': shadow === true,
    });

    const placeholderClasses = clsx({
      'ring ring-offset-base-100 ring-offset-2': border,
      [`ring-${borderColor}`]: borderColor,
      [`ring-${borderSize}`]: borderSize,
      'rounded-box': shape === 'square',
      'rounded-full': shape === 'circle',
      'w-28 h-28 text-3xl': size === '2xl',
      'w-24 h-24 text-3xl': size === 'xl',
      'w-20 h-20': size === 'lg',
      'w-14 h-14': !size || size === 'md',
      'w-12 h-12': size === 'sm',
      'w-10 h-10': size === 'xs',
    });

    const { state: ostate } = useOvermind();

    return (
      <div
        aria-label="Avatar photo"
        {...props}
        className={containerClasses}
        ref={ref}
      >
        {src ? (
          <div className={imgClasses}>
            <Fastly
              src={src}
              alt="avatar"
              className="w-full h-full"
              onError={(e) => (e.target.src = `/error-placeholder.png`)}
            />
          </div>
        ) : (
          <Avvvatars
            value={ostate.user.username}
            style="shape"
            borderColor="#fff"
            borderSize={4}
            shadow={true}
            size={
              size === 'xl'
                ? 144
                : size === 'lg'
                ? 128
                : size === 'md'
                ? 80
                : size === 'sm'
                ? 48
                : size === 'xs'
                ? 32
                : 112
            }
          />
        )}
      </div>
    );
  }
);

export default Object.assign(Avatar, {
  AvatarGroup: AvatarGroup,
});
