import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import useSearchParams from 'hooks/useSearchParams';

export { getStaticProps as getServerSideProps } from 'utils/staticProps';

export default function Watch() {
  const router = useRouter();
  const id = useSearchParams('v', 'id');

  useEffect(() => {
    if (!id) return;
    // router.push({ // DO NOT USE ROUTER PUSH, breaks whitelabel
    //   pathname: '/view',
    //   query: { v: id },
    // });
    window.location.href = `/view?v=${id}`;
  }, [id]);

  return <h1>Loading...</h1>;
}
