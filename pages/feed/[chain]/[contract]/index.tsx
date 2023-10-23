import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { getStaticProps as _getStaticProps } from 'utils/staticProps';
import useSWR from 'swr';
import {
  getContractData,
  getOwnedNFTs,
} from 'hooks/whitelabel/getContractData';
import Avatar from 'mintflow/Avatar';
import Button from 'mintflow/Button';
import NFTUploadWidget from 'components/NFT/NFTUploadWidget';
import { Feed } from 'components/Content/MainFeed';
import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';
import PageHero from 'components/general/PageHero';
import ALink from 'components/ALink';
import { GetServerSideProps } from 'next';
import Fastly from 'components/utility/Fastly';

export default React.memo(TokenProfilePage);

function TokenProfilePage({}) {
  const { state: ostate } = useOvermind();
  // const [tokenData, setTokenData] = useState<any>(token);
  const router = useRouter();
  const [contractAddress, setAddr] = useState<string>(null);

  useEffect(() => {
    // if(!router.isReady) return;
    // console.log('router', router);
    const l = router.asPath.split('/');
    setAddr(l[l.length - 1]);
    //console.log('router.isReady', router.isReady, router);
  }, [router]);
  // const [balance] = useBalanceCheck(tokenData, true);

  const nfts = getOwnedNFTs(
    ostate.user.wallets.address,
    ostate.network,
    contractAddress?.toLowerCase()
  );

  const userNft = nfts?.data?.ownedNfts;

  //console.log('userNfts', selectedNFT);

  const getProfileInfo = getContractData(contractAddress, ostate.network);
  const contract = getProfileInfo?.data?.contractMetadata;

  //console.log('token', contractAddress);
  const feedResp = useSWR(
    ostate.user.wallets.network &&
      ostate.user.jwt &&
      contractAddress &&
      '/api/v2/links/feed?chain=' +
        ostate.user.wallets.network +
        '&token=' +
        contractAddress +
        '&jwt=' +
        ostate.user.jwt,
    { keepPreviousData: true }
  );
  const feedPosts: any[] = feedResp?.data?.feed || [];

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
  } = contract?.openSea;

  // console.log('Profile Info', getProfileInfo?.data);

  const name = opensea?.collectionName || contract?.symbol;
  return (
    <div suppressHydrationWarning={true}>
      <PageHero Text={'Community Page ' + name} />
      <div>
        <div className="absolute top-0 h-44 w-auto mx-auto max-w-7xl inset-0 z-0">
          <Fastly
            src={opensea?.imageUrl}
            className="h-full w-full bg-primary object-fill blur-3xl opacity-60 saturate-200"
          />
        </div>
        <div className="pt-20 md:pt-28 max-w-md md:max-w-lg lg:max-w-none mx-auto px-4 sm:px-8 lg:px-10">
          <div className="-mt-8 lg:-mt-16 flex md:flex-row flex-col items-center md:items-end md:space-x-5">
            <div className="flex">
              <Avatar
                src={opensea?.imageUrl}
                border
                borderSize="4"
                borderColor="base-100"
                shape="square"
                shadow
                size="2xl"
              />
            </div>
            <div className="mt-6 md:mt-24 flex md:flex-row flex-col min-w-0 flex-1 items-center justify-end md:space-x-6 pb-1">
              <div className=" min-w-0 flex-1 flex flex-col items-center md:block">
                <h1 className="truncate h6 text-base-content">{name}</h1>
                <p className="mt-1 body1 text-base-content opacity-60">
                  {contract?.symbol}
                </p>
              </div>
              <div className="mt-4 md:mt-0 justify-stretch flex flex-row space-x-2">
                <ALink
                  title="Twitter Profile"
                  href={`https://rarible.com/collection/${contractAddress}`}
                  target="_blank"
                >
                  <Button variant="nav" size="sm" startIcon circle>
                    <img src="/rarible.svg" className="w-5 h-5" />
                  </Button>
                </ALink>
                <ALink
                  title="OpenSea Profile"
                  href={`https://opensea.io/collection/${opensea?.collectionName
                    ?.toLowerCase()
                    ?.replaceAll(' ', '-')}`}
                  target="_blank"
                >
                  <Button variant="nav" size="sm" startIcon circle>
                    <img src="/opensea.svg" className="w-5 h-5" />
                  </Button>
                </ALink>
                {opensea?.twitterUsername && (
                  <ALink
                    title="Twitter Profile"
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
                  </ALink>
                )}
                {opensea?.externalUrl && (
                  <ALink
                    title="Website"
                    href={opensea?.externalUrl}
                    target="_blank"
                  >
                    <Button variant="nav" size="sm" startIcon circle>
                      <GlobeAltIcon className="w-5 h-5" />{' '}
                    </Button>
                  </ALink>
                )}
              </div>
            </div>
          </div>
          {opensea?.description && (
            <div className="relative">
              <div className="text-center md:text-left mt-4 md:mt-8 px-2 relative max-h-15 overflow-y-auto no-scrollbar pb-4">
                <ReactMarkdown
                  className="reactMarkDown opacity-60"
                  children={opensea?.description}
                />
              </div>
            </div>
          )}
          <div className="mt-4 px-2 flex items-center justify-center md:justify-start space-x-4">
            {!!opensea?.floorPrice && (
              <div className="flex flex-col md:flex-row md:space-x-1">
                <p className="body2 text-base-content opacity-60">
                  Floor Price:{' '}
                </p>
                <p className="base2 text-base-content opacity-60">
                  {opensea?.floorPrice} ETH
                </p>
              </div>
            )}
            {!!contract?.totalSupply && (
              <div className="flex flex-col md:flex-row md:space-x-1">
                <p className="body2 text-base-content opacity-60">
                  Total Supply:{' '}
                </p>
                <p className="base2 text-base-content opacity-60">
                  {contract?.totalSupply}
                </p>
              </div>
            )}
            {!!contract?.tokenType && (
              <div className="flex flex-col md:flex-row md:space-x-1">
                <p className="body2 text-base-content opacity-60">Type:</p>
                <p className="base2 text-base-content opacity-60">
                  {contract.tokenType}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 min-h-screen py-6 lg:px-10 z-20">
        {/* <Button onClick={() => setShowPost(!showPost)} variant="primary">
            Post privately to the community
          </Button> */}
        {userNft?.length > 0 ? (
          <div className="mb-14">
            <NFTUploadWidget
              tid={contractAddress}
              chain={ostate.network}
              tierItems={[]}
              userNft={userNft}
              imgSrc={opensea?.imageUrl}
            />
          </div>
        ) : (
          <NoAccessWidget
            contractAddress={contractAddress}
            network={ostate.network}
          />
        )}
        <Feed feedPosts={feedPosts} />
      </div>
    </div>
  );
}

export function NoAccessWidget({ contractAddress, network }) {
  const getProfileInfo = getContractData(contractAddress, network);
  const contract = getProfileInfo?.data?.contractMetadata;
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
  } = contract?.openSea;

  return (
    <div className="relative h-64 mb-14 rounded-box shadow-elevationHigh overflow-hidden">
      <div className="relative h-full w-full flex flex-col justify-center items-center my-auto text-center text-base-content z-10 transform space-y-4">
        <LockClosedIcon className="w-6 h-6" />
        <div className="space-y-1">
          <p className="title">Unlock Access</p>
          <p className="body2">
            Access the community by purchasing at least one NFT
          </p>
        </div>
        <ALink
          href={`https://opensea.io/collection/${opensea?.collectionName
            ?.toLowerCase()
            ?.replaceAll(' ', '-')}`}
          title={'Buy ' + opensea?.collectionName}
        >
          <Button variant="primary" startIcon>
            Buy on OpenSea
          </Button>
        </ALink>
      </div>
      <div className="absolute h-full w-full overflow-hidden mx-auto max-w-7xl inset-0 z-0">
        <img
          src={opensea?.imageUrl}
          className="h-full w-full bg-primary object-cover blur-3xl opacity-60 saturate-200"
        />
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

  // Links
  if (cookies.jwt && contract && chain) {
    const url =
      process.env.NEXT_PUBLIC_TPP_SERVER +
      '/api/v2/links/feed?chain=' +
      chain +
      '&token=' +
      contract +
      '&jwt=' +
      cookies.jwt;

    let data = await fetch(url).then((x) => x.json());
    fallback = { ...fallback, [url]: data };
  }

  if (contract && chain) {
    const url =
      process.env.NEXT_PUBLIC_TPP_SERVER +
      `/api/v2/data/getContractMetadata?contract_address=${contract}&chain=${chain}`;
    let data = await fetch(url).then((x) => x.json());
    fallback = { ...fallback, [url]: data };
  }

  // async function addOwners(owner_address, chain, contract) {
  //   const addContract = contract ? `&contract=${contract}` : '';
  //   const url = `${process.env.NEXT_PUBLIC_TPP_SERVER}/api/v2/data/ownedNFTs?owner_address=${owner_address}&chain=${chain}${addContract}`,
  //   const data = await fetch(url).then((x) => x.json());
  //   return {url, data};
  // }

  if (!cookies.bust)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=59, stale-while-revalidate=110'
    );
  else res.setHeader('Cache-Control', 'no-cache');

  return { props: { fallback: fallback, chain, contract } };
};
