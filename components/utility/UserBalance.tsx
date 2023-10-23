import React, { useState, useEffect } from 'react';
import { getNativeBal } from 'utils/helpers/getAccountBal';
import { useOvermind } from 'stores/Overmind';

export default function UserBalance() {
  const { state: ostate, actions } = useOvermind();

  let userMaticBal;

  useEffect(() => {
    if (ostate?.user?.wallets?.address)
      userMaticBal = getNativeBal(ostate?.user?.wallets?.address, 'matic');
  }, [ostate?.user?.wallets?.address]);

  if (!userMaticBal) return null;

  return (
    <div className="flex flex-row space-x-8 shadow-xl rounded-xl text-xl bg-gradient  w-full px-6 py-8">
      <span className="flex">User Balance:</span>
      <span className="flex">{userMaticBal}</span>
    </div>
  );
}
