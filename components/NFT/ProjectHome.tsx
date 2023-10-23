import React, { useCallback, useState } from 'react';
import Fastly, { BIG_NFT_SIZE } from 'components/utility/Fastly';
import { useOvermind } from 'stores/Overmind';

import {
  PlayIcon,
  TicketIcon,
  BookOpenIcon,
  LinkIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';

export default function ProjectHome({
  tokenData,
  tokenLinkData,
  balance,
  imageVariants,
}) {
  const { state: ostate, actions } = useOvermind();

  const primaryContent =
    tokenLinkData?.value?.result.find((x) => x.primary === true) || null;
  const playerAvailable = primaryContent && balance > 0 && ostate.user.loggedIn;

  const setPlayerOpen = useCallback(() => {
    if (primaryContent) actions.setPlayer(primaryContent.id);
  }, [primaryContent]);

  //console.log('currentAvail layout', currentAvail);
  // console.log('Token Links', tokenLinkData);
  // console.log('Primary Content', primaryContent);
  // console.log('Player Open', playerOpen);

  return (
    <div className="px-6 lg:px-0 xl:px-12 max-w-4xl lg:max-w-7xl xl:max-w-8xl mx-auto">
      <div
        id="start"
        className="flex flex-col items-center h-full w-full bg-base-100 pt-28 pb-12 lg:pb-44"
      >
        <div
          className={`w-full ${'flex flex-col lg:flex-row justify-start lg:justify-center space-y-12 lg:space-x-20'} items-center mx-auto`}
        >
          {/* <progress className="absolute left-0 right-0 bottom-0 progress progress-primary w-full" value="60" max="100"></progress> */}
          <div
            id="player"
            className={`${'w-full lg:w-7/12 flex items-center justify-center'}`}
          >
            {
              <div className="group relative shadow-elevationHigh rounded-box">
                {playerAvailable && (
                  <div
                    onClick={() => setPlayerOpen()}
                    className="cursor-pointer absolute top-0 w-full h-full z-50 group-hover:bg-black/30 flex flex-row items-center justify-center transition-all ease-in-out duration-300"
                  >
                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
                      {primaryContent.media !== 'vid' &&
                        primaryContent.media !== 'aud' &&
                        primaryContent.media !== 'tix' &&
                        primaryContent.media !== 'ebk' && (
                          <LinkIcon className="w-12 h-12" />
                        )}
                      {primaryContent.media === 'vid' && (
                        <PlayIcon className="w-14 h-14" />
                      )}
                      {primaryContent.media === 'aud' && (
                        <PlayIcon className="w-14 h-14" />
                      )}
                      {primaryContent.media === 'tix' && (
                        <TicketIcon className="w-12 h-12" />
                      )}
                      {primaryContent.media === 'ebk' && (
                        <BookOpenIcon className="w-12 h-12" />
                      )}
                      {primaryContent?.release_date >= new Date() && (
                        <LockClosedIcon className="w-12 h-12" />
                      )}
                    </button>
                  </div>
                )}
                <Fastly
                  width={BIG_NFT_SIZE}
                  src={
                    tokenData?.image ? tokenData.image : '/cardPlaceholder.png'
                  }
                  alt={tokenData?.name}
                  enableSound={true}
                  onError={(e) => {
                    if (
                      e.target.src !== '/cardPlaceholder.png' &&
                      e.target.src !== window.location.href
                    )
                      e.target.src = '/cardPlaceholder.png';
                  }}
                  variants={imageVariants}
                  className="h-full w-auto mx-auto lg:max-h-80 xl:max-h-none object-contain shadow-elevationHigh"
                />
              </div>
            }
          </div>
          <div className={`${'w-full lg:w-5/12 space-y-10'}`}>
            <div>
              <h2 className="text-base-content">{tokenData?.name}</h2>
              <p className="mt-3 md:mt-5 sm:max-w-lg body1 text-base-content opacity-60">
                {tokenData?.description?.slice(0, 300) || null}
                {tokenData?.description?.length > 300 ? '...' : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
