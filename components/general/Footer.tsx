import React, { useEffect, useState } from 'react';
import { useOvermind } from 'stores/Overmind';
import Avatar from 'mintflow/Avatar';

// Only show footer for external user landing pages
const FOOTER_PAGES = [
  '/wallet',
  '/not_enough',
  '/view',
  '/go',
  '/settings',
  '/login',
  '/projects/[id]',
];

export default function Footer() {
  const { state: ostate } = useOvermind();

  return (
    <footer className="fixed bottom-0 w-full z-10 items-center p-4 bg-base-100 border-t border-base-300 text-base-content">
      <div className="max-w-7xl xl:max-w-8xl mx-auto w-full flex flex-row justify-between">
        <div className="flex space-x-4 items-center">
          {/* <p className="caption2">© 2022 </p> */}
        </div>
        <div className="flex space-x-2 base2 md:place-self-center md:justify-self-end">
          <p className="base2">powered by</p>{' '}
          <a
            title="Mintgate.io"
            href="https://www.mintgate.io"
            className="link link-primary base2"
          >
            mintgate.io
          </a>
        </div>
      </div>
    </footer>
  );
}
