import React, { useRef } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useWindowSize } from 'react-use';
import { useRouter } from 'next/dist/client/router';

export const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function TPPFrame({ id, media, url }) {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();
  const ref = useRef<HTMLIFrameElement>(null);
  // const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   actions.hideNav(true);
  //   return () => actions.hideNav(false);
  // }, [])

  const v = id;

  if (url) url = url.replace(/^http:\/\//, 'https://');

  const onLoad = (e) => {
    console.log('frame loaded');
    // if (!ref.current) return;
    // const t = ref.current;
    // try {
    //   const h = ref.current?.contentWindow.document.body.scrollHeight;
    //   console.log('hight', h);
    //   if (h) setHeight(h);
    // } catch (e) {
    // } // height ? height :
  };

  const s = useWindowSize();

  // console.log('media', media);
  if (media === 'img') {
    return (
      <img src={url} className="mx-auto max-h-80 my-4 shadow-elevationHigh" />
    );
  }

  return (
    <div className="w-auto h-auto shadow-elevationHigh">
      {url && (
        <iframe
          className="mx-auto"
          ref={ref}
          src={url}
          scrolling="auto"
          width={s.width - (s.width > 1023 ? 190 : 0)}
          height={s.height - 120}
          frameBorder="0"
          allow={`accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
          onLoad={onLoad}
          sandbox={
            url.indexOf('.pdf') !== -1
              ? 'allow-scripts allow-same-origin allow-forms'
              : undefined
          }
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
//src={url}

//  style={{ paddingTop: '46%', overflow: 'hidden', position: 'relative' }}
