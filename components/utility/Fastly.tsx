import { useState } from 'react';
import LoadingAnimationCircle from 'components/utility/LoadingAnimationCircle';
import { SpeakerXMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export const BIG_NFT_SIZE = 1920; // do not set too high- think of our mobile users!

export const HIGH_DPI_SCALE = 2; // only scales small_nft_size
export const SMALL_NFT_SIZE = 400; // don't set too high for mobile

export default function Fastly({ src, ...props }) {
  if (!src || !props.width) props.width = SMALL_NFT_SIZE;
  const [soundOff, setSoundOff] = useState(true);
  const [loading, setLoading] = useState(false);
  let classNames = props.className || '';
  delete props.className;

  src = src?.replace('https://ipfs.io', 'https://ipfs.mintgate.io');

  const r = imgUrlCDN(src, props.width);
  src = r.src;
  if (!src && props.title)
    return <div className={classNames}>{props.title}</div>;
  if (!src) return null;
  const isImg = r.isImg;

  // if (loading) classNames = classNames + ' w-full loading'; // loading

  const onLoad = (e) => {
    if (props.onLoad) props.onLoad(e);
    if (props.onPlay) props.onPlay(e);
    //e.target.classList.remove('loading');
    setLoading(false);
    // console.log('======')
  };

  const onProgress = () => setLoading(true);
  const onError = props.onError || (() => {});

  let Component = null;
  if (isImg)
    Component = (
      <img
        loading="lazy"
        alt={props.alt || ''}
        onError={onError}
        draggable="false"
        src={src}
        srcSet={r.dpiSrc ? `${src} 1x, ${r.dpiSrc} 2x` : null}
        onProgress={onProgress}
        onLoad={onLoad}
        className={classNames}
        key={src}
      />
    );
  else {
    // delete props.loading;
    Component = (
      <>
        {props.enableSound && (
          <div className="absolute bottom-8 right-10 z-30">
            {soundOff ? (
              <SpeakerXMarkIcon
                onClick={() => setSoundOff(false)}
                className="text-base-content w-6 h-6"
              />
            ) : (
              <SpeakerWaveIcon
                onClick={() => setSoundOff(true)}
                className="text-base-content w-6 h-6"
              />
            )}
          </div>
        )}
        <video
          onError={onError}
          src={src}
          autoPlay
          loop
          muted={!props.enableSound || soundOff}
          playsInline
          onPlay={onLoad}
          className={classNames}
          key={src}
        />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className={'max-w-0 max-h-0'}>{Component}</div>
        <LoadingAnimationCircle />
      </>
    );
  } else return Component;
}

export function imgUrlCDN(src: string, width: number) {
  if (!src) return { url: '', isImg: true };
  const srcLower = src.toLowerCase();
  width = width || 800;

  const isData = /^data/.test(src) === true;
  let isImg =
    srcLower.indexOf('.mp4') === -1 && /^data:video/.test(src) === false;

  const isCDN = srcLower.indexOf('//cdn.') > -1;

  if (isData) return { src: src, isImg, dpiSrc: src };

  // if (isCDN && !process.env.NEXT_PUBLIC_FASTLY)
  // USE cdn.mintgate.io
  src = src.replace('fastly.mintgate', 'cdn.mintgate');
  src = src.replace('mintgate.app', 'mintgate.io');

  if (isCDN && srcLower.indexOf('.gif') > -1) {
    isImg = false;
    const u = new URL(src);
    u.searchParams.set('format', 'mp4');
    if (width) {
      u.searchParams.set('width', width.toString());
    }
    src = u.href;
    // delete props.onError;
  } else if (isCDN && isImg) {
    const u = new URL(src);
    // if (!process.env.NEXT_PUBLIC_FASTLY) {
    //   u.searchParams.set('quality', 80);
    //   u.searchParams.set('auto_optimize', 'medium');
    // }
    // u.searchParams.set('format', 'jpg');
    u.searchParams.set('auto', 'webp');
    u.searchParams.set('optimize', 'medium');

    u.searchParams.set('width', width.toString());
    src = u.href;
  }

  // High DPI scaling for small cards
  let dpiSrc = null;
  if (isCDN && isImg && width === SMALL_NFT_SIZE) {
    const u = new URL(src);
    u.searchParams.set('width', (width * HIGH_DPI_SCALE).toString());
    dpiSrc = u.href;
  }

  return { src, isImg, dpiSrc };
}
