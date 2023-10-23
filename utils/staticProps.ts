import { getBrand } from 'components/utility/getBrand';
import { GetServerSideProps } from 'next';

const FALLBACK = 'blocking'; // process.env.NODE_ENV !== 'production' ? 'blocking' : true;

// export async function getStaticPathsApp(ctx) {
//   // const paths = [{ params: { site: 'app' } }];
//   // return { paths: paths, fallback: FALLBACK };
//   return { paths: [], fallback: FALLBACK };
// }

// export async function getStaticPaths() {
//   return { paths: [], fallback: FALLBACK };
// }

// const NodeCache = require('node-cache');
// const myCache = new NodeCache({ stdTTL: 3, checkperiod: 5 });
export const getStaticProps: GetServerSideProps = async (ctx) => {
  // ctx.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=20, stale-while-revalidate=59'
  // ); // use default?
  // console.log("ctx", ctx);
  console.log(ctx.params);
  let domain = 'app'; // getDomain(ctx?.params?.site || ctx?.req?.headers?.host);

  // if(domain === 'app.mintgate.io') domain = 'app';
  // console.log("getStaticProps domain", domain);
  // if (domain?.includes('localhost') && ctx.req.cookies['username']) domain = ctx.req.cookies['username'] + '.mintgate.io';

  //try {
  // let data = null; // await getBrand(domain);
  // const isCustomDomain = data && domain?.includes('.mintgate.io') === false;
  // const props: any = {
  //   brand: data,
  //   isBrand: !!data,
  //   domain: domain,
  //   isCustomDomain,
  //   fallback: {},
  //   // revalidate: 60,
  // };
  // if (data) props.fallback = { [data?.url]: data };

  return { props: { fallback: {} } }; // as any; // { props };
  // } catch (e) {
  //   console.warn(e);
  //   return {
  //     props: { isBrand: false, error: JSON.stringify(e) },
  //     revalidate: 30,
  //   };
  // }
};
