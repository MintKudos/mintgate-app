import React, { useState, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { storageSet } from 'stores/storage';
import Script from 'next/script';
import LoadingOverlay from 'components/utility/LoadingOverlay';

export default function Logout(url) {
  const router = useRouter();
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    actions.logOut({ force: true });

    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  }, []);

  return (
    <>
      <div className="min-h-screen h-full grid grid-cols-12 gap-4">
        <LoadingOverlay text={'Logging out, please wait...'} />
      </div>
    </>
  );
}
