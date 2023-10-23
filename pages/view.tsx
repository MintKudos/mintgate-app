import React, { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { storageGet } from 'stores/storage';
import { useAsync, useSearchParam } from 'react-use';
import TPPVideoPlayer from 'components/Content/players/VideoPlayer';
import TPPFrame from 'components/Content/players/Frame';
import { useRouter } from 'next/dist/client/router';
import { useLinkInfo } from 'hooks/getLinkInfo';
import { callTPP } from 'components/Content/players/callTPP';
import ReleaseOverlay from 'components/Links/ReleaseOverlay';
import Button from 'mintflow/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import LoadingAnimationCircle from 'components/utility/LoadingAnimationCircle';
import ALink from 'components/ALink';

export default function View({ ...props }) {
  return (
    <div className="mt-16">
      <ViewPlayer
        embedded={props?.embedded || false}
        lid={props?.lid || null}
      />
    </div>
  );
}

export const ViewModal = React.memo(({ lid }: any) => {
  const router = useRouter();
  const { state: ostate, actions } = useOvermind();

  function onClickClose(e) {
    if (!lid) return;
    e.preventDefault();
    actions.setPlayer(null);
  }

  return (
    <div
      onClick={onClickClose}
      className="fixed z-40 inset-0 overflow-y-auto w-screen h-screen flex justify-center bg-black-50"
    >
      <ALink
        href={'/projects/' + router.query.id}
        onClick={onClickClose}
        title="close"
        className="absolute top-2 right-6 z-50"
      >
        <div className="flex content-around items-center gap-2">
          Close
          <Button
            variant="primary"
            circle
            className="bg-neutral border-neutral"
            endIcon={<XMarkIcon className="w-6 h-6 text-neutral-content" />}
          ></Button>
        </div>
      </ALink>
      <div
        className="fixed inset-0 bg-base-200 cursor-pointer"
        onClick={onClickClose}
      />
      <div className="fixed h-screen mt-14 mx-auto">
        <ViewPlayer lid={lid} embedded={false} />
      </div>
    </div>
  );
});

function ViewPlayer({ embedded, lid }) {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();

  useEffect(() => {
    if (!storageGet('wallet')) actions.triggerWallet(1); // trigger on load
  }, []);

  const [contentUrl, setContentUrl] = useState('');
  const [contentType, setContentType] = useState('');

  const _vParam = useSearchParam('v');
  const vParam = lid || _vParam;
  const [linkInfoObj] = useLinkInfo(vParam);
  const linkInfo = linkInfoObj?.value;
  const [timerCompleted, setTimerCompleted] = useState<boolean>();

  const loadTPP = useAsync(
    async () => {
      if (ostate.user.loggedIn === null) return null;
      if (!vParam) return null;
      if (contentUrl) return null;

      if (!timerCompleted) return;

      // if (!ostate.user.wallets.provider) return;

      const address = ostate.user.wallets.address;
      const sig = ostate.user.wallets.signature_login;

      const sp = new URLSearchParams(window.location.search);
      let mgsession =
        sp.get('mgsession') || localStorage.getItem('mgsession2') || null;

      if (!mgsession && !sig && !ostate.user.jwt) return null; // If no mgsession, no wallet sig, or no JWT to check owner = then return

      // console.log('0');

      if (!mgsession) {
        if (address && !sig && ostate.user.wallets.provider) {
          return null;
        }
      }
      // else if (sp.get('mgsession')) {
      //   localStorage.setItem('mgsession2', mgsession);
      // }

      const isCreator = !!ostate.user.creator;

      try {
        let response = await callTPP(
          vParam,
          sig,
          address,
          isCreator ? ostate.user.jwt : null,
          null, // mgsession,
          ostate.user.wallets.signature_login_ver
        );

        if (!response) {
          console.warn('Could not validate wallet!');
          // alert('Could not validate wallet!');
          return null;
        }
        if (response === -1) {
          return; // not enough, self redirecting
        }
        if (response === -2 || typeof response === 'number') {
          alert('An unkown error occurred. Sorry!');
          return; // no response
        }

        response.type = response.type || 'vid';

        // console.log('response', response);
        const vurl = response.vurl;
        if (!vurl) {
          alert('Could not retrieve URL.');
          return null;
        }

        const _url = new URL(vurl);
        _url.searchParams.set('mgsession', response.mgsession || mgsession);
        _url.searchParams.set('cb', Math.random().toString());
        setContentUrl(_url.href); // TPP + '/ipfsvid/' + v); // vurl);
        setContentType(response.type);

        window.gtag &&
          window.gtag('event', 'view_media', {
            transport_type: 'beacon',
            userId: ostate.user.uid,
          });

        if (response.type === 'redirect') {
          const isMintGate = _url.href.includes('mintgate.io/');

          const c =
            isMintGate ||
            confirm(
              `This is a redirect link. Do you want to follow it? 
${_url.hostname.slice(0, 24)}...`
            );

          if (c && _url.searchParams.has('utm_source')) {
            _url.searchParams.set('utm_source', window.location.host);
          }
          if (c) window.open(_url.href, '_blank');

          actions.setPlayer(null); // close player
        }

        // setLoading(true); // WIP-JD
        // console.log('TPP response', response);
        return true;
      } catch (e) {
        //setLoading(false);
        console.error(e);
        alert(e);
        return true;
      } finally {
        //setLoading(false);
      }
    },
    // 1500,
    [
      ostate.user.wallets,
      ostate.user.jwt,
      ostate.user.loggedIn,
      vParam,
      ostate.user.wallets.provider,
      ostate.user.wallets.signature_login,
      timerCompleted,
    ]
  );

  function onError() {
    // localStorage.removeItem('mgsession2');
    // window.location.reload();
  }

  // console.log('ostate.user.wallets', ostate.user.wallets.provider, ostate.user.wallets.signature_login)

  // const profileUrl = useProfilePath(linkInfo?.username);

  if (!vParam) return <h1>No link ID provided</h1>;

  // if (contentUrl) console.log('linkInfo', contentUrl, /(vid|aud)/.test(contentType))
  let connectWalletMessage;
  if (loadTPP.loading || !contentUrl) {
    connectWalletMessage = <LoadingDiv />;
  } else if (!contentUrl) {
    //  && !ostate.user.wallets.signature_login
    connectWalletMessage = (
      <div className="w-full text-center p-12 py-36 bg-base-200">
        <button
          onClick={() => actions.triggerWallet()}
          className="btn mx-auto btn-gradient-two buttontext tracking-wide"
        >
          Connect Wallet to View
        </button>
      </div>
    );
  }

  if (!linkInfo) return <LoadingAnimationCircle />;

  if (!timerCompleted)
    return (
      <ReleaseOverlay
        linkInfo={linkInfo}
        onTimeComplete={setTimerCompleted}
        timeComplete={timerCompleted}
      ></ReleaseOverlay>
    );

  return (
    <div className="h-full mx-auto">
      {/*  Page content */}
      {connectWalletMessage}

      {!connectWalletMessage && (
        <div className="w-auto h-full">
          <Player
            onError={onError}
            contentUrl={contentUrl}
            contentType={contentType}
            v={vParam}
            linkInfo={linkInfo}
          />
        </div>
      )}
    </div>
  );
}

function Player({ contentUrl, contentType, v, linkInfo, onError }) {
  if (!v || !contentUrl || !contentType) return null;
  //console.log('Player', contentUrl, contentType, v, linkInfo, isWhiteLabel);
  // console.log('linkInfo', linkInfo);
  // onError={onError}

  if (/(vid|aud)/.test(contentType))
    return (
      <div className="shadow-elevationHigh">
        <TPPVideoPlayer
          id={v}
          media={linkInfo?.media}
          poster={linkInfo?.img}
          vidUrl={contentUrl}
        />
      </div>
    );
  if (contentType === 'frame' || contentType === 'lnk')
    return <TPPFrame id={v} media={linkInfo?.media} url={contentUrl} />;

  if (contentType === 'pdf' || linkInfo?.media === 'ebk')
    return (
      <iframe
        className="w-full h-screen mt-16 mb-1"
        src={contentUrl + `#toolbar=0`}
        title={linkInfo?.title}
      ></iframe>
    );

  return null;
}

function LoadingDiv() {
  return (
    <div className="w-full flex justify-center items-center text-center p-12 py-36 bg-base-200 font-bold text-base-content">
      <LoadingAnimationCircle />
    </div>
  );
}
