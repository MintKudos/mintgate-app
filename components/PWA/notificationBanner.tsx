import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useOvermind } from 'stores/Overmind';
import { useLocalStorage } from 'react-use';
import ALink from 'components/ALink';

export default function NotificationBanner() {
  // Local state closed UI
  const [_notificationOpen, _setNotificationOpen] = useState(true);
  const { state: ostate } = useOvermind();

  // Remind the user 3 times
  const [notificationOpen, setNotificationOpen] = useLocalStorage(
    'notificationClosed_affiliates', // change key on new versions
    true
  );

  // Show this notice only on:
  // is logged in and a contributor and not enabled rewards and has launched a contract
  const userCondition = !!ostate.user.uid && !!ostate.user.creator;
  // console.log(
  //   'userCondition',
  //   userCondition,
  //   _notificationOpen,
  //   notificationOpen
  // );

  return null;

  return (
    <Transition
      show={_notificationOpen && notificationOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
        <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
          <ALink
            href="/settings"
            title="Collections"
            className="text-primary-content"
            onClick={() => {
              _setNotificationOpen(false);
            }}
          >
            <div className="p-2 rounded-lg bg-primary shadow-lg sm:p-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <div className="ml-3 font-medium text-primary-content text-sm">
                    <span className="inline">
                      NEW: Community Referral Rewards!
                      <br />
                      Empower your fans to grow your project by setting up
                      referral rewards for affiliate links! <u>Click here</u> to
                      get started.
                    </span>
                  </div>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e && e.preventDefault();
                      setNotificationOpen(false);
                      _setNotificationOpen(false);
                    }}
                    className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon
                      className="h-6 w-6 text-primary-content"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </ALink>
        </div>
      </div>
    </Transition>
  );
}
