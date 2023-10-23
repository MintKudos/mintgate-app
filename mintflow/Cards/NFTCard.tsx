import React from 'react';
import { useOvermind } from 'stores/Overmind';
import ALink from 'components/ALink';
import LazyLoad from 'react-lazyload';
import Fastly, { SMALL_NFT_SIZE } from 'components/utility/Fastly';

export default function NFTCard({ token, contract, image }) {
  const { state: ostate, actions } = useOvermind();
  const unlockables = token?.unlocks || 0;

  return (
    <ALink href="/#" title={token?.name}>
      <div className="border border-base-300 hover:border-2 hover:border-primary bg-base-100 rounded-box group cursor-pointer hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300">
        <div className="h-full min-h-96 bg-base-100 rounded-t-box ">
          <LazyLoad height={300} offset={200} resize once>
            <Fastly
              width={SMALL_NFT_SIZE}
              loading="lazy"
              src={image || '/cardPlaceholder.png'}
              alt={token?.name}
              className="rounded-t-box"
            />
          </LazyLoad>
        </div>
        <div className="p-4 w-full justify-between">
          <div className="w-full flex flex-col justify-center">
            {/* Hidden as long as we do not have the platform userflwo 
                <div
                    className="flex flex-row items-center pb-2 space-x-2"
                  >
                    <Fastly
                      src={ostate.user.photo}
                      width={72}
                      onError={(e) => (e.target.src = `/profilePlaceholder.jpg`)}
                      className="h-5 w-5 rounded-full object-cover"
                      alt="Profile"
                    />
                    <h6 className="text-base-content base1">
                        {ostate.user?.username?.slice(0, 16)}
                    </h6>
                  </div>
                  */}
            <h6 className="title text-base-content">{token?.name}</h6>
            <p className="base2 text-base-content/50">
              {contract?.name} · {contract?.totalSupply} NFTs
            </p>
          </div>
        </div>
      </div>
    </ALink>
  );
}
