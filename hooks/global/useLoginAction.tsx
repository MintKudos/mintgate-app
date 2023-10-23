import { useEffect } from 'react';
import { useOvermind, MGContext } from 'stores/Overmind';
import { storageSet, storageGet, storageRemove } from 'stores/storage';
import { useRouter } from 'next/router';
import { AUTH_STATE_KEYS } from '__middleware';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function getCacheLogin(sp): {
  username: string;
  uid: string;
  jwt: string;
  jwtapi: string;
  created: boolean;
} {
  const ifGet = (k: string) => {
    return storageGet(k);
  };

  let username = sp.get('username') || ifGet('username') || null;
  let uid = sp.get('uid') || ifGet('uid') || null;
  let jwt = sp.get('jwt') || ifGet('jwt') || null;
  let jwtapi = sp.get('jwtapi') || ifGet('jwtapi') || null;
  let created = sp.get('created') === 'true' || false;

  return { username, uid, jwt, jwtapi, created };
}

export const useLogin = () => {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();

  // check if creator and no username, goto settings. Not needed in v4.
  useEffect(() => {
    // const user = ostate.user;
    // if (user.creator && user.username.startsWith('0x')) {
    //   if (router.pathname !== '/settings') router.push('/settings');
    // }
    const url = new URL(window.location.href);
    const qs = new URLSearchParams(url.search);

    const contains = qs.has(AUTH_STATE_KEYS[0]) || qs.has(AUTH_STATE_KEYS[1]);
    if (!contains) return;

    AUTH_STATE_KEYS.map((x) => qs.get(x) && storageSet(x, qs.get(x)));
    AUTH_STATE_KEYS.forEach((x) => url.searchParams.delete(x));
    window.location.replace(url.href);
  }, [ostate.user.creator, ostate.user.username]);

  useEffect(() => {
    if (ostate.user.wallets.address) return;
    actions.restoreWallet();

    if (!ostate.network) return;

    // const sp = new URLSearchParams(window.location.search);
    //
    loginCheck(actions);
  }, [ostate.network, ostate.user.wallets.address]);

  useEffect(() => {
    if (!ostate.network) return;
    // already have auth code to login, skip

    // ensure not already logged in
    if (ostate.user.loggedIn === true) return;
    // or unknown login state
    // if (ostate.user.loggedIn === null) return;

    // Must have wallet and sig
    if (!ostate.user.wallets.address) return;
    if (!ostate.user.wallets.signature_login) return;

    loginWalletService(
      ostate.network,
      ostate.user.wallets.signature_login,
      ostate.user.wallets.address
    ).then((r) => actions.logIn(r));
  }, [
    ostate.network,
    ostate.user.wallets.signature_login,
    ostate.user.loggedIn,
    ostate.user.wallets.address,
  ]);

  return null;
};

const NO_LOGIN_PAGES = ['/login', '/logout'];
function loginCheck(actions: MGContext['actions']) {
  const sp = new URLSearchParams(window.location.search);

  const dontRestoreCache = NO_LOGIN_PAGES.includes(window.location.pathname);

  const { username, uid, jwt, jwtapi, created } = dontRestoreCache
    ? ({} as any)
    : getCacheLogin(sp);

  if (!dontRestoreCache) return;

  // console.log('uid', uid, jwt);
  if (uid && jwt) {
    // causes hydration error
    // if (state)
    //   logIn({ state, actions }, { username, uid, jwt, jwtapi, created });
    actions.logIn({
      username,
      uid,
      jwt,
      jwtapi,
      created,
    });

    window?.gtag &&
      window.gtag('event', 'action_auto_login', {
        transport_type: 'beacon',
        userId: uid,
      });
  } else {
    actions.logNotIn();
  }
}

export function setAuthSearchParams(url: URL) {
  AUTH_STATE_KEYS.forEach(
    (k) => storageGet(k) && url.searchParams.set(k, storageGet(k))
  );
  return url;
}

async function loginWalletService(
  network: number,
  signature: string,
  account: string
) {
  const sp = new URLSearchParams(window.location.search);

  let returnTo = sp.get('callback') || localStorage.getItem('callback') || null;
  if (window.location.host.indexOf('app.') === 0)
    returnTo = window.location.origin + '/';

  const ver = '0';

  account = account.toLowerCase();

  const redirecturl = new URL(`${TPP}/login/wallet`);

  // set wallet connected
  let returnUrlWithWallet = new URL(returnTo || window.location.origin);

  setAuthSearchParams(returnUrlWithWallet);

  if (network) redirecturl.searchParams.set('network', network.toString());

  redirecturl.searchParams.set('callback', returnUrlWithWallet.href);
  redirecturl.searchParams.set('account', account);
  redirecturl.searchParams.set('signature', signature);
  redirecturl.searchParams.set('ver', ver);

  redirecturl.searchParams.set('api', 'true');
  if (storageGet('email'))
    redirecturl.searchParams.set('email', storageGet('email'));

  console.log('Wallet connected, redirecting...', redirecturl.toString());

  localStorage.removeItem('callback');

  function onFail() {
    console.log('onFail');
    storageRemove('wallet');
    storageRemove('signature');
    storageRemove('jwt');
    storageRemove('signature_' + account);
    storageRemove('selectedWallet');
  }
  // window.location.href = redirecturl.toString();
  try {
    var r = await fetch(redirecturl.toString()).then((res) => res.json());
  } catch (e) {
    console.error(e);
    onFail();
    // return;
    // some error
    // window.location.href = '/login';
    window.location.reload();
    return null;
  }
  if (r?.message || r?.error) {
    onFail();
    console.error(r);
    // window.location.href = '/login';
    window.location.reload();
    return null;
  }

  if (r.redirect) {
    // may not be needed with middleware

    storageSet('uid', r.uid);
    storageSet('username', r.username);
    storageSet('jwt', r.jwt);
    storageSet('jwtapi', r.jwtapi);

    // await sleep(20);
    // router.push(r.redirect);
    // console.log('r', r);

    let toUrl = r.redirect;

    if (window.location.pathname.includes('login')) window.location.href = '/';
    else {
      console.log('logged in');

      return {
        uid: r.uid?.toString(),
        username: r.username,
        jwt: r.jwt,
        jwtapi: r.jwtapi,
        created: !!r.created,
      };

      // window.location.reload();
    }
    // window.location.href = toUrl;
  } else {
    alert(`Error connecting to wallet: ${r}`);
  }
  return null;
}

let redirecting = false;
