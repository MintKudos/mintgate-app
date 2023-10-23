import Avatar from 'mintflow/Avatar';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Fastly from 'components/utility/Fastly';

export function NFTAvatar({ title, img }: { title: string; img: string }) {
  const [isShowing, setIsShowing] = useState(false);

  img = img?.replace('https://ipfs.io', 'https://ipfs.mintgate.io');

  return (
    <>
      <div className="flex flex-row items-center">
        <div
          onMouseEnter={() => setIsShowing(true)}
          className={`
          ${isShowing ? '' : 'text-opacity-90'}
          group inline-flex items-center z-20`}
        >
          {img && <Avatar size="sm" src={img} shape="circle" />}
        </div>
        <p className="p-2 pr-6 text-sm font-medium truncate text-base-content opacity-80 z-20">
          {title}
        </p>
        <div className="absolute top-0 h-full w-auto mx-auto max-w-7xl inset-0 rounded-full backdrop-blur-xl overflow-hidden border border-base-300">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-transparent to-base-200 z-10" />
          <Fastly
            src={img}
            className="h-full w-full object-fill blur-2xl saturate-200"
          />
        </div>
      </div>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className="absolute top-0 left-0 max-w-lg z-40"
          onMouseLeave={() => setIsShowing(false)}
        >
          <Avatar
            src={img}
            borderColor="base-100"
            size="2xl"
            className="relative rounded-box overflow-hidden"
          />
        </div>
      </Transition>
    </>
  );
}
