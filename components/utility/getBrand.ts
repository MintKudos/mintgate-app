import { storageGet } from 'stores/storage';

const FORCE_WHITELABEL = process.env.NEXT_PUBLIC_WHITELABEL; // 'jeoi.tkngate.com' ||  'test.tkngate.com' ||  'tachyon.tkngate.com' ||  example: 'www.hobbycartelnft.com'
const FORCE_PERMISSION_CONTRIB = null;
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function getOverride(): string {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    var w = new URLSearchParams(window.location.search).get('whitelabel');
    if (!w) w = localStorage.getItem('whitelabel') || storageGet('whitelabel');
    if (w) localStorage.setItem('whitelabel', w);
  }
  const override = w || null;

  return override || FORCE_WHITELABEL || null;
}

// export function getRootProfile(host) {
//   if (!host) return null;
//   // if (!host.includes(".")) return host; // already username

//   if (host.includes('.mintgate.io') && /^(app|www)/i.test(host) === false)
//     return host.split('.')[0];

//   if (process.env.NODE_ENV !== 'production' && host.includes('.localhost'))
//     return host.split('.')[0];

//   return null;
// }

export function isBrand(host) {
  if (getOverride()) return true;

  if (!host || host === 'app') return false;
  if (host === 'app.mintgate.io') return false;
  if (process.env.NODE_ENV !== 'production') {
    // if (host.includes(".localhost")) return true;
    if (host.includes('app.localhost')) return false;
    if (host === 'localhost:3000' || host === 'localhost') return false;
  }
  return true;
}

export function getBrandURL(host: string): URL {
  if (!host) return null;
  // if (typeof window !== 'undefined') host = host || window.location.host;

  if (!isBrand(host)) return null;
  let url = new URL(`${TPP}/api/v2/brand/bydomain`); // users/
  let username = getOverride() || host; // getRootProfile(host) ||

  if (!username) return null;

  // ex: mintgate.mintclub.app = use mintclub as username
  // or ex: mintclub.mintgate.app => mintclub.app [0] = mintclub
  username = username.toLowerCase();
  url.searchParams.set('domain', username);

  return url;
}

export async function getBrand(host) {
  // ensure user is updated and whitelabel already fetched
  // ignore localhost and mintgate.io... only trigger for xxx.yyy.com (len 2)
  const urlStr = getBrandURL(host)?.href;
  if (!urlStr) return null;

  const response = await fetch(urlStr, {
    method: 'GET',
  })
    .then((x) => x.json())
    .catch((err) => {
      return null;
    });
  const data = response; // await response.json();
  if (!data) return null;

  if (data.brand && !data.brand?.brandname)
    data.brand.brandname = data.username;
  // data.host = host;
  data.origin = `https://${host}`;
  // cache[username] = data;
  // cacheSet(username, data);
  data.url = urlStr;

  return data;
}

// let cache = {};
// function cacheSet<T>(domain: string, data: T): T {
//   cache[domain] = data;
//   return data;
// }

// function cacheget(domain) {
//   const isBrowser = typeof window !== 'undefined';
//   // only cache in browser
//   if (isBrowser && cache[domain]) return cache[domain];

//   // const isBrowser = typeof window !== "undefined";
//   // if(isBrowser) {
//   //   if(localStorage.getItem(domain)) return JSON.parse(localStorage.getItem(domain));
//   // }
//   return null;
// }
