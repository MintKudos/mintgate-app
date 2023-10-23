import { FETCHER } from 'pages/_app';
import { MGContext, updatePermissions } from '../Overmind';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

interface LoginPayload {
  uid: string;
  username: string;
  jwt: string;
  jwtapi: string;
  created: boolean;
}

export async function logIn(
  { state, actions }: MGContext,
  { uid, username, jwt, jwtapi, created }: LoginPayload
) {
  // Fetch user profile from server
  /// const newUser = uid && state.user.uid !== uid;
  state.user.uid = uid?.toString();
  state.user.username = username;
  state.user.created = created;
  state.user.hasNeverLoggedIn = false;
  state.user.jwt = jwt;
  state.user.jwtapi = jwtapi;

  if (jwt && uid) state.user.loggedIn = true;
  else state.user.loggedIn = false;

  // Re-apply whitelabel
  // if (newUser && state.whitelabel) actions.setWhitelabel(state.whitelabel);

  updatePermissions(state);
}

// export async function loginInInfo({ state, actions }: MGContext) {
//   let uid = state.user.uid;
//   if (!uid) return;
//   const url = new URL(`${TPP}/api/v2/users/info`);
//   url.searchParams.set('uid', uid);
//   try {
//     const user = await FETCHER(url.href);
//     if (user?.result) {
//       state.user.photo = user?.result?.photo || '';
//       state.user.username = user?.result?.username;
//     }
//   } catch (e) {
//     console.log('error getting user info', e);
//     // do not log out, may error during redirects
//     return;
//   }
// }
