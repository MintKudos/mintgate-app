import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useOvermind } from 'stores/Overmind';
import Avatar from 'mintflow/Avatar';
import ALink from 'components/ALink';
import PageHero from 'components/general/PageHero';
import Fastly from 'components/utility/Fastly';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function MyProfiles(props, url) {
  const { state: ostate } = useOvermind();
  const nfts = useSWR(
    ostate.user.wallets.address &&
      ostate.user.wallets.network &&
      `${TPP}/api/v2/data/ownedNFTs?owner_address=${ostate.user.wallets.address}&chain=${ostate.user.wallets.network}&contract=-1`,
    (url) => fetch(url).then((resp) => resp.json())
  );
  const userNfts = nfts?.data?.ownedNfts;

  //console.log('NFTs', userNfts);

  return (
    <div>
      <PageHero Text="Your NFT Profiles" />
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 
      md:gap-y-8 px-4 py-8 md:p-8"
      >
        {userNfts &&
          userNfts.map((collection) => (
            <ALink
              title={collection.contract.name}
              href={`/feed/${ostate.network}/${collection.contract.address}/${collection.tokenId}`}
            >
              <div
                key={
                  collection.contract.address + '_' + collection.contract.name
                }
                className="group col-span-1 w-auto space-y-4 hadow-elevationSmall hover:shadow-elevationMedium bg-base-100 rounded-box transition-all ease-in-out hover:-translate-y-2 duration-200 flex flex-col items-center"
              >
                <Avatar
                  src={collection.media[0]?.gateway}
                  shape="circle"
                  size="2xl"
                  border
                  borderSize="4"
                  borderColor="base-300"
                  className="group-hover:ring-primary"
                />
                <div className="p-2 flex flex-col text-center space-y-1">
                  <p className="base1 truncate text-base-content w-44">
                    {collection.title}
                  </p>
                  <p className="caption2 text-base-content opacity-50">
                    {collection.contract.symbol}
                  </p>
                </div>
              </div>
            </ALink>
          ))}
      </div>
    </div>
  );
}
