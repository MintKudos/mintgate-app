import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

export default function middleware_old(
  req: NextRequest,
  event: NextFetchEvent
) {
  const { pathname, search } = req.nextUrl;
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  let hostname = req.headers.get('host');

  // If localhost, get the custom domain/subdomain value by removing localhost:3000
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  // let _currentHost = 'app';
  // process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
  //   ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_URL}`, '')
  //   : hostname.replace(`.localhost:3000`, '');

  // if no subdomain on localhost, assume app subdomain
  // if (
  //   process.env.NODE_ENV !== 'production' &&
  //   _currentHost === 'localhost:3000'
  // )
  //   _currentHost = 'app';

  let currentHost = 'app';

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page

  // Fixes some strange nextjs push redirect issue
  // if (pathname.startsWith(`/_sites/[site]`)) {
  //   // console.log('pathname', pathname);
  //   const fixedPath = pathname.replace(`/_sites/[site]`, '');
  //   const url = req.nextUrl.clone();
  //   url.pathname = fixedPath;
  //   // console.log('nextUrl', url.pathname, url);
  //   return NextResponse.redirect(url);
  // } else if (pathname.startsWith(`/_sites`)) {
  //   return new Response(null, { status: 404 });
  // }

  // migrate old token page to projects
  // if (pathname.startsWith(`/t/`)) {
  //   // console.log('pathname', pathname);
  //   const fixedPath = pathname.replace(`/t/`, `/projects/`).toLowerCase();
  //   const url = req.nextUrl.clone();
  //   url.pathname = fixedPath;
  //   // console.log('nextUrl', url.pathname, url);
  //   return NextResponse.redirect(url);
  // }

  // lowercase project names for old links
  if (
    pathname.startsWith(`/projects/`) &&
    pathname.toLowerCase() !== pathname
  ) {
    // console.log('pathname', pathname);
    const fixedPath = pathname.toLowerCase();
    const url = req.nextUrl.clone();
    url.pathname = fixedPath;
    // console.log('nextUrl', url.pathname, url);
    return NextResponse.redirect(url);
  }

  // if (pathname.startsWith(`/go/`)) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/wallet';
  //   // console.log('nextUrl', url.pathname, url);
  //   return NextResponse.rewrite(url);
  // }

  // fix old create page
  {
    /*
  if (
    pathname === `/create` ||
    pathname === `/create_link` ||
    pathname === `/create_token`
  ) {
    const url = req.nextUrl.clone();
    url.pathname = '/new_project';
    return NextResponse.redirect(url);
  }
  */
  }
  if (
    // !pathname.startsWith('/admin') &&
    !pathname.includes('.') && // exclude all files in the public folder
    !pathname.startsWith('/api') // exclude all API routes
  ) {
    // is this subdomain or custom domain?
    const loginRes = loginCheck(req);
    if (loginRes) return loginRes;
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/_sites/[site]/index.tsx
    const url = req.nextUrl.clone();
    const res = NextResponse.rewrite(url);

    // Clear cooks on login page load
    clearLogin(res, pathname);
    return res;
  } else {
    return NextResponse.next();
  }
}

export const AUTH_STATE_KEYS = [
  'jwt',
  'username',
  'uid',
  'jwtapi',
  'signature',
  'wallet',
  'email',
  'selectedWallet',
  'signature_ver',
  'wallet_network',
  'bust', // special cookie to bust cache
];

function clearLogin(res, pathname) {
  if (pathname.includes('/login') || pathname.includes('/logout')) {
    AUTH_STATE_KEYS.map((x) => res.cookies.delete(x));
    return true;
  }
  return false;
}

function loginCheck(req: NextRequest) {
  const domain = req.headers.get('host');

  const qs = new URLSearchParams(req.nextUrl.search);
  if (!qs.get('jwt')) return null;

  let url = req.nextUrl.clone();
  // console.log('url', currentHost, req.nextUrl.search, url.pathname);

  if (qs.get('created') === 'true') url.pathname = `/settings`;

  AUTH_STATE_KEYS.forEach((x) => url.searchParams.delete(x));
  console.log('url', url.href);
  const res = NextResponse.redirect(url);

  // console.log('cookieSettings', cookieSettings);
  AUTH_STATE_KEYS.map(
    (x) =>
      qs.get(x) &&
      res.cookies.set(x, qs.get(x), getCookieSettings(url, domain, x))
  );

  let hostname = req.headers.get('host') || req.url;
  // console.log('hostname', hostname);

  // if (
  //   hostname.indexOf('mintgate-') > -1 &&
  //   hostname.indexOf('vercel.app') > -1 &&
  //   qs.get('username')
  // ) {
  //   // local dev
  //   res.cookies.set(
  //     'whitelabel',
  //     qs.get('username')?.toLowerCase(),
  //     getCookieSettings(url, domain, 'whitelabel')
  //   );
  // }

  return res;
}

const BUST_SECONDS = 90;

function getCookieSettings(
  url: NextURL,
  currentHost: string,
  cookieKey: string
) {
  currentHost = null;
  const local = url.protocol === 'http:';

  let age = 60 * 60 * 24 * 7; // seconds // 1000 *
  if (cookieKey === 'bust') age = BUST_SECONDS;
  // console.log('ur', url.protocol, local);
  const s: any = {
    path: '/',
    // domain: '.' + currentHost,
    // domain: '.' + domain, // DO NOT USE
    maxAge: age,
    sameSite: local ? 'lax' : 'None',
    httpOnly: false,
    secure: !local,
  };
  return s;
}
