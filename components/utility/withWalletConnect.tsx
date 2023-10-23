import { memo, useCallback, useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useAsync, useInterval, useSearchParam, useTimeout } from 'react-use';
import { getNetworkDisplay, useOvermind } from 'stores/Overmind';
import { storageSet, storageRemove, storageGet } from 'stores/storage';
// import * as withWallet from './withWallet';
import { init, useConnectWallet, useSetChain } from '@web3-onboard/react';
// import Onboard, { OnboardAPI } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { CHAINS } from './makeMagic';
// import { ConnectMagic } from './ConnectMagic';
// import torusModule from '@web3-onboard/torus';
// import ledgerModule from '@web3-onboard/ledger';

// import { clearMM, removeWallets } from './withWallet';
// import { json } from 'overmind'

const ONBOARD_API = '197c953a-31c3-4b89-a911-50856660b044';
// const RPC_URL = 'https://mainnet.infura.io/v3/3dd86320c1ee4ceabbb28be03f289bbe';
// const INFURA_KEY = '3dd86320c1ee4ceabbb28be03f289bbe';
// const APP_NAME = 'MintGate';
// const APP_URL = 'https://app.mintgate.io';
// const CONTACT_EMAIL = 'support@mintkudos.io';
// const FORTMATIC_KEY = 'pk_live_0DC5432BF1AABD90';
// const PORTIS_KEY = 'a7cfa21a-0311-4107-b540-375ed1ecf8f7';
// const TORUS_KEY =
//   '63d99e1bd4c95d7596a918a6ae4f90e0d7962b1208d6c033e28f0f9202578d00';

const injected = injectedModule();
const walletConnect = walletConnectModule();

// let inited = false;
(function _init() {
  //if (inited) return;
  //inited = true;
  init({
    wallets: [injected, walletConnect], // magic
    chains: CHAINS,
    appMetadata: {
      name: 'Mintgate',
      icon: 'logos/apple-touch-icon.png',
      description: 'Mintgate is the ultimate NFT membership platform',
      gettingStartedGuide: 'https://mintgate.gitbook.io/mintgate-docs/',
      explore: 'https://www.mintgate.io',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      ],
    },
    accountCenter: {
      desktop: {
        enabled: false,
        containerElement: undefined,
      },
      mobile: {
        enabled: false,
        containerElement: undefined,
      },
    },
  });
})();
// _init();

export default function useWalletConnect() {
  return <WalletConnect />;
}

// var connected = false;
// https://overmindjs.org/api-1/json
// ====================================
function WalletConnect() {
  const { state: ostate, actions } = useOvermind();

  // const [wallet, setWallet] = useState(false);
  // const [ready, setReady] = useState(false);

  const networkParam = ostate.network;
  const chainIdSelect = !networkParam ? null : '0x' + networkParam.toString(16);

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain, // boolean indicating if the chain is in the process of being set
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  useEffect(() => {
    if (!connectedChain?.id) return;

    if (connectedChain?.id === '0x1') {
      actions.updateWallet({ network: 1 });
    } else if (connectedChain?.id === '0x89') {
      actions.updateWallet({ network: 137 });
    }
  }, [connectedChain?.id]);

  useEffect(() => {
    if (ostate.user.wallets.provider) return;
    console.log('connected', networkParam, wallet);

    if (window.location.pathname.includes('logout')) return;
    // if (connected) return;
    if (!networkParam || !!wallet) return;

    console.log('connect');

    const swallet = storageGet('selectedWallet') || null;

    const params = swallet
      ? {
          autoSelect: {
            label: swallet,
            disableModals: true,
          },
        }
      : undefined;

    connect(params)
      .catch((e) => {
        console.warn('connect error:', e);
      })
      .then((x) => {
        // connected = true;
        return x;
      });
  }, [networkParam, ostate.walletTrigger, ostate.user.wallets.provider]);

  // console.log('ostate.walletTrigger', ostate.walletTrigger);

  useEffect(() => {
    if (!wallet) return;
    if (!networkParam) return;
    if (!chainIdSelect) return;

    // if (chainIdSelect !== connectedChain?.id) {
    //   console.log('set chain', chainIdSelect);
    //   setChain({
    //     chainId: chainIdSelect,
    //   });
    // }
    // setChain({ chainId: chainIdSelect });
    // console.log('wallet', wallet);

    const address = wallet?.accounts?.[0]?.address;
    if (!address) return;
    let chainId = Number.parseInt(wallet.chains[0].id, 16);

    if (window.location.pathname.startsWith('/feed')) {
      setChain({
        chainId: chainIdSelect,
      });
      chainId = Number.parseInt(chainIdSelect, 16);
    } else
      setChain({
        chainId: wallet.chains[0].id,
      });

    const updateObj = {
      account: address,
      network: chainId,
      provider: wallet.provider,
    };

    storageSet('selectedWallet', wallet.label);
    actions.updateWallet(updateObj);
  }, [wallet, chainIdSelect]);

  return null;
}
