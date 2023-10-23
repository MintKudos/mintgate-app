import React, { useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { getStaticProps as _getStaticProps } from 'utils/staticProps';
import MainFeed from 'components/Content/MainFeed';
// export { getStaticPathsApp as getStaticPaths } from 'utils/staticProps';

// const DashboardComponent = dynamic(() => import('./admin'), {
//   ssr: false,
// });

function IndexPage(props) {
  const { state: ostate } = useOvermind();
  const router = useRouter();
  // console.log('IndexPage', props);

  // console.log('Index Page', props);

  // console.log('index props', props?.domain);

  // let Page = null;

  // return <Profile username={ostate.whitelabel?.username} {...props} />;
  return (
    <>
      <Head>
        {/* {!props.isCustomDomain && (
          <link rel="canonical" href="https://www.mintgate.io" />
        )} */}
      </Head>
      <MainFeed />
      {/*<Home username={ostate.whitelabel?.username} {...props} />*/}
    </>
  );
}

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;
// Add tokens
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let props: any = await _getStaticProps(ctx);

  // WIP
  // const brand = props.props?.brand;
  // const defNetwork = 1; // process.env.NODE_ENV === 'production' ? 1 : 4;
  // if (brand && brand?.id) {
  //   let url = `${TPP}/api/v2/tokens/byuser?uid=${brand?.id}&network=${brand?.brand?.network || defNetwork
  //     }`;
  //   if (brand?.brand?.id) url += `&brand=${brand?.brand?.id}`;

  //   const r = await fetch(url).then((x) => x.json());

  //   props.props.fallback = {
  //     ...props.props.fallback,
  //     [url]: r,
  //   };
  // }

  // console.log('getServerSideProps', Object.keys(props.props.fallback));

  return {
    props: { ...props.props },
  };
};

export default IndexPage;
