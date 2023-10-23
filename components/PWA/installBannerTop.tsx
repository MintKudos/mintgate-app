import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useOvermind } from "stores/Overmind";
let deferredPrompt;

export default function InstallBannerTop() {
  const [installable, setInstallable] = useState(false);
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
      window.location.reload();
    });
  }, []);

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const [installBannerOpen, setInstallBannerOpen] = useState(true);

  // return <div />;
  // ======= TODO

  return (
    <Transition
      show={installBannerOpen && !!ostate.user.uid}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {installable &&
        <div className="block lg:hidden bg-base-100 bg-opacity-60 backdrop-blur-md fixed w-full bottom-0 z-50">
          <div className="max-w-8xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap w-full">
              <div className="w-0 flex-1 flex items-center">
                <img src="/logo-icon.svg" className="w-10" />
                <p className="ml-3 font-medium text-base-content truncate">
                  <span className="md:hidden">
                    Download MintGate App!
                  </span>
                </p>
              </div>
              <div onClick={handleInstallClick} className="justify-end order-3 mt-2 flex-shrink-0 w-44 sm:order-2 sm:mt-0 sm:w-auto">
                <p className="btn btn-base transform hover:scale-90 buttontext ">
                  Install now
                </p>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button type="button" onClick={() => setInstallBannerOpen(!installBannerOpen)} className="flex pr-4 pt-2 transform hover:scale-90 rounded-md focus:outline-none">
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-6 w-6 text-base-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </Transition>
  );
}