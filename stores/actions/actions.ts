import { removeWallets } from 'components/utility/withWallet';
import { disconnect } from 'components/utility/withWallet';
import { MGContext, getDefaultState } from '../Overmind';
import {
  storageSet,
  storageRemove,
  removeAllCookies,
  storageGet,
} from '../storage';
import { json, statemachine } from 'overmind';

type JSObject = { [key: string]: any };

// play video, audio, iframe
export function setPlayer({ state, actions }: MGContext, player_lid: string) {
  state.player_lid = player_lid;
}
export function hideNav({ state, actions }: MGContext, mode: boolean) {
  state.hideNav = mode;
}

export function setTheme(
  { state, actions }: MGContext,
  theme: { [key: string]: any }
) {
  state.theme = theme;
}

export async function logOut({ state, actions }: MGContext, { force }) {
  // console.warn('logOut');

  storageRemove('jwtapi');
  storageRemove('account');
  storageRemove('username');
  storageRemove('uid');
  storageRemove('jwt');
  storageRemove('wallet');
  storageRemove('network');
  storageRemove('signature');
  storageRemove('signature_' + state.user.wallets.address);
  storageRemove('email');
  localStorage.removeItem('bust');

  await removeWallets();

  // localStorage.removeItem("site_network");
  localStorage.removeItem('callback');
  localStorage.removeItem('referral');
  localStorage.removeItem('referralExpire');

  storageRemove('selectedWallet');
  storageRemove('email');

  if (force) {
    storageRemove('whitelabel');
    localStorage.clear(); // clear everything
    // removeAllCookies();

    // only when forced
    disconnect();
    if (state.user.wallets.provider && state.user.wallets.provider.signOut) {
      state.user.wallets.provider.signOut();
    }
  }

  state.user.wallets.address = null;
  state.user.wallets.signature_login = null;
  state.user.jwt = null;

  state.user = {
    ...getDefaultState().user,
    loggedIn: false,
  };

  // if (redirect) {
  //   const testDomains = ['dev.mintgate.io', 'mintgate.io', 'localhost:3000'];
  //   const matches =
  //     !window.location.host.includes('app.') &&
  //     testDomains.find((x) => window.location.host.includes(x));
  //   // const gohome = matches ? `&gohome=${encodeURIComponent(matches)}` : '';
  //   console.warn('overmind logout: logged out and redirecting');

  //   if (!matches) window.location.href = '/login';
  //   else window.location.href = `//app.${matches}/login`;
  // }
}

export function removeWallet({ state, actions }: MGContext) {
  removeWallets();
  state.user.wallets = { ...getDefaultState().user.wallets };
}

export function finishedOnboard({ state, actions }: MGContext) {
  state.user.created = false;
}

export function setNetwork({ state, actions }: MGContext, network: number) {
  if (!network) return;
  network = Number.parseInt(network as any);
  if (network === -1) network = 1;

  state.network = network;
  storageSet('network', network?.toString());
  // storageSet('wallet_network', network.toString());

  console.log('setNetwork', network);
}
export async function logNotIn({ state, actions }: MGContext) {
  state.user.loggedIn = false;
}

export function updateUser({ state, actions }: MGContext, user: JSObject) {
  if (!user) return;
  // if (!user.uid && !state.user.uid) return; // no user yet // edit: allow contrib to be set if there isnt a logged in user yet

  const newUser = !!user.uid && state.user.uid !== user.uid;

  Object.entries(user).forEach(([k, v]) => {
    state.user[k] = v;
  });

  if (user.username) localStorage.setItem('username', user.username);
}

export function triggerWallet({ state }: MGContext, index?: number) {
  if (index && !state.walletTrigger) {
    state.walletTrigger = index;
    return;
  }
  state.walletTrigger = state.walletTrigger || 0;
  state.walletTrigger++;
  // console.log('trigger wallet', state.walletTrigger, json(state.user.walets));
}

export function restoreWallet({ state, actions }: MGContext) {
  // set the address if not already set, useful for UX tests
  const wallet = storageGet('wallet');
  if (!wallet) return;

  state.user.wallets.address = wallet;
  // set the network if not already set, useful for UX tests
  // if (!state.user.wallets.network)
  //   state.user.wallets.network = Number.parseInt(
  //     storageGet('wallet_network') || '1'
  //   );

  //   if (net > 0) state.user.wallets.network = net;
  // }

  let signature = storageGet('signature_' + wallet) || storageGet('signature');
  if (signature) {
    // if (
    //   storageGet('wallet_network') &&
    //   Number.parseInt(storageGet('wallet_network')) < 0
    // )
    //   return;

    // don't restore wallet if its different
    // if (
    //   state.user.wallets.address &&
    //   storageGet('wallet') !== state.user.wallets.address
    // ) {
    //   storageRemove('signature');
    //   return;
    // }
    // if (state.user.wallets.address) return; // already set

    state.user.wallets.signature_login = signature;
    state.user.wallets.signature_login_ver = storageGet('signature_ver') || '0';

    // state.user.wallets.address = storageGet('wallet'); // always wait on wallet
    state.user.wallets.noWallet = false;
  } else {
    // no saved or past selected wallet
    // if (!storageGet('selectedWallet'))
    state.user.wallets.noWallet = true;
  }
}

export function updateWalletSig(
  { state, actions }: MGContext,
  { signature, ver, network, address, provider }
) {
  if (!signature || !address) return;

  // only save EVM wallets
  if (Number.parseInt(network) > 0) {
    storageSet('wallet_network', network);
    storageSet('wallet', address);
    storageSet('signature', signature);
    storageSet('signature_' + address, signature);
    storageSet('signature_ver', ver);
  }

  state.user.wallets.signature_login = signature;
  state.user.wallets.signature_login_ver = ver?.toString() || '0';
  state.user.wallets.network = network;
  state.user.wallets.address = address;

  state.user.jwt = null;
  state.user.jwtapi = null;
  state.user.uid = null;
  state.user.loggedIn = false;

  state.user.wallets.noWallet = false;
  if (provider) state.user.wallets.provider = provider;

  // console.log('state.user.wallets', state.user.wallets);
}

export function setWertUrl({ state }: MGContext, url: string) {
  console.log('setWertUrl', url);
  state.wertUrl = url;
}

export function updateWallet(
  { state, actions }: MGContext,
  {
    account,
    network,
    provider,
  }: { account?: string; network: number; provider?: any }
) {
  // Check for invalid account value
  account = account?.toString() || null; // .toLowerCase()
  network = Number.parseInt(network as any);
  // console.log('account', account);
  let goHome: boolean = false,
    reload: boolean = false;

  if (
    network &&
    state.network &&
    state.user.wallets.network &&
    state.network !== network
  ) {
    console.log('state.network !== network', state.network, network);
    goHome = true;
  }

  if (network) {
    state.user.wallets.network = network;
    storageSet('wallet_network', network.toString());
    storageSet('network', network?.toString());
  }
  // if (!account || !provider || !network) return;

  // const newWalletDIffersFromCache =
  //   storageGet('wallet') && storageGet('wallet') !== account;

  // const newWalletDIffers =
  //   state.user.wallets.address && state.user.wallets.address !== account;

  // if (newWalletDIffersFromCache || newWalletDIffers) {
  //   console.warn(
  //     'wallet changed, actions.logOut',
  //     newWalletDIffersFromCache,
  //     newWalletDIffers,
  //     storageGet('wallet')
  //   );
  //   actions.logOut({ force: false });
  //   state.user.wallets.signature_login = null;
  //   state.user.wallets.changed = true;
  //   storageRemove('signature');
  //   // console.log('updateWallet', account);
  //   // window.location.reload();
  // }

  // console.log(
  //   'state.user.wallets.address',
  //   state.user.wallets.address,
  //   account
  // );
  const isNew =
    !!account &&
    !!state.user.wallets.address &&
    state.user.wallets.address !== account;

  // console.log('isNew', isNew);

  if (isNew) {
    storageSet('wallet', account);
    storageRemove('signature');
    storageRemove('jwt');
    storageRemove('jwtapi');
    state.user.wallets.signature_login =
      storageGet('signature_' + account) || null;

    state.user.jwt = null;
    state.user.jwtapi = null;
  }

  if (goHome) window.location.href = '/';
  else if (isNew) window.location.reload();
  else {
    if (account) state.user.wallets.address = account;
    if (provider) state.user.wallets.provider = provider;

    state.user.wallets.noWallet =
      !state.user.wallets.address || !state.user.wallets.signature_login;
  }
}

export function updateStep({ state }: MGContext, step: number) {
  state.currentStep = step;
}

// export function updateUsername({ state }:MGContext, username: string) {
//   state.user.username = username;
// }
