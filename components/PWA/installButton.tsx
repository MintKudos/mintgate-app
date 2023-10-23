import React, { useEffect, useState } from 'react';

let deferredPrompt;

export default function InstallButton() {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
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

  return <></>;
  /*
  return (
    <>
      {installable && <button onClick={handleInstallClick} className="group p-2 rounded-lg text-base-content opacity-80 inline-flex items-center text-base font-medium hover:text-base-content focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Install App
      </button>}
    </>
  );*/
}
