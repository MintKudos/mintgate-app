import React from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { getStaticProps as _getStaticProps } from 'utils/staticProps';
import useSWR from 'swr';
import { getContractData } from 'hooks/whitelabel/getContractData';
import Avatar from 'mintflow/Avatar';
import Button from 'mintflow/Button';
import NFTUploadWidget from 'components/NFT/NFTUploadWidget';
import AccountDrawer from 'components/utility/AccountDrawer';
import { UserSearchbar } from 'components/utility/UserSearchbar';
import { Feed } from 'components/Content/MainFeed';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';
import PageHero from 'components/general/PageHero';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default React.memo(TokenProfilePage);

function TokenProfilePage({}) {
  const { state: ostate } = useOvermind();
  // const [tokenData, setTokenData] = useState<any>(token);
  const router = useRouter();
  const contractAddress = router.query.id as string;
  // const [balance] = useBalanceCheck(tokenData, true);

  const nfts = useSWR(
    ostate.user.wallets.address &&
      ostate.network &&
      `${TPP}/api/v2/data/ownedNFTs?owner_address=${ostate.user.wallets.address}&chain=${ostate.network}`,
    (url) => fetch(url).then((resp) => resp.json())
  );
  const userNft = nfts?.data?.ownedNfts?.filter(
    (x) => x.contract.address.toLowerCase() === contractAddress?.toLowerCase()
  )[0];
  //console.log('userNfts', userNft);

  const getProfileInfo = useSWR(
    contractAddress && ostate.network && [contractAddress, ostate.network],
    (...params) => getContractData.apply(null, params)
  );
  const profileInfo = getProfileInfo?.data;

  //console.log('token', contractAddress);
  const feedResp = useSWR(
    ostate.user.wallets.address &&
      contractAddress &&
      '/api/v2/links/feed?chain=' +
        ostate.user.wallets.network +
        '&wallet=' +
        ostate.user.wallets.address +
        '&token=' +
        contractAddress
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

  const contract = profileInfo?.contractMetadata;
  const opensea: {
    collectionName;
    imageUrl;
    symbol;
    twitterUsername;
    discordUrl;
    discription;
    websiteUrl;
    description;
    externalUrl;
    floorPrice;
  } = contract?.openSea;

  return (
    <div suppressHydrationWarning={true}>
      <div className="rounded-box overflow-hidden shadow-elevationSmall pb-6 bg-base-100">
        <PageHero Text={opensea?.collectionName} />
        <div className="relative h-28 w-full bg-base-100">
          <img
            src={opensea?.imageUrl}
            className="h-full w-full object-cover blur-3xl opacity-60"
          />
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-15 sm:-mt-24 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <Avatar
                src={opensea?.imageUrl}
                border
                borderSize="4"
                borderColor="base-100"
                shape="circle"
                shadow
                size="lg"
              />
            </div>
            <div className="mt-24 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className=" min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate h6 text-base-content">
                  {opensea?.collectionName}
                </h1>
                <p className="body2 text-base-content opacity-60">
                  {opensea?.symbol}
                </p>
              </div>
              <div className="justify-stretch flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
                {opensea?.twitterUsername && (
                  <a
                    href={`https://twitter.com/${opensea?.twitterUsername}`}
                    target="_blank"
                  >
                    <Button variant="nav" size="sm" startIcon circle>
                      <img src="/twitter.svg" className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {opensea?.externalUrl && (
                  <a href={opensea?.externalUrl} target="_blank">
                    <Button variant="nav" size="sm" startIcon circle>
                      <GlobeAltIcon className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {/* Maybe not show Discord- users can do to the Twitter to find it... let's encourage posting here.*/}
                {opensea?.discordUrl && (
                  <a href={opensea?.discordUrl} target="_blank">
                    <Button variant="nav" size="sm" startIcon circle>
                      <img src="/discord.svg" className="w-5 h-5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
          {opensea?.description && (
            <div className="relative">
              <div className="absolute w-full bottom-0 z-10 bg-gradient-to-t from-base-100 to-transparent h-4" />
              <div className="mt-8 px-2 relative max-h-15 overflow-y-auto no-scrollbar pb-4">
                <ReactMarkdown
                  className="reactMarkDown"
                  children={opensea?.description}
                />
              </div>
            </div>
          )}
          <div className="mt-4 px-2 flex space-x-4">
            <p className="body2 text-base-content opacity-60">
              Community Floor:{' '}
              <span className="base2">{opensea?.floorPrice} ETH</span>
            </p>
            <p className="body2 text-base-content opacity-60">
              Total Supply:{' '}
              <span className="base2">{contract?.totalSupply}</span>
            </p>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {opensea?.collectionName}
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-4 min-h-screen">
        {/* <Button onClick={() => setShowPost(!showPost)} variant="primary">
            Post privately to the community
          </Button> */}
        <div className="p-6 shadow-elevationSmall rounded-box bg-base-100">
          <NFTUploadWidget
            tid={contractAddress}
            chain={ostate.network}
            tierItems={[]}
            userNft={userNft}
            imgSrc={opensea?.imageUrl}
          />
        </div>
        <div className="mt-8">
          <Feed feedPosts={feedPosts} />
        </div>
      </div>
    </div>
  );
}
