import { IContext } from 'overmind';
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from 'overmind-react';
import { getChainByChainId } from '@mintgate/evm-chains';
import { logIn } from './actions/logIn';
import * as Actions from './actions/actions';

// type JSObject = { [key: string]: any };

let domain = 'app.mintgate.io';
if (typeof window !== 'undefined') {
  domain = window.location.hostname;
}

export const useAppState = createStateHook<MGContext>();
export const useActions = createActionsHook<MGContext>();
export const useEffects = createEffectsHook<MGContext>();
export const useReaction = createReactionHook<MGContext>();

export function useOvermind() {
  const actions = useActions();
  const state = useAppState();
  return { state, actions };
}

export type UserState = {
  creator: boolean | null; // null here means in an undetermined state currently
  contributor: boolean | null;
  loggedIn: boolean | null;
  hasNeverLoggedIn: boolean | null;
  isAuthenticated: boolean | null;
  uid: string | null;
  jwt: string | null;
  jwtapi: string;
  username: string;
  photo: string;
  created: boolean | null;
  wallets: {
    address: string | null;
    network: number | null;
    signature_login: string;
    signature_login_ver: string;
    provider: any;
    noWallet: boolean;
    changed: boolean;
  };
};

export type State = {
  hideNav: boolean;
  application: {
    walletConnectModal: boolean;
    redirectTo: any;
  };
  currentStep: number;
  player_lid: null | string;
  wertUrl: string | null;
  network: number;
  theme: any;
  // whitelabel: {
  //   hasRewards: boolean;
  //   mintgate: boolean; // if mintgate.io
  //   brand: { [key: string]: any };
  //   [key: string]: any;
  // };
  lightMode: boolean;
  user: UserState;
  walletTrigger: number;
};

export function getDefaultState(): State {
  return {
    hideNav: false,
    application: {
      walletConnectModal: false,
      redirectTo: null,
    },
    currentStep: 1,
    player_lid: null,
    wertUrl: null,
    network: null, // MUST BE SET FOR APP LOGIN
    theme: null,
    // whitelabel: null, // { brand: { brandname: 'test site', id: 1, permissions: 2 }, username: 'LuisEgeaWin', photo: 'https://pbs.twimg.com/profile_images/1423399202869202952/_H_Dkuk9_400x400.jpg', wallet: '0xa8C548C5e0aF7051B012566ba2215C0292D26920', settings: { royalty: '2500' } },
    // assumes a whitelabel cap of 25%, allowing a cap of 22% for whitelabel users + 3% for MG to equal max 50%; user object of the whitelabel context OR null
    lightMode: false,
    /// privateMode: derived((state) => state.whitelabel?.brand?.permissions > 1),
    user: {
      creator: null, // null | bool
      contributor: null, // null | bool
      loggedIn: null,
      hasNeverLoggedIn: null,
      isAuthenticated: false,
      uid: null,
      jwt: null,
      jwtapi: null,
      username: '',
      // admin: false,
      photo: null,
      created: null,
      wallets: {
        address: null,
        network: null,
        signature_login: null,
        signature_login_ver: null,
        provider: null,
        noWallet: null,
        changed: false,
      },
    },
    // network: "homestead", // "mainnet",
    walletTrigger: 0,
  };
}

var DEFAULT_ACTIONS = {
  ...Actions,
  logIn,
};

export const config = {
  state: getDefaultState(),
  actions: DEFAULT_ACTIONS,
};

export type MGContext = IContext<typeof config>;

export const getNetworkDisplay = (val) => {
  if (!val) return 'none';
  val = val && val.toString();
  if (val === '1') return 'Ethereum';
  else if (val === '2') return 'Molochv2 DAO Shares';
  else if (val === '100') return 'xDai';
  else if (val === '122') return 'Fuse';
  else if (val === '137') return 'Polygon';
  else if (val === '80001') return 'Mumbai';
  else if (val === '3') return 'Ropsten';
  else if (val === '4') return 'Rinkeby';
  else if (val === '5') return 'Goerli';
  else if (val === '42') return 'Kovan';
  else if (val === '-1') return 'Native Token';
  else {
    try {
      return getChainByChainId(Number.parseInt(val)).shortName;
    } catch (e) {
      return 'Native Token';
    }
  }
};

// Updates creator, contributor, and loggedIn status
export function updatePermissions(state: typeof config.state) {
  const user = state.user;

  const updateUser = (
    creator: boolean = false,
    contributor: boolean = false
  ) => {
    state.user.creator = creator;
    state.user.contributor = contributor;
  };

  // whitelabel not set yet or no user
  if (!user.uid) {
    return updateUser(null, null);
  }

  return updateUser(false, true);
}
