import Cookies, { CookieAttributes } from 'js-cookie';

let domain = 'mintgate.io';
if (typeof window !== 'undefined') {
  domain = window.location.hostname;
}

const _window = typeof window !== 'undefined' ? window : null;
const isLocal = _window && _window.location.protocol === 'http:';

export const COOKIE_OPTIONS: CookieAttributes = {
  // domain: domain, // '.' +
  expires: 7,
  path: '/',
  sameSite: isLocal ? ('Lax' as 'Lax') : ('None' as 'None'),
  secure: !isLocal,
};

// const sessionKeys = ['jwt', 'username', 'jwtapi', 'selectedWallet', 'uid'];
// export function storageGetCookie(key) {
//   return Cookies.get(key);
// }

export function storageGet(key: string): string {
  // if (sessionKeys.includes(key))
  return Cookies.get(key); // || localStorage.getItem(key);

  // return localStorage.getItem(key);
}
export function storageSet(key: string, val: string | object) {
  // if (sessionKeys.includes(key)) {
  Cookies.set(key, val, COOKIE_OPTIONS);
  //   return;
  // }
  // localStorage.setItem(key, val);
}
export function storageRemove(key: string): void {
  // console.log('storageRemove COOKIE_OPTIONS', key, COOKIE_OPTIONS);
  Cookies.remove(key, COOKIE_OPTIONS);
  Cookies.remove(key, { ...COOKIE_OPTIONS, domain: '.' + domain });
  localStorage.removeItem(key);

  // removeAllCookiesByName(key);
}

export const removeAllCookies = () => {
  // try {
  //   document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
  //     location.hostname
  //       .split('.')
  //       .reverse()
  //       .reduce(
  //         (domain) => (
  //           (domain = domain.replace(/^\.?[^.]+/, '')),
  //           (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
  //           domain
  //         ),
  //         location.hostname
  //       )
  //   );
  // } catch (e) {
  //   console.log('removeAllCookies');
  // }
};

// export const removeAllCookiesByName = (cookieName) => {
//   const hostParts = location.hostname.split('.');
//   const domains = hostParts.reduce(
//     (acc, current, index) => [...acc, hostParts.slice(index).join('.')],
//     []
//   );
//   domains.forEach((domain) => Cookies.remove(cookieName, { domain }));
// };
