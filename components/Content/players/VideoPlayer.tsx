import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useAsync, useAsyncFn, useInterval } from 'react-use';
// import { ethers } from 'ethers';
// import { useLocalStorage } from 'react-use';
// import { useRouter } from 'next/dist/client/router';
// import Link from 'next/link';
// import Head from 'next/head';
import Script from 'next/script';

export const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default memo(TPPVideoPlayer);

export function TPPVideoPlayer({ id, media, poster, vidUrl }) {
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    window['HELP_IMPROVE_VIDEOJS'] = false;
  }, []);

  const vref = useRef<any>();
  const [loaded, setLoaded] = useState(false);

  useInterval(
    () => {
      if (!globalThis.videojs) return;
      setLoaded(true);
    },
    loaded ? null : 300
  );

  useEffect(() => {
    const videojs = globalThis.videojs;
    if (!videojs) {
      if (loaded) setLoaded(false);
      return;
    }

    if (!vidUrl || !media) return;
    if (!vref.current) return;
    if (vref.current.vjs) return; // already setup

    const currentEl = vref.current;

    console.log('found videojs');

    const player = videojs(currentEl, {
      autoPlay: false,
      fluid: true, // vjs-fluid
      responsive: false,
      // height: 480,
      controlBar: {
        pictureInPictureToggle: false,
      },
    });

    player.on('error', function (e) {
      _onError(e);
    });

    currentEl.vjs = player;

    console.log('video instanced!');

    return () => {
      // if (vref.current?.vjs) { // causing bugs
      //   vref.current.vjs.dispose();
      //   vref.current.vjs = null;
      // }
    };
  }, [vref.current, loaded, vidUrl]);

  const _onError = (e) => {
    console.error(e);
    // if (onError) onError();
    return;
  };

  if (!vidUrl || !media)
    return (
      <div className="w-full text-center p-12 py-36 bg-base-200 font-bold text-base-content">
        Loading video player...
      </div>
    );

  // if (vidUrl) console.log('vidUrl loaded media', vidUrl, media);

  return (
    <div id="videoPlayer" key={vidUrl}>
      <Script
        key="videojs"
        src="https://unpkg.com/video.js/dist/video.min.js"
        onReady={() => setLoaded(true)}
        defer={true}
      />

      {/* TODO TS */}
      {(media === 'vid' || media === 'aud') && (
        <video
          ref={vref}
          id="my-player"
          controls
          controlsList="nodownload"
          autoPlay={true}
          loop={false}
          preload="auto"
          onError={_onError}
          data-setup="{}"
          poster={poster}
          playsInline
          control-bar={{
            liveDisplay: true,
            pictureInPictureToggle: false,
          }}
          className="video-js vjs-16-9 vjs-theme-fantasy vjs-big-play-centered"
        >
          {vidUrl.indexOf('m3u8') !== -1 ? (
            <source src={vidUrl} type="application/x-mpegURL" />
          ) : (
            <source src={vidUrl} type="video/mp4" />
          )}
        </video>
      )}

      {/* {media === 'aud' && (
        <audio
          ref={vref}
          id="my-player"
          controls
          controlsList="nodownload"
          autoPlay={false}
          preload="auto"
          onError={_onError}
          poster={poster}
          data-setup="{}"
          playsInline
          control-bar={{
            liveDisplay: true,
            pictureInPictureToggle: false,
          }}
          height={100}
          className="rounded-box video-js vjs-theme-fantasy vjs-layout-medium vjs-big-play-centered mx-auto"
        >
          <source src={vidUrl} type="application/x-mpegURL" />
        </audio>
      )} */}
    </div>
  );
}
//src={vidUrl}
