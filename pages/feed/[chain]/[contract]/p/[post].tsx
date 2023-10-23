import MainFeed from 'components/Content/MainFeed';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useOvermind } from 'stores/Overmind';
import { GetServerSideProps } from 'next';
export default function PageFeed() {
  // const { state: ostate } = useOvermind();
  // const router = useRouter();

  // const postInQuery = useMemo(() => {
  //   if (!router.isReady) return null;
  //   return router.query.p || router.query.post || null;
  // }, [router.isReady]);

  return (
    <div>
      <MainFeed />
      {/* {postInQuery && (
            <ALink title="community" href={`/feed/${feedPosts[0]?.contract}/`}>
              <Button>Back to community</Button>
            </ALink>
          )} */}
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
