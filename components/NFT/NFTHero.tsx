import React from 'react';
import ALink from 'components/ALink';
import Avatar from 'mintflow/Avatar';
import { useOvermind } from 'stores/Overmind';
import Fastly from 'components/utility/Fastly';

export default function NFTHero({ nft, greetingMessage }) {
  const { state: ostate } = useOvermind();

  return (
    <ALink
      title={nft[0]?.title}
      href={`/feed/${ostate.network}/${nft?.contract?.address}/${nft?.tokenId}`}
    >
      <div className="relative bg-gradient-to-b from-transparent via-base-100 to-base-100 xl:rounded-t-box h-full">
        <div className="relative px-4 pt-6 pb-4 z-20">
          <div className="hidden w-full sm:flex flex-row justify-between items-center pb-10 px-4 xl:px-2">
            <p className="text-base-content">
              {ostate.user.jwt && (
                <>
                  <span className="base1">{greetingMessage}</span>{' '}
                  <span className="base2 opacity-60">
                    {ostate.user?.wallets?.address?.slice(0, 8) + '...'}
                  </span>{' '}
                  <span className="base2 opacity-60">
                    on {ostate.network === 1 ? 'ETH' : 'MATIC'}
                  </span>
                </>
              )}
              {!ostate.user.jwt && (
                <a href="/login">
                  <span className="base1">Please connect wallet</span>
                </a>
              )}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 pt-14 md:pt-2">
            <Avatar
              shape="circle"
              size="2xl"
              border
              borderColor="base-100"
              src={nft?.media[0]?.thumbnail || nft?.media[0]?.gateway}
            />
            <div className="mt-4 sm:mt-0 text-center flex flex-col  justify-center">
              <p className="title text-base-content w-64 truncate">
                {nft?.title}
              </p>
              <p className="base2 text-base-content opacity-60">
                {nft?.contract.name}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 h-1/2 w-auto mx-auto max-w-7xl inset-0 xl:rounded-t-box backdrop-blur-xl overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-base-100/70 to-base-100 z-10" />
          <Fastly
            src={nft?.media[0]?.gateway}
            className="h-full w-full object-fill blur-3xl saturate-200"
          />
        </div>
      </div>
    </ALink>
  );
}
