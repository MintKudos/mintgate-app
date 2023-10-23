import { useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useRouter } from 'next/router';
import { storageGet } from 'stores/storage';

const DEFAULT_NET = 1;
export default function useSetNetwork() {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();

  useEffect(() => {
    // if (!router.isReady || ostate.network) return;

    // console.log('window.location.pathname', window.location.pathname);

    // Dont force network on /go/ link landing page if network is missing, will be set later
    // NOTE: wallet pages will set their own network
    // console.log('router.pathname', router.pathname);
    // if (
    //   !urlNetwork &&
    //   (router.pathname.includes('/go/[') || router.pathname.includes('/wallet'))
    // )
    //   return;

    if (window.location.pathname.startsWith('/feed')) {
      const l = router.asPath.split('/');
      const network = l[2] || '1';
      if (Number.parseInt(network)) {
        actions.setNetwork(Number.parseInt(network));
        return;
      }
    }

    // not on a page with a chain in the url

    let net =
      // Number.parseInt(storageGet('network')) ||
      Number.parseInt(storageGet('wallet_network')) || 1;

    const urlNetwork = new URLSearchParams(window.location.search).get(
      'network'
    );
    if (urlNetwork) net = Number.parseInt(urlNetwork);

    if (net !== 1 && net !== 137) net = 1;
    actions.setNetwork(net); // set default
  }, []);

  // always chec
  //   useEffect(() => {
  //     if (!router.isReady) return;

  //     if (window.location.pathname.startsWith('/feed')) {

  //     }
  //   }, [router.isReady]);
}
