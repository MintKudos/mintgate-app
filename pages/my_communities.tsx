import React from 'react';
import useSWR from 'swr';
import { useOvermind } from 'stores/Overmind';
import ALink from 'components/ALink';
import PageHero from 'components/general/PageHero';
import Fastly from 'components/utility/Fastly';
import { getOwnedNFTs } from 'hooks/whitelabel/getContractData';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function Communities() {
  const { state: ostate } = useOvermind();

  console.log('ostate.user.wallets.address', ostate.user.wallets.address);
  const collections = getOwnedNFTs(ostate.user.wallets.address, ostate.network);
  const userCollections = collections?.data?.communities;

  //console.log('User Collections', userCollections);

  return (
    <div>
      <PageHero Text="Your Communities" />
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 py-8 px-4 md:p-8">
        {userCollections?.map((collection) => (
          <ALink
            key={collection.address}
            title={collection.name}
            href={`/feed/1/${collection.address}`}
          >
            <div
              key={collection.address + '_' + collection.name}
              className="h-full group col-span-1 w-auto border border-base-300 shadow-elevationSmall hover:shadow-elevationMedium bg-base-100 rounded-box transition-all hover:-translate-y-2 ease-in-out duration-200"
            >
              <Fastly
                src={collection.opensea?.imageUrl}
                onError={(e) => (e.target.src = `/error-placeholder.png`)}
                className="w-full rounded-t-box object-cover"
              />
              <div className="p-4 space-y-1">
                <p className="base1 truncate text-base-content">
                  {collection.name}
                </p>
                <p className="caption2 text-base-content opacity-50">
                  {collection.symbol} · {collection.numDistinctTokensOwned}
                </p>
              </div>
            </div>
          </ALink>
        ))}
      </div>
    </div>
  );
}
