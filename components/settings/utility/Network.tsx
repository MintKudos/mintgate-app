import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { getNetworkDisplay, useOvermind } from 'stores/Overmind';
import Image from 'next/image';

export default function Network({ prefix }: { prefix?: string }) {
  const { state: ostate, actions } = useOvermind();
  const network = ostate.network;
  prefix = prefix ? `${prefix} ` : '';

  return (
    <div
      id="network"
      className={`hidden md:inline-flex justify-center w-full text-sm font-medium text-base-content
        ${ostate.user.creator === true ? ' cursor-pointer' : ' cursor-text'}`}
    >
      {ostate.user?.wallets?.network === ostate.network ? (
        prefix + getNetworkDisplay(network) == 'Polygon' ? (
          <div className="bg-base-100 rounded-full p-2 border border-base-300 shadow-mg">
            <img src="/polygon.svg" className="w-5 h-5" />
          </div>
        ) : (
          getNetworkDisplay(network)
        )
      ) : (
        <span className="text-yellow-600">
          Please connect your wallet to {getNetworkDisplay(network)}
        </span>
      )}
    </div>
  );
}
