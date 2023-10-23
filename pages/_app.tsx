import { memo, useEffect, useMemo, useState } from 'react';
import '../assets/main.css';
import '../assets/override.css';
import { Provider } from 'overmind-react';
import { config } from 'stores/Overmind';
import 'animate.css';
import { createOvermind, createOvermindSSR } from 'overmind';
import LayoutBase from 'components/general/LayoutBase';
// Component to only load on frontend
import { SWRConfig } from 'swr';
import Cookies from 'js-cookie';
import Script from 'next/script';
import { Router } from 'next/router';
// import LoadingOverlay from 'components/utility/LoadingOverlay';
// import "../assets/player.css";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;
(function GA() {
  if (typeof window === 'undefined') return;

  // GA
  window['dataLayer'] = window['dataLayer'] || [];
  function gtag(...args) {
    window['dataLayer'].push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-37514942YF');
  window['gtag'] = gtag;

  // Need to always cache bush
  // Patch Fetch to bust cache
  fetchPatch();
})();

function MyApp(props) {
  let { Component, router, pageProps } = props;

  if (pageProps.error) {
    console.warn('ssr error', pageProps.error);
  }

  // console.log('pageProps', pageProps);
  let url = router.pathname;
  url = url?.replace('/_sites/[site]', '') || '/';

  const overmind = useMemo(() => getOvermind(pageProps), []);
  const swrProps = useMemo(
    () => makeSWRProps(pageProps.fallback),
    [pageProps?.fallback]
  );
  // if (router.isFallback) {
  //   return (
  //     <div className="mx-auto">
  //       <LoadingAnimationCircle />
  //     </div>
  //   );
  // }
  useGtag(router);

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-37514942YF"
          strategy="afterInteractive"
        />
      )}
      <Script
        src="https://unpkg.com/share-api-polyfill@1.0.21/dist/share-min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
        strategy="beforeInteractive"
      />
      <SWRConfig value={swrProps}>
        <Provider value={overmind}>
          <LayoutBase url={url} {...pageProps}>
            <Component {...pageProps} />
          </LayoutBase>
        </Provider>
      </SWRConfig>
    </>
  );
}

function useGtag(router: Router) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV !== 'production') return;
      window.gtag('config', 'G-37514942YF', {
        page_path: url,
      });
    };
    //When the component is mounted, subscribe to router changes and log
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
}

function getOvermind(pageProps) {
  const inBrowser = typeof window !== 'undefined';
  if (inBrowser) {
    let overmind = createOvermind(config, {
      devtools: process.env.NODE_ENV !== 'production',
      logProxies: true,
      hotReloading: true,
    });
    // loginCheck(overmind.actions, config.state); // causes hydration error

    return overmind;
  } else {
    return createOvermindSSR(config);
  }
}

function makeSWRProps(fallback: object) {
  const SWROptions = {
    fallback: fallback || {},
    revalidateOnMount: true,
    revalidateOnFocus: false,
    fetcher: FETCHER,
  };

  // console.log('SWROptions', SWROptions);
  return SWROptions;
}

export const FETCHER = (resource, init?: any) => {
  if (resource?.href) resource = resource.href;

  if (resource?.startsWith('/api')) resource = `${TPP}${resource}`;

  return fetch(resource, init)
    .then((res) => res.json())
    .then((x) => {
      if (x?.status === 'fail' && x?.message?.toLowerCase().includes('jwt')) {
        window.location.href = '/login';
      }
      return x;
    });
};

export default MyApp;

// const fetchURLRefresh = {};

function fetchPatch() {
  const { fetch: ofetch } = window;
  window.fetch = (_url: any, options) => {
    let url: string = _url?.toString();

    if (url?.startsWith(TPP)) {
      //  || url?.indexOf('jwt=') !== -1
      if (options?.method === 'POST') {
        bust();
        url = url.replace('https://cf.mgate.io', 'https://raw.mgate.io'); // bypass cache for POST requests
      } else if (!options || options.method === 'GET') {
        const u = new URL(url);

        if (typeof window === 'undefined') {
          // always bust cache on server
          // url?.indexOf('cb=1') !== -1
          // always bust
          u.searchParams.set('bust', Date.now().toString());
        } else if (Cookies.get('bust')) {
          u.searchParams.set('bust', Cookies.get('bust'));
        }
        url = u.href;
      }
    }

    // for testing only // url = url.replace('jwt=', 'jwt=111');

    return ofetch(url, options).catch((e) => {
      console.error('fetch error:' + url + ' error:', e);
      throw e;
    });
  };
}

const BUST_SECONDS = 90;
function bust() {
  if (!!Cookies.get('bust')) return;
  var EXPIRE_DATE = new Date(new Date().getTime() + BUST_SECONDS * 1000);
  Cookies.set('bust', Date.now().toString(), { expires: EXPIRE_DATE });
}
