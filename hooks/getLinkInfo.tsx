import { useAsync } from 'react-use';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

const useLinkInfo = (id) => {
  const linkInfo = useAsync(async () => {
    if (!id) return null;
    const url = new URL(`${TPP}/api/v2/links/linkid`);
    url.searchParams.set('id', id);

    const result = await fetch(url.toString())
      .then((x) => x.json())
      .then(async (data) => {
        const tokensWithSymbol = await Promise.all(
          data.tokens.map(async (x) => {
            if (x.network < 1) return { ...x, symbol: x.address };
            // let result;
            // const url = new URL(`${env.TPP}/api/chain/symbol`);
            // url.searchParams.set('token', x.address);
            // url.searchParams.set('network', x.network);

            // try {
            //   result = await fetch(
            //     url.toString())
            //     .then((x) => x.json());
            // } catch (e) {
            return { ...x, symbol: x.address };
            // }
            // return { ...x, symbol: result.symbol };
          })
        );

        return { ...data, tokens: tokensWithSymbol };
      });

    return result;
  }, [id]);

  return [linkInfo];
};

export { useLinkInfo };
