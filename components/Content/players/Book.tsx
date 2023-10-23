import React, { useState, useEffect, useRef } from 'react';
// import { useOvermind } from 'stores/Overmind';
import { useInterval, useWindowSize } from 'react-use';
// import { useRouter } from 'next/dist/client/router';
// import Head from 'next/head';
import Script from 'next/script';

export const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

const ADOBE_CLIENT_API =
  process.env.NEXT_PUBLIC_ADOBE_CLIENT_API ||
  'c5c55d7cdac148caafd01a2556a273ed'; // '7352e428df37418e9c784dd998b49554';

const previewConfig = {
  showDownloadPDF: false,
  showPrintPDF: false,
  showPageControls: true,
  showAnnotationTools: false,
  embedMode: 'IN_LINE',
};

export default React.memo(TPPBook);

export function TPPBook({ id, media, url }) {
  // const { state: ostate, actions } = useOvermind();
  // const router = useRouter();
  const ref = useRef<any>();

  console.log('TPPBook', { id, media, url });

  const [loaded, setLoaded] = useState(false);

  useInterval(
    () => {
      if (window['AdobeDC']?.View) {
        setLoaded(true);
      }
    },
    loaded ? null : 200
  );

  useEffect(() => {
    if (!loaded) return;

    var adobeDCView = new window['AdobeDC'].View({
      clientId: ADOBE_CLIENT_API,
      divId: 'adobe-dc-view',
    });
    adobeDCView.previewFile(
      {
        content: {
          location: { url: url },
        },
        metaData: { fileName: 'book.pdf' },
      },
      previewConfig
    );
  }, [loaded]);

  const v = id;

  if (url) console.log('book url', url);

  const s = useWindowSize();

  return (
    <div>
      <div id="pdfViewer" className="w-full h-full overflow-hidden">
        <Script
          key="videojs"
          src="https://documentcloud.adobe.com/view-sdk/main.js"
          defer={false}
        />

        <div id="adobe-dc-view" ref={ref} className="w-full"></div>
      </div>
    </div>
  );
}
