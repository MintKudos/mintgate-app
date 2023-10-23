import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getContractData } from 'hooks/whitelabel/getContractData';
import { useOvermind } from 'stores/Overmind';

export default React.memo(_SiteMeta);

const PREFIX = {
  '/settings': 'Settings',
  '/login': 'Login',
  '/logout': 'Logout',
  '/callback': 'Logging in',
};
function _SiteMeta({ userInfo, getProfileInfo }: any) {
  const router = useRouter();
  const { state: ostate } = useOvermind();
  // const getProfileInfo = getContractData(userInfo, ostate.network);
  const contract = getProfileInfo?.contractMetadata;

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

  var [domain, setDomain] = useState('https://www.mintgate.io');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.origin);
    }
  }, [router.asPath]);

  const name = opensea?.collectionName || contract?.symbol;

  let title: string = 'Mintgate';
  let description: string =
    'Create and enjoy gated experiences from your NFT communities. A NFT based social platform where you`re NFTs come alive.';

  if (name) {
    title = title + ': ' + name + ' ' + 'Community page';
    description =
      'Experience gated content from' +
      name +
      'on Mintgate. A NFT based social platform where you`re NFTs come alive.';
  }

  let imgurl: string = '/cover.jpg';
  if (opensea && name)
    imgurl = '/api/og?' + 'img=' + opensea?.imageUrl + '&name=' + name;
  // let domain = globalThis?.location?.origin;
  // console.log('domain', domain)

  let path = router.pathname?.replace('/_sites/[site]', '');
  let prefix = PREFIX[path] || '';

  if (path.startsWith('/admin')) prefix = 'Admin';
  if (prefix) prefix += ' / ';

  const mintGateTitle = prefix + 'MintGate';

  // if (brand) {
  //   url = url || brand?.photo || brand?.banner;
  //   title =
  //     prefix +
  //     brand?.brand?.brandname +
  //     ` (${brand?.username})` +
  //     ' — MintGate'; //  ` (@${brand?.username})` +
  //   domain = brand?.brand?.origin;
  //   description = description || brand?.descr;
  // }

  title = title || mintGateTitle;

  if (!description)
    description = `Create and enjoy gated experiences from your NFT communities. A NFT based social platform where you're NFTs come alive.`;

  // if (userInfo) {
  //   url = userInfo?.result?.image || url;
  //   title = title + ' / ' + userInfo?.result?.name;
  //   description = userInfo?.result?.descr || description;
  // }

  if (imgurl && imgurl.indexOf('cdn.') > -1) {
    // url = url.replace("cdn.", "fastly.");
    imgurl = imgurl + '?width=300';
  }

  if (imgurl?.startsWith('/')) imgurl = domain + imgurl;

  const curl = domain + router.asPath;

  return (
    <Head key="head">
      <title>{title?.toString()}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta
        key="apple-mobile-web-app-title"
        name="apple-mobile-web-app-title"
        content={title}
      />
      <meta name="msapplication-config" content={domain + '/manifest.json'} />
      <meta key="description" name="description" content={description} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta
        key="application-name"
        name="application-name"
        content={`${title}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={curl} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta name="twitter:image:src" content={imgurl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:site_name" property="og:site_name" content={title} />
      <meta key="og:url" property="og:url" content={curl} />
      <meta
        key="og:image"
        property="og:image"
        content={imgurl || '/cover.jpg'}
      />
      {<link rel="manifest" href="/manifest.json" />}
      <link
        href="/logos/favicon.icon"
        rel="shortcut icon"
        type="image/x-icon"
      />
      <link href="/logos/apple-touch-icon.png" rel="apple-touch-icon" />
      <link
        key="apple-touch-icon180"
        rel="apple-touch-icon"
        sizes="180x180"
        href="/logos/apple-touch-icon.png"
      />
      <link
        key="shortcuticon32x32"
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/logos/favicon-32.png"
      />
      <link
        key="shortcuticon16x16"
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/logos/favicon-16.png"
      />
      <link key="shortcuticon" rel="shortcut icon" href="/logos/favicon.icon" />{' '}
    </Head>
  );

  // <meta
  // name="twitter:site"
  // content="@mintgate_io"
  // />
  // <meta name='twitter:creator' content='@mintgate_io' />
}
