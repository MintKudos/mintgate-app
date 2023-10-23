// Gets a wallet provider for mutation/signing
import { memo, useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { storageSet, storageRemove, storageGet } from 'stores/storage';
import { json } from 'overmind';
import { useAsync } from 'react-use';
import { providers } from 'ethers';

const RPC_URL =
  'https://eth-mainnet.g.alchemy.com/v2/-JsP22prmCljKGLwgzLdLAeJoBtnkQYt';

export function getRPC(networkParam) {
  if (networkParam === -1) networkParam = 1;
  let RPC = RPC_URL;
  if (networkParam === 137)
    RPC =
      'https://polygon-mainnet.g.alchemy.com/v2/yC6tfD7yw3WDxRKos9z9kyPUF2X4GtK2';
  // 'https://rpc-mainnet.maticvigil.com/v1/9b7cd8e91fbc51c06487633ed8fb742850e0e7ca';
  else if (networkParam === 80001)
    RPC =
      // 'https://polygon-mumbai.g.alchemy.com/v2/LAl1e6ODUvyMhgvHxXGgn0SqtznuI7TW'; // from thirdweb
      'https://polygon-mumbai.g.alchemy.com/v2/7ob3WoNrm5LeUYYqxnumpsMlkA7sW_3x';

  return RPC;
}

export function disconnect() {
  if (typeof window === 'undefined') return;
  const _board = window['_board'];
  // console.log('_onboard', _onboard);
  if (_board) _board.disconnectWallet({ label: 'MetaMask' });
  if (_board) _board.disconnectWallet({ label: 'Torus' });
  storageRemove('selectedWallet');
}

export async function clearMM() {
  if (
    typeof window !== 'undefined' &&
    window.ethereum &&
    window.ethereum.request
  ) {
    // Disconnect MM
    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  }
}

export async function removeWallets(force?: boolean) {
  console.log('removeWallets');
  storageRemove('signature_ver');
  storageRemove('wallet_network');
  storageRemove('wallet');
  storageRemove('signature');

  if (force) {
    await clearMM();
  }
}

export function useProvider() {
  const { state: ostate, actions } = useOvermind();

  const r = useMemo(() => {
    if (!ostate.user.wallets.provider) return null;
    return json(ostate.user.wallets.provider) as any; // use local provider, avoids mutation issue
  }, [ostate.user.wallets.provider]);

  return r || null;
}
