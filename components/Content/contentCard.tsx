import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOvermind } from 'stores/Overmind';
import Fastly, { BIG_NFT_SIZE } from 'components/utility/Fastly';
import EditLinkModal from 'components/Links/editLinkModal';
import {
  PlayIcon,
  TicketIcon,
  BookOpenIcon,
  LinkIcon,
  LockClosedIcon,
  PhotoIcon,
  StarIcon,
  PauseIcon,
} from '@heroicons/react/24/solid';
import Countdown from 'react-countdown';
import CountdownShow from 'mintflow/Countdown';
import { dateToTimestamp, checkAfterDate } from 'utils/helpers/convertTime';
import Button from 'mintflow/Button';
import { tokenUpdate } from 'components/utility/hideButton';
import ALink from 'components/ALink';
import clsx from 'clsx';
// import { useBalanceCheck } from 'hooks/getBalance';
import Badge from 'mintflow/Badge';
import ReactMarkdown from 'react-markdown';
import { PlayerSdk } from '@api.video/player-sdk';
import { useIntersection } from 'react-use';
import {
  getTier,
  hasBalanceForTier,
  TierCardSmall,
  TIER_VARIANTS,
} from 'mintflow/Tiercard/Tiercard';
import { useRouter } from 'next/router';
import { NFTAvatar } from 'components/NFT/NFTAvatar';
import ShareButtons from 'components/utility/ShareButtons';
import { off } from 'process';
import { duration } from 'moment';

export var PLAYERS = ['vid', 'aud', 'ebk', 'img', 'link', null, '', 'lnk'];

export function getLinkClick(l, actions, tid, owned, loggedIn) {
  // if (l?.tokens) console.log('l', l);
  if (l && (!l?.tokens || l?.tokens?.length === 0)) owned = true;
  if (l?.tokens?.[0] === null) owned = true; // HACK

  if (!loggedIn) {
    return (e) => {
      e.preventDefault();
      //alert('Please login first to view and have purchased access.');
      return (
        <div className="absolute top-0 z-50 bg-base-100 h-44">
          <p className="h3 text-base-content">Not logged in</p>
        </div>
      );
      // window.location.href =
      //   '/login?callback=' + encodeURIComponent(window.location.href);
    };
  }
  if (owned === false) {
    return (e) => {
      e.preventDefault();
      alert('You do not own this pass yet! Purchase on the next page.');
    };
  }

  //if (tid && owned !== false) {
  //  if (PLAYERS.includes(l.media)) {
  return (e) => {
    e.preventDefault();
    actions.setPlayer(l.id);
  };
  //   }
  //}
  return () => {};
}

// export function getLink(l, actions, tid, owned) {
//   if (owned === false && tid) return `/projects/${tid}`;
//   if (tid) {
//     if (PLAYERS.includes(l.media)) {
//       return `/projects/${tid}?v=${l.id}`;
//     }
//   }
//   return `/go/${l.id}`; // ${env.TPP}
// }

export function getOwnedOverlay(l, owned, ostate) {
  if (!l?.minted?.tid) return null;
  return (
    ostate?.user?.loggedIn && (
      <>
        <div className="absolute w-full h-full group-hover:bg-base-100/30 hover:backdrop-blur-md rounded-box top-0 flex flex-col bg-black/20 items-center justify-center transition transform">
          <button className="text-white opacity-100 flex space-x-2 mx-4 my-2 items-center">
            <LockClosedIcon className="w-12 h-12 opacity-100" />
          </button>
        </div>
      </>
    )
  );
}

export default function ContentCard({ l, bigCard }: { l; token?; bigCard? }) {
  const { state: ostate, actions } = useOvermind();
  //let tid = token?.tid || l?.tid; // || l?.tokens?.[0]?.address;
  // console.log('l', l);
  // const [balance] = useBalanceCheck(token, true);
  // const owned = !!ostate.user.creator || balance >= (l?.minbal || 1); // 1;

  // const renderer = useMemo(
  //   () =>
  //     ({ days, hours, minutes, seconds, completed }) => {
  //       if (completed || l?.release_date < dateToTimestamp(new Date())) {
  //         return null;
  //       } else {
  //         return (
  //           <CountdownShow
  //             days={days}
  //             minutes={minutes}
  //             hours={hours}
  //             seconds={seconds}
  //             linkOverlay={false}
  //             colon={false}
  //             color="text-base-content"
  //           ></CountdownShow>
  //         );
  //       }
  //     },
  //   [l?.release_date]
  // );

  const img = l?.link_photo || l?.img;

  // const badgeType = () => {
  //   if (l?.media === 'vid') return 'Video';
  //   if (l?.media === 'aud') return 'Audio';
  //   if (l?.media === 'ebk') return 'Document';
  //   if (l?.media === 'img') return 'Image';
  //   if (l?.media === 'link') return 'Link';
  //   if (l?.media === 'tix') return 'Ticket';
  // };

  // console.log('Links Tier', l.tier);
  //console.log('Posts', postContent);

  // console.log('Post details', postContent);

  // const hasLink = l?.media !== 'txt';

  const selfUrl =
    !!l?.contract &&
    !!ostate.network &&
    `/feed/${ostate.network}/${l?.contract}/p/${l?.id}`;

  const d = new Date(l?.created);
  d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
  const date = d.toLocaleString(undefined, {
    dateStyle: 'short',
    // timeStyle: 'short',
  });

  const body = (
    <div className="relative shadow-elevationSmall pb-8 md:pb-0">
      <div className="absolute z-10 left-4 md:left-0 -top-6">
        <ALink
          title={l?.title}
          href={
            l.uid_tid &&
            '/feed/' + ostate.network + '/' + l?.contract + '/' + l.uid_tid
          }
        >
          <NFTAvatar title={l?.title} img={l?.uid_img} />
        </ALink>
      </div>
      <div className="relative w-full md:rounded-box transition-all ease-in-out duration-300 border-t md:border border-base-300 md:bg-base-200 p-2">
        {/* Post Actions */}
        <div className="flex justify-end items-center">
          {selfUrl && (
            <ShareButtons quote={l?.title} shareURL={selfUrl} iconOnly={true} />
          )}
          {ostate.user.contributor && l?.uid == parseInt(ostate.user.uid) && (
            <div className="flex flex-col items-start space-y-2 justify-between">
              <div className="flex space-x-4 items-center">
                {/* 
              
                {PLAYERS.includes(l.media) && (
                  <Button
                    variant={l.primary ? 'primary' : 'secondary'}
                    size="sm"
                    circle
                    onClick={() =>
                      tokenUpdate(ostate.user.jwt, null, {
                        primary_content_id: !l.primary ? l.id : null,
                      }).then((x) => {
                        alert('saved');
                        window.location.reload();
                      })
                    }
                  >
                    <StarIcon className="w-4 h-4" />
                  </Button>
                )}
          */}

                <EditLinkModal link={l} token={null}></EditLinkModal>
              </div>
            </div>
          )}
        </div>

        {/* Post Body */}
        <div className="pt-4 pb-6 px-4">
          <div
            key={l.id}
            className="flex flex-row items-center justify-between mb-1 text-base-content"
          >
            {/* <p className="title text-base-content">{l.title}</p> */}
            {/* <p className="font-medium">
              {l.descr}</p> */}
            <ReactMarkdown
              skipHtml={true}
              className="reactMarkDown"
              children={l.descr}
            />

            <div className="text-sm label-text italic">{date}</div>
            {/* 
              {l.tier !== 0 && (
                <TierCardSmall
                  postfix=""
                  variant={TIER_VARIANTS[l.tier || 0]}
                />
              )}
              */}
            {/* <p className={`capitalize base2 {}-text`}>
                    {TIER_VARIANTS[l.tier || 0]} Tier
                  </p> */}
          </div>
        </div>
        {/* Post Additional Content */}
        {l.url && l?.media !== 'txt' && (
          <div className="relative h-full cursor-pointer md:rounded-box">
            {/*checkAfterDate(l?.release_date) && (
            <div className="absolute w-full h-full rounded-box top-0 flex items-center justify-center z-10 flex-col">
              <p className="text-xs uppercase font-semibold mt-2">
                Unlockable release in
              </p>
              <Countdown date={l?.release_date} renderer={renderer} />
            </div>
          )*/}
            {/* {img && l?.media && hasLink && (
              <>
                <div className="">
                  <Badge variant="filled">{badgeType()}</Badge>
                </div>
                <Fastly
                  className={`${
                    new Date(l?.release_date) >= new Date() && 'opacity-50'
                  } object-center`}
                  src={img}
                  width={300}
                />
              </>
            )} */}

            <CardContent l={l} img={img} />
          </div>
        )}
      </div>
    </div>
  );

  return body;
}

type LinkProps = {
  media: string;
  id: string;
  url: string;
  refid: string;
  contract: string;
  title: string;
  uid_img: string;
  uid_tid: string;
  uid: number;
  release_date: any;
};

function CardContent({ l, img }: { l: LinkProps; img: string }) {
  const media: 'img' | 'vid' | 'txt' | 'aud' | 'ebk' = l?.media as any;

  // useEffect(() => {
  //   const options = ;
  //   const observer = new IntersectionObserver(callbackFunction, options);
  //   if (containerRef.current) observer.observe(containerRef.current);

  //   return () => {
  //     if (containerRef.current) observer.unobserve(containerRef.current);
  //   };
  // }, [containerRef]);

  if (!l) return null;

  if (media === 'img') {
    return (
      <Fastly
        src={l.url}
        width={BIG_NFT_SIZE}
        className="w-full h-full md:rounded-box cursor-default"
      />
    );
  }

  // if(l.media === 'aud' && !play) {

  // }

  // if (l.media === 'aud') {
  //   return <iframe src={l.url} className="w-full h-full rounded-box" />;
  // }

  // if (l.media === 'ebk') console.log('l.url', l);
  if (media === 'vid') {
    return <VideoPlayer l={l} />;
  }

  if (media === 'aud') {
    return <AudioPlayer l={l} />;
  }

  return (
    <a
      href={l.url}
      title={l.url}
      target="_blank"
      className="group flex flex-row space-x-4 items-center border border-base-300 w-3/4 md:w-1/2 lg:w-1/3 rounded-box bg-base-100 hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300"
    >
      <div className="relative transform flex flex-row items-center justify-center bg-primary w-16 h-16 rounded-l-box">
        <div className="text-white ">
          {!l?.release_date && (
            <>
              {(!l.media || l.media === 'lnk') && (
                <LinkIcon className="w-5 h-5" />
              )}
              {l.media === 'tix' && <TicketIcon className="w-5 h-5" />}
              {l.media === 'ebk' && <BookOpenIcon className="w-5 h-5" />}
            </>
          )}
        </div>
      </div>
      <p>
        {' '}
        {!l?.release_date && (
          <>
            {(!l.media || l.media === 'lnk') && 'Web Link'}
            {l.media === 'tix' && 'Ticket'}
            {l.media === 'ebk' && 'Document'}
          </>
        )}
      </p>
      {/* {!l?.release_date && (
        <>
          {(!l.media || l.media === 'lnk') && <p className="base1"> Link </p>}
          {l.media === 'tix' && <TicketIcon className="w-5 h-5" />}
          {l.media === 'ebk' && <p className="base1"> Document</p>}
        </>
      )} */}
    </a>
  );
}

var firstUnmuted = false;
const VideoPlayer = ({ l }) => {
  const [player, setPlayer] = useState<PlayerSdk>(null);

  const forwardedRef = useRef(null);

  // const callbackFunction = (entries) => {
  //   const [entry] = entries;
  //   setIsVisible(entry.isIntersecting);
  // };

  const ints = useIntersection(forwardedRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  const intersectionRatio = ints?.intersectionRatio || 0;

  useEffect(() => {
    if (!player || player['init'] === true) return;

    player.setTheme({
      // linkHover: 'rgba(0, 255, 0, 1)',
      backgroundBottom: '#191E29',
      trackUnplayed: '#11131A',
      trackBackground: '#11131A',
      linkActive: 'rgba(106, 72, 241, 1)',
      trackPlayed: 'rgba(106, 72, 241, 1)',
    });

    player.mute();
    player.hideControls([
      'download',
      'subtitles',
      'more',
      'pictureInPicture',
      'progressBar',
    ]);

    const onMouse = function () {
      player.showControls();
      player.hideControls(['download', 'subtitles', 'more']);
    };
    player.addEventListener('mouseenter', onMouse);
    const onLeave = function () {
      player.hideControls(['progressBar']);
    };
    player.addEventListener('mouseleave', onLeave);
    // player.mute();
    // player.play();
    player.pause();
    player.setLoop(true);
    player['init'] = true;

    // isVisible ? player.play() : player.pause();
    //player.play();
    return () => {
      if (!player['removeEventListener']) return;
      player['removeEventListener']('mouseenter', onMouse);
      player['removeEventListener']('mouseleave', onLeave);
    };
  }, [player]);

  useEffect(() => {
    if (!player) return;
    // if (intersectionRatio < 0.01) {
    //   player.destroy();
    //   setPlayer(null);
    //   return;
    // }
    if (intersectionRatio < 0.98) {
      player.pause();
      return;
    }
    if (intersectionRatio >= 0.98) {
      // if (window['player'] !== player) {
      //   window['player']?.pause();
      // }
      player.getPaused().then((x) => x && player.play());
      // window['player'] = player;
      return;
    }
  }, [intersectionRatio]);

  useEffect(() => {
    if (!forwardedRef.current) return;
    // create the player in the #target element

    setPlayer(
      new PlayerSdk(forwardedRef.current, {
        id: '#player_' + l?.refid,
      })
    );

    // console.log(
    //   'Visible inside useEffex',
    //   isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'
    // );

    return () => {
      if (typeof player?.destroy === 'function') player?.destroy();
      // window['player'] = null;
    };
  }, [forwardedRef.current]);

  let url = l.url || `https://embed.api.video/vod/${l.refid}`;
  if (url.includes('api.video')) url += '#hide-title;api';
  else if (url.includes('youtu')) url = url.replace('/watch?v=', '/embed/');

  return (
    <div className="w-full">
      <iframe
        ref={forwardedRef}
        frameBorder="0"
        id={'player_' + l?.refid}
        scrolling="no"
        allowFullScreen
        src={url}
        className="h-full w-full aspect-video text-center mx-auto md:rounded-box overflow-hidden bg-base-100"
      />
    </div>
  );
};

const AudioPlayer = ({ l }) => {
  const [player, setPlayer] = useState<PlayerSdk>(null);
  const forwardedRef = useRef(null);

  useEffect(() => {
    if (!player || player['init'] === true) return;

    player.setTheme({
      backgroundTop: 'rgba(120,87,255, 1)',
      backgroundBottom: '#7857FF',
      trackUnplayed: '#11131A',
      trackBackground: 'rgba(120,87,255, 1)',
      linkActive: 'rgba(106, 72, 241, 1)',
      trackPlayed: 'rgba(106, 72, 241, 1)',
    });
    player.hidePoster();
    player.showTitle();
    player.showControls();
    player.hideControls([
      'download',
      'subtitles',
      'fullscreen',
      'more',
      'pictureInPicture',
      'chromecast',
    ]);
    player.setLoop(true);
    player['init'] = true;

    // isVisible ? player.play() : player.pause();
    //player.play();
  }, [player]);

  let url = l.url || `https://embed.api.video/vod/${l.refid}`;
  if (url.includes('api.video')) url += '#hide-title;api';
  // console.log('url', url);

  useEffect(() => {
    if (!forwardedRef.current) return;
    // create the player in the #target element
    if (!url.includes('api.video')) return;

    setPlayer(
      new PlayerSdk(forwardedRef.current, {
        id: '#player_' + l?.refid,
      })
    );

    // console.log(
    //   'Visible inside useEffex',
    //   isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'
    // );

    return () => {
      if (typeof player?.destroy === 'function') player?.destroy();
      window['player'] = null;
    };
  }, [forwardedRef.current, url]);

  return (
    <div>
      <iframe
        ref={forwardedRef}
        frameBorder="0"
        id={'player_' + l?.refid}
        scrolling="no"
        allowFullScreen
        src={url}
        className="relative w-full h-fulll md:rounded-box"
      />
    </div>
  );
};
