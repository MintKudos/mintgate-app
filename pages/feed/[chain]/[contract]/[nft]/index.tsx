import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { getStaticProps as _getStaticProps } from 'utils/staticProps';
import useSWR from 'swr';
import {
  getContractData,
  getNftData,
  getOwnedNFTs,
} from 'hooks/whitelabel/getContractData';
import Avatar from 'mintflow/Avatar';
import Button from 'mintflow/Button';
import NFTUploadWidget from 'components/NFT/NFTUploadWidget';
import { Feed } from 'components/Content/MainFeed';
import PageHero from 'components/general/PageHero';
import ALink from 'components/ALink';
import { GetServerSideProps } from 'next';
export default React.memo(TokenIDProfilePage);

function TokenIDProfilePage({}) {
  const { state: ostate } = useOvermind();
  const router = useRouter();

  const [contractAddress, setAddr] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const network = ostate.network === 137 ? 'polygon' : 'ethereum';

  useEffect(() => {
    const l = router.asPath.split('/');

    const contract = l[l.length - 2];
    const id = l[l.length - 1];
    console.log('id', id, contract);
    setAddr(contract);
    setTokenId(id);
  }, [router]);

  const getProfileInfo = getNftData(contractAddress, tokenId, ostate.network);
  const profileInfo = getProfileInfo?.data;
  // console.log('profileInfo', profileInfo);

  //console.log('token', contractAddress);
  const feedResp = useSWR(
    ostate.user.wallets.network &&
      ostate.user.jwt &&
      contractAddress &&
      tokenId &&
      `/api/v2/links/feed?chain=${ostate.user.wallets.network}` +
        `&token=${contractAddress}` +
        `&token_id=${tokenId}` +
        `&jwt=${ostate.user.jwt}`,
    { keepPreviousData: true }
  );
  const feedPosts: any[] = feedResp?.data?.feed || [];

  //console.log('Feed Posts', feedPosts);

  {
    /* 

  if (!contractDetails)
    return (
      <div className="mt-36 relative min-h-screen overflow-x-hidden">
        <LoadingOverlay />
      </div>
    );
  */
  }

  //console.log('contractAddress', contractAddress);
  const contractMetadata = profileInfo?.contractMetadata;

  //console.log('ID', contract?.symbol);
  const opensea: {
    collectionName;
    imageUrl;
    twitterUsername;
    discordUrl;
    discription;
    websiteUrl;
    description;
    externalUrl;
    floorPrice;
  } = contractMetadata?.openSea;

  return (
    <div suppressHydrationWarning={true}>
      <PageHero Text={'NFT Profile ' + profileInfo?.title} />
      <div>
        <div className="absolute top-0 h-44 w-auto mx-auto max-w-7xl inset-0 z-0">
          <img
            src={profileInfo?.media?.[0]?.gateway}
            className="h-full w-full object-fill blur-3xl opacity-60 saturate-200"
          />
        </div>
        <div className="pt-20 md:pt-28 max-w-lg lg:max-w-none mx-auto  sm:px-8 lg:px-10">
          <div className="-mt-8 lg:-mt-16 flex md:flex-row flex-col items-center md:items-end md:space-x-5">
            <div className="flex">
              <Avatar
                src={profileInfo?.media?.[0]?.gateway}
                border
                borderSize="4"
                borderColor="base-100"
                shape="circle"
                shadow
                size="2xl"
              />
            </div>
            <div className="mt-6 md:mt-24 flex md:flex-row flex-col min-w-0 flex-1 items-center justify-end md:space-x-6 pb-1">
              <div className=" min-w-0 flex-1 flex flex-col items-center md:block">
                <h1 className="truncate h6 text-base-content">
                  {profileInfo?.title}
                </h1>
                <ALink
                  title={opensea?.collectionName}
                  href={
                    '/feed/1/' + profileInfo?.contract?.address?.toLowerCase()
                  }
                >
                  <p className="mt-1 body2 text-base-content opacity-60 cursor-pointer">
                    Member of{' '}
                    {profileInfo?.contractMetadata?.name ||
                      opensea?.collectionName}
                  </p>
                </ALink>
              </div>
              <div className="mt-4 md:mt-0 justify-stretch flex flex-row space-x-2">
                <ALink
                  title="Twitter Profile"
                  href={`https://rarible.com/token/${contractAddress}:${tokenId}`}
                  target="_blank"
                >
                  <Button variant="nav" size="sm" startIcon circle>
                    <img src="/rarible.svg" className="w-5 h-5" />
                  </Button>
                </ALink>
                <ALink
                  title="OpenSea Profile"
                  href={`https://opensea.io/assets/${network}/${contractAddress}/${tokenId}`}
                  target="_blank"
                >
                  <Button variant="nav" size="sm" startIcon circle>
                    <img src="/opensea.svg" className="w-5 h-5" />
                  </Button>
                </ALink>
                {/* Hidden for the NFT profile for now 
                {opensea?.twitterUsername && (
                  <a
                    href={`https://twitter.com/${opensea?.twitterUsername}`}
                    target="_blank"
                  >
                    <Button variant="nav" size="sm" startIcon circle>
                      <svg
                        role="img"
                        className="w-5 h-5"
                        fill="#1DA1F2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Button>
                  </a>
                )}
                {opensea?.externalUrl && (
                  <a href={opensea?.externalUrl} target="_blank">
                    <Button variant="nav" size="sm" startIcon circle>
                      <LinkIcon className="w-5 h-5" />{' '}
                    </Button>
                  </a>
                )}
              */}
              </div>
            </div>
          </div>
          {opensea?.description && (
            <div className="relative">
              <div className="grid grid-cols-4 gap-2 mt-4 md:mt-12 relative max-h-20 overflow-y-auto no-scrollbar pb-4">
                {profileInfo?.metadata?.attributes?.map((attribute) => (
                  <>
                    {attribute.value && (
                      <div className="border border-base-300 rounded-box px-4 py-2 flex flex-col space-y-1 justify-center items-start">
                        <p className="text-xs opacity-60">
                          {attribute.trait_type}
                        </p>
                        <p className="text-xs font-medium">{attribute.value}</p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <br />
      <ALink
        title={opensea?.collectionName}
        href={'/feed/1/' + profileInfo?.contract?.address?.toLowerCase()}
      >
        <Button variant="secondary" fullWidth className="my-4">
          <p className="mt-1 body2 text-base-content cursor-pointer">
            View all posts from{' '}
            {profileInfo?.contractMetadata?.name || opensea?.collectionName}
          </p>
        </Button>
      </ALink>

      <div className="mt-8 min-h-screen px-4 py-6 lg:px-10">
        {/* <Button onClick={() => setShowPost(!showPost)} variant="primary">
            Post privately to the community
          </Button> */}
        {/* <div className="p-2 shadow-elevationSmall bg-base-200 rounded-box mb-14">
          <NFTUploadWidget
            tid={contractAddress}
            chain={ostate.network}
            tierItems={[]}
            userNft={profileInfo}
            imgSrc={opensea?.imageUrl}
          />
        </div> */}
        <Feed feedPosts={feedPosts} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  // console.log('params', ctx.params);
  const { chain, contract } = ctx.params;
  const cookies = req.cookies;

  let fallback = {};

  if (contract && chain) {
    const url =
      process.env.NEXT_PUBLIC_TPP_SERVER +
      `/api/v2/data/getContractMetadata?contract_address=${contract}&chain=${chain}`;
    let data = await fetch(url).then((x) => x.json());
    fallback = { ...fallback, [url]: data };
  }

  if (!cookies.bust)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=59, stale-while-revalidate=110'
    );
  else res.setHeader('Cache-Control', 'no-cache');

  return { props: { fallback: fallback, chain, contract } };
};
