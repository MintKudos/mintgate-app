import page from '../../index';
import MainFeed from 'components/Content/MainFeed';

export default function PageFeed() {
  return <MainFeed />;
}

// probably not needed but works
// export const getServerSideProps = async (ctx) => {
//   const { req, res } = ctx;
//   const { chain, contract } = ctx.params;
//   const cookies = req.cookies;

//   const url =
//     process.env.NEXT_PUBLIC_TPP_SERVER +
//     '/api/v2/links/feed?chain=' +
//     chain +
//     '&jwt=' +
//     cookies.jwt;

//   let data = await fetch(url).then((x) => x.json());

//   let fallback = { [url]: data };

//   if (!cookies.bust)
//     res.setHeader(
//       'Cache-Control',
//       'public, s-maxage=59, stale-while-revalidate=110'
//     );
//   else res.setHeader('Cache-Control', 'no-cache');

//   return { props: { fallback: fallback, chain, contract } };
// };
