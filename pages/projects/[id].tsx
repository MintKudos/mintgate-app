import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useOvermind } from 'stores/Overmind';
import LoadingOverlay from 'components/utility/LoadingOverlay';
import { useTokenLinkData, useTokenLinkURL } from 'hooks/getTokenLinkData';
// import { useBalanceCheck } from 'hooks/getBalance';
import { getStaticProps as _getStaticProps } from 'utils/staticProps';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import ProjectHome from 'components/NFT/ProjectHome';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default React.memo(TokenProfilePage);

function TokenProfilePage({ token }) {
  const { width, height } = useWindowSize();
  const { state: ostate, actions } = useOvermind();
  const [tokenData, setTokenData] = useState<any>(token);
  const [confetti, setConfetti] = useState(300);
  const router = useRouter();

  // const [balance] = useBalanceCheck(tokenData, true);

  const { data: tokenDataRaw } = useSWR(
    !!tokenData?.minting_info?.token_id // keep refreshing until token_id is available
      ? null
      : getTokenUrl(router.query.id as string, true),
    { refreshInterval: 15000 }
  );

  useEffect(() => {
    if (!tokenDataRaw) return;
    const data = tokenDataRaw;

    if (ostate.user.uid) {
      const ownerUID = data.creator_uid || data.uid;
      data.owner = ownerUID?.toString() === ostate.user.uid?.toString();
    }

    data.balance = data.balance || (data.owner ? 1 : 0);
    // console.log('page', data.page_content);
    data.image ||= data.img;

    setTokenData(data);
  }, [ostate.user.uid, tokenDataRaw]);

  const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  // Link Data for Token
  const [tokenLinkData] = useTokenLinkData(tokenData);
  const [confirmation, setCom] = useState(false);
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    setCom(qs.get('confirmation') === 'success');
  }, []);

  const imageVariants = {
    exit: { y: '50%', opacity: 0, transition },
    enter: {
      y: '0%',
      opacity: 1,
      transition,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setConfetti(0);
    }, 5000);
  }, []);

  if (token) token.image = token?.image || token?.img;

  if (!tokenData)
    return (
      <div className="mt-36 relative min-h-screen overflow-x-hidden">
        <LoadingOverlay />
      </div>
    );

  return (
    <div suppressHydrationWarning={true}>
      {!!confirmation && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={confetti}
          gravity={0.04}
          colors={['#7837F1', '#45E6FF', '#EF7EFF', '#FEFEFE']}
        />
      )}
      <ProjectHome
        tokenData={tokenData || token}
        imageVariants={imageVariants}
        tokenLinkData={tokenLinkData}
        balance={1}
      />
    </div>
  );
}

function getTokenUrl(tokenID, cb: boolean = false) {
  if (!tokenID) return null;
  tokenID = tokenID.toLowerCase();
  return TPP + '/api/v2/tokens/info/' + tokenID;
}

async function getToken(tokenID: string, cb: boolean = false) {
  if (!tokenID) return null;
  tokenID = tokenID.toLowerCase();
  return {
    data: await fetch(getTokenUrl(tokenID, cb)).then((x) => x.json()),
    url: getTokenUrl(tokenID, cb),
  };
}

/*
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
*/

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const t = (ctx?.params?.id || ctx?.query?.id) as string;
  const token = t ? await getToken(t, false) : null; // .then(x => x.result);

  let links = { data: null, url: '' };
  if (token?.data?.tid) {
    links.data = await fetch(useTokenLinkURL(t)).then((x) => x.json());
    if (links.data) links.url = useTokenLinkURL(t);
  }

  const brandProps: any = await _getStaticProps(ctx);

  const fallback: any = brandProps.props.fallback || {};
  if (token?.url) fallback[token.url] = token.data;
  if (links?.url) fallback[links.url] = links.data;
  // console.log('fallback', Object.keys(fallback));

  return {
    props: {
      token: token?.data,
      fallback: fallback,
      ...brandProps.props,
    },
    // revalidate: 30,
  };
};
