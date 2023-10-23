import React from 'react';
import { useOvermind } from 'stores/Overmind';
import { HomeIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import Button from 'mintflow/Button';
import ALink from 'components/ALink';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavItems({ small }) {
  const { state: ostate } = useOvermind();

  const navigation = [
    { name: 'Home Feed', href: '/', icon: HomeIcon, current: true },
    //{ name: 'Popular', href: '#', icon: FireIcon, current: false },
    /* {
      name: 'Communities',
      href: '/communities',
      icon: UserGroupIcon,
      current: false,
    },
    {
      name: 'My Posts',
      href: '/u/' + ostate.user.username,
      icon: UserIcon,
      current: false,
    },
    */
  ];

  return (
    <>
      {navigation.map((item) => (
        <ALink href={item.href} key={item.name} title={item.name}>
          <div
            className={`cursor-pointer group flex flex-row space-x-2 items-center transition transform ${
              !small ? 'hover:scale-105' : 'hover:scale-120'
            } ease-in-out duration-200`}
          >
            <div className="mr-3 flex items-center justify-center p-3 bg-base-200 rounded-box">
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-base-content opacity-80'
                    : 'text-base-content opacity-50 group-hover:opacity-80',
                  ' flex-shrink-0 h-7 w-7'
                )}
                aria-hidden="true"
              />
            </div>
            {small === false && (
              <p className="text-sm font-medium text-base-content opacity-80 group-hover:opacity-100 group-hover:text-primary">
                {item.name}
              </p>
            )}
          </div>
        </ALink>
      ))}
    </>
  );
}
