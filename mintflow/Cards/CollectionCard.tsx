import React from 'react';
import ALink from 'components/ALink';
import LazyLoad from 'react-lazyload';
import Fastly, { SMALL_NFT_SIZE } from 'components/utility/Fastly';

export default function CollectionCard({ collection }) {
  return (
    <ALink href={'/create/select_plan'} title={collection?.name}>
      <div className="border border-base-300 bg-base-200 rounded-box group cursor-pointer">
        <div className="h-full min-h-96 bg-base-100 rounded-t-box hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300">
          <LazyLoad height={300} offset={200} resize once>
            <Fastly
              width={SMALL_NFT_SIZE}
              loading="lazy"
              src={collection.media[0].gateway || '/cardPlaceholder.png'}
              alt={collection?.name}
              className="rounded-t-box"
            />
          </LazyLoad>
        </div>
        <div className="py-6 w-full justify-between">
          <div className="w-full flex flex-col justify-center px-10">
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
            <h6 className="title text-base-content">{collection?.name}</h6>
            <p className="mt-2 base2 text-base-content/50">
              {collection?.symbol} · Edition Size: {collection?.totalSupply} ·
              Owned:
              {collection?.ownedCount}
            </p>
          </div>
        </div>
      </div>
    </ALink>
  );
}
