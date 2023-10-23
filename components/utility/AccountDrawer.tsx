import React, { useEffect, useState, useMemo } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useRouter } from 'next/router';
import ALink from 'components/ALink';
import Button from 'mintflow/Button';
import Avatar from 'mintflow/Avatar';
import NFTHero from 'components/NFT/NFTHero';
import ReactMarkdown from 'react-markdown';
import {
  RectangleGroupIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/solid';
import {
  getContractData,
  getOwnedNFTs,
} from 'hooks/whitelabel/getContractData';

//Swiper JS
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Fastly from './Fastly';

export default function AccountDrawer({ small }) {
  const { state: ostate, actions } = useOvermind();
  const isContributor = ostate.user?.contributor;
  const router = useRouter();
  // const [address, setAddr] = useState<string>(null);

  const address = useMemo(() => {
    if (!router.isReady) return null;
    return (router.query.contract as string) || null;
  }, [router.isReady, router.query.contract, router.asPath]);

  // console.log('address', address);

  const collections = getOwnedNFTs(ostate.user.wallets.address, ostate.network);

  const collectionsNFTs = getOwnedNFTs(
    !!address && ostate.user.wallets.address,
    ostate.network,
    address
  );

  const userCollections = collections?.data?.communities;

  // useEffect(() => {
  //   setAddr(router.asPath.split('/')[3]);
  // }, [router]);

  // Check on what Page type the user is on
  const pageType =
    router.asPath.split('/').length === 5
      ? 1 // Token Page
      : router.asPath.split('/').length === 4
      ? 2 // Community Page
      : router.asPath.split('/').length <= 3
      ? 3
      : 3; //Feed Page

  const navItems = [
    // {
    //   title: 'My NFTs',
    //   link: '/my_profiles',
    //   icon: <UserCircleIcon />,
    // },
    {
      title: `${userCollections?.length || ''} Collections`,
      link: '/my_communities',
      icon: <UsersIcon />,
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <Cog6ToothIcon />,
    },
    {
      title: 'More',
      link: '/more',
      icon: <RectangleGroupIcon />,
    },
    {
      title: 'Feedback',
      link: 'https://mintgate.canny.io',
      icon: <ChatBubbleLeftEllipsisIcon />,
    },
  ];

  // Get all NFTs from the wallet
  // const getNfts = getOwnedNFTs(
  //   ostate.user.wallets.address,
  //   ostate.user.wallets.network
  // );
  const allUserNFTs = address ? collectionsNFTs?.data?.ownedNfts : [];

  // Remvoved duplicate NFTs from a collection
  const userNFTs = allUserNFTs;

  // Get only NFTs from current collection
  const collectionNFTs = allUserNFTs;

  // Get contract Info for Token page
  const getContractinfo = getContractData(address, ostate.user.wallets.network);
  const contractInfo = getContractinfo?.data;

  // Set Dsiplaay NFTs based on Page
  const displayNFTs =
    pageType === 2
      ? collectionNFTs?.length === 0
        ? userNFTs
        : collectionNFTs
      : userNFTs;

  const stats = [{ label: 'Owned', value: allUserNFTs?.length }];

  let greetingMessage;
  const date = new Date();
  const hours = date.getHours();

  // Set welcome Message based on Time
  if (hours < 12) {
    greetingMessage = 'GM';
  } else if (hours >= 12 && hours < 14) {
    greetingMessage = 'Good Day';
  } else if (hours >= 14 && hours < 18) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Evening';
  }

  return (
    <div className="relative pb-12 md:pb-0">
      <div className={`flex flex-col  ${small ? 'xl:px-4' : 'xl:px-8'}`}>
        <div className="xl:mt-6 xl:border xl:border-base-300 xl:rounded-box bg-gradient-to-b from-transparent via-base-100 to-base-100 xl:rounded-t-box space-y-4">
          {pageType === 1 ? (
            <div className="relative bg-base-100 rounded-t-box">
              <div className="relative px-4 pt-6 mb:pb-4 z-20">
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
                <div className="flex flex-col items-center justify-center ">
                  <Avatar
                    shape="square"
                    size="2xl"
                    src={contractInfo?.contractMetadata?.openSea?.imageUrl}
                  />
                  <div className="mt-4 text-center flex flex-col justify-center space-y-4">
                    <p className="title text-base-content">
                      {contractInfo?.contractMetadata?.name}
                    </p>
                    {contractInfo?.contractMetadata?.openSea?.description && (
                      <div className="max-h-10 overflow-y-auto no-scrollbar px-8 pb-2">
                        <ReactMarkdown
                          className="body2 text-base-content opacity-60"
                          children={
                            contractInfo?.contractMetadata?.openSea?.description
                          }
                        />
                      </div>
                    )}
                    <ALink
                      title={contractInfo?.contractMetadata?.name}
                      href={`/feed/1/${contractInfo?.contractMetadata?.address}`}
                      className="w-full px-4"
                    >
                      <Button variant="secondary" fullWidth>
                        <p className="base2">View Community</p>
                      </Button>
                    </ALink>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 h-1/2 w-auto mx-auto max-w-7xl inset-0 xl:rounded-t-box backdrop-blur-xl overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-base-100/70 to-base-100 z-10" />
                <Fastly
                  src={contractInfo?.contractMetadata?.openSea?.imageUrl}
                  className="h-full w-full object-fill blur-3xl saturate-200"
                />
              </div>
            </div>
          ) : (
            <>
              <Swiper
                centeredSlides={true}
                loop={displayNFTs?.length > 1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                effect={'fade'}
                grabCursor={true}
                modules={[Autoplay, EffectFade]}
                className="mySwiper"
              >
                {displayNFTs?.map((nft) => (
                  <SwiperSlide key={nft?.title + ' ' + nft?.contract?.address}>
                    <NFTHero nft={nft} greetingMessage={greetingMessage} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
          <div className="pb-4 px-4 lg:px-8 xl:px-4 space-y-2">
            <div className="hidden sm:grid grid-cols-1 gap-2">
              {stats
                .filter((s) => s.value)
                .map((stat) => (
                  <div
                    key={stat.label}
                    className="px-6 py-5 flex flex-col text-center base2 rounded-box border border-base-300"
                  >
                    <span className="text-base-content">{stat.value}</span>{' '}
                    <span className="text-base-content opacity-60">
                      {stat.label}
                    </span>
                  </div>
                ))}
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                {navItems.map((item) => (
                  <ALink
                    key={item.title}
                    href={item.link}
                    title={item.title}
                    className="group w-full"
                  >
                    <div className="group-hover:shadow-elevationSmall border border-base-200 group-hover:border-primary flex flex-row sm:flex-col py-6 px-4 bg-base-200 rounded-box w-full items-center justify-center md:justify-between transition-all ease-in-out hover:-translate-y-1 duration-300">
                      <div className="flex flex-row sm:flex-col space-x-2 items-center">
                        <span className="w-5 h-5">{item.icon}</span>
                        <p className="base2 sm:mt-2">{item.title}</p>
                      </div>
                    </div>
                  </ALink>
                ))}
              </div>
            </div>
            <ALink
              href="https://mintgate.canny.io/"
              target="_blank"
              title="Provide Feedback"
            >
              <div
                className="mt-2 h-28 w-full rounded-box border border-base-300 bg-cover flex items-center justify-center group cursor-pointer bg-opacity-80"
                style={{ backgroundImage: 'url(/announcement-bg.png)' }}
              >
                <div className="bg-base-100 bg-opacity-60 backdrop-blur-md rounded-box py-2 px-4">
                  <p className="base1 block group-hover:hidden">v4.0 Beta</p>
                  <p className="base1 hidden group-hover:block">
                    Provide feedback
                  </p>
                </div>
              </div>
            </ALink>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-start xl:pl-0 pt-0 p-4 lg:pr-8 lg:pl-6 xl:p-2">
          <Button
            size="sm"
            variant="nav"
            startIcon
            onClick={(x) => {
              actions.logOut({ force: true });
              setTimeout(() => {
                window.location.href = '/';
              }, 200);
            }}
          >
            <ArrowLeftOnRectangleIcon className="group-hover:text-primary w-4 h-4" />
            <p className="group-hover:text-primary body2">Logout</p>
          </Button>
          <div className="flex flex-col items-end mt-2">
            <div className="flex flex-row  items-end space-x-2">
              <ALink href="/terms" title="Terms & Conditions">
                <p className="caption2 opacity-60">Terms & Conditions</p>
              </ALink>
              <ALink href="/privacy_policy" title="Privacy Policy">
                <p className="caption2 opacity-60">Privacy Policy</p>
              </ALink>
            </div>
            <p className="base2 mt-1">mintgate.io</p>
          </div>
        </div>
      </div>
    </div>
  );
}
