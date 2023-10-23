import React, { useEffect, useState } from 'react';
import LayoutUser from './Layout';
import { useOvermind } from 'stores/Overmind';
import dynamic from 'next/dynamic';
import SiteMeta from './SiteMeta';
import useSetNetwork from 'hooks/global/useSetNetwork';
import { ViewModal } from 'pages/view';
import { useRouter } from 'next/router';
import { useLogin } from 'hooks/global/useLoginAction';
import CustomTheme from 'components/general/CustomTheme';
import {
  useRequireSigning,
  SignModal,
} from 'components/utility/withWalletSigning';

const WalletMemo = dynamic(
  () => import('components/utility/withWalletConnect'),
  { ssr: false, suspense: false }
);

export default React.memo(_LayoutBase);
function _LayoutBase({ children, ...props }: any) {
  const { state: ostate, actions } = useOvermind();
  const [contractAddress, setAddr] = useState<string>(null);

  const router = useRouter();
  const url = props.url;

  // Set affiliate tag
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    if (qs.has('aff') && window.sessionStorage)
      window.sessionStorage.setItem('aff', qs.get('aff'));
  }, []);

  useLogin();
  useSetNetwork();

  // const pageNeedsLogin = url.includes('/admin'); //  || url.includes('/settings')
  // const notLoggedInOnAdmin = pageNeedsLogin && ostate.user.loggedIn === false;

  let Page;
  // if (notLoggedInOnAdmin) {
  //   Page = <LayoutUser {...props}>Redirecting to /login page...</LayoutUser>;
  // }

  // Backwords compatibility for player id
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('v');
    // only set overlay if not already on /view
    if (v && !router.pathname?.includes('/view')) actions.setPlayer(v);
  }, []);

  useEffect(() => {
    // if(!router.isReady) return;
    // console.log('router', router);
    const l = router.asPath.split('/');
    setAddr(l[l.length - 1]);
    //console.log('router.isReady', router.isReady, router);
  }, [router]);

  const getContractMetadataKey = Object.keys(props?.fallback || {}).find((x) =>
    x.includes('getContractMetadata')
  );
  const getProfileInfo = props?.fallback?.[getContractMetadataKey];

  return (
    <>
      <CustomTheme globalstate={true}>
        <SiteMeta userInfo={contractAddress} getProfileInfo={getProfileInfo} />

        <WalletMemo />

        {ostate.player_lid && <ViewModal lid={ostate.player_lid as string} />}
        <LayoutUser {...props}>{children}</LayoutUser>
      </CustomTheme>
      <SignModal />
    </>
  );
}
