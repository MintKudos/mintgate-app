import { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useRouter } from 'next/router';
import { useAsyncFn, useInterval } from 'react-use';
import QRCode from 'react-qr-code';
import { useSearchParam } from 'react-use';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function Ticket() {
  const [state, setState] = useState({
    url: null,
    mgsession: null,
    valid: null,
    linkInfo: null,
    message: null,
    checksPassed: null,
    wallet: null,
  });

  const { state: ostate, actions } = useOvermind();

  const isScanner = useSearchParam('scan');
  const mgsession = useSearchParam('mgsession');
  const id = useSearchParam('id');

  const [service, callService] = useAsyncFn(async () => {
    const session = mgsession; // || localStorage.getItem('mgsession');
    if (!session) return;
    // console.log('isScanner', isScanner, session);

    const accessURL = new URL(`${TPP}/api/v2/links/access/check`);
    accessURL.searchParams.set('mgsession', session);
    const r = await fetch(accessURL.href).then((x) => x.json());

    if (r?.status === 'fail') {
      alert('Your ticket QR Code has expired. Reloading...');
      if (id) window.location.href = `${TPP}/go/${id}`;
      console.log('failed fetch');
      setState((x) => ({ ...x, valid: false, message: r.message }));
      return;
    }

    const infoURL = new URL(`${TPP}/api/v2/links/linkid`);
    infoURL.searchParams.set('id', r?.linkid);
    const linkInfo = await fetch(infoURL.href).then((x) => x.json());

    setState((x) => ({
      ...x,
      linkInfo: linkInfo,
      valid: true,
      checksPassed: r?.checksPassed,
      wallet: r?.wallet,
    }));
    return true;
  }, [id]);

  useInterval(
    () => {
      callService();
    },
    isScanner ? null : 1000 * 60
  ); // recheck token every 1min

  console.log('isScanner', isScanner, mgsession);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('scan', '1');
    url.searchParams.set(
      'mgsession',
      mgsession || localStorage.getItem('mgsession')
    );
    setState((x) => ({ ...x, url: url.href }));

    callService();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('scan') === '1') return;
    let mgsession = url.searchParams.get('mgsession');
    const isScanner = url.searchParams.get('scan');
    if (isScanner === '1') {
      //return;
    }

    if (mgsession) localStorage.setItem('mgsession', mgsession);
    url.searchParams.delete('mgsession');

    mgsession = mgsession || localStorage.getItem('mgsession');

    setState((x) => ({ ...x, mgsession }));
    return;
  }, []);

  let body = <></>;

  if (!id) {
    body = id && (
      <>
        <h2>
          No ticket ID provided in URL. Please use the TPP link again and
          rescan.
        </h2>
      </>
    );
  } else if (isScanner && state?.valid === false) {
    body = (
      <>
        <div className="max-w-md mx-auto text-center mt-44">
          <h2 className=" font-semibold text-3xl">
            <a href={`${TPP}/go/${id}`}>
              Invalid ticket or link expired. Try again.
            </a>
          </h2>
          <br />
          <p className=" text-lg">
            Error: {state?.message ? state?.message : ''}
          </p>
        </div>
      </>
    );
  } else if (!isScanner && !state?.mgsession) {
    body = (
      <>
        <div className="max-w-md mx-auto text-center mt-44">
          <h2 className=" font-semibold text-3xl">
            <a href={`${TPP}/go/${id}`}>
              Please use the TPP link again and rescan.
            </a>
          </h2>
        </div>
      </>
    );
  } else if (isScanner && state?.valid === true) {
    body = (
      <>
        <div className="bg-base-100 p-6 rounded-xl shadow-mg max-w-md mx-auto text-primary-content">
          <img src="/check.gif" className="max-w-sm" />
          {state.linkInfo && (
            <div className="text-center pb-3">
              <h2 className=" font-semibold text-4xl">
                {' '}
                {state?.linkInfo?.title}
              </h2>
              <h2 className=" font-medium text-xl pt-1">
                {' '}
                {state?.linkInfo?.dname}{' '}
              </h2>
            </div>
          )}
          <div className="my-2">
            <h3 className=" font-medium text-lg">Validated you have token</h3>
            <p className=" text-sm">{state?.checksPassed?.[0]?.address}</p>
          </div>
          <div>
            <h3 className=" font-medium text-lg">from wallet</h3>
            <p className=" text-sm">{state?.wallet}</p>
          </div>
        </div>
      </>
    );
  } else if (isScanner && state?.valid === null) {
    body = (
      <div className="min-h-screen h-full pt-24 pb-40 mx-auto text-center w-full">
        <h2 className=" font-semibold text-4xl"> Loading... </h2>
      </div>
    );
  } else if (!isScanner && state?.url)
    body = (
      <>
        <div
          id="qrcode"
          className="relative bg-ticket2 bg-center bg-contain bg-no-repeat mx-auto text-center pt-6"
        >
          <QRCode
            level={'L'}
            value={state?.url}
            size={300}
            {...{ title: 'Ticket QR' }}
            bgColor="#0000000"
            fgColor="#FFFFFF"
            width="100%"
            className="my-2 mx-auto"
          />
        </div>
        <div className="relative mt-2 pb-40 bg-ticket bg-center bg-contain bg-no-repeat mx-auto">
          {state.linkInfo && (
            <div className="mx-auto w-72 px-4 pt-24">
              <h2 className="text-primary-content  font-semibold text-4xl">
                {state?.linkInfo?.title}
              </h2>
              <h2 className="text-primary-content  font-medium text-xl pt-4">
                {' '}
                @{state?.linkInfo?.dname}
              </h2>
              <h3 className="text-primary-content  font-medium text-md pt-4 break-words whitespace-pre-wrap">
                At least
                {state?.linkInfo?.tokens?.length > 1
                  ? state?.linkInfo?.tokens?.map((x) => (
                      <li>{x.minbal + ' ' + x.address}</li>
                    ))
                  : ' ' +
                    state?.linkInfo?.tokens?.map(
                      (x) => x.minbal + ' ' + x.address
                    )}{' '}
                to enter
              </h3>
            </div>
          )}
        </div>
      </>
    );

  return (
    <div className="w-full bg-base-100 min-h-screen h-full pt-8 pb-40 bg-cover">
      {body}
    </div>
  );
}
