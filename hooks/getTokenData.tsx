import { useAsync } from 'react-use';
import { getChain } from '@mintgate/evm-chains';
import { getNetworkDisplay } from 'stores/Overmind';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

const useTokenDataFromURL = () => {
  const tokenData = useAsync(async () => {
    const sp = new URLSearchParams(window.location.search);
    let token = sp.get('token');
    const amount = sp.get('amount');
    const network = sp.get('network');
    const ttype = sp.get('ttype');
    const handle = sp.get('handle');
    const subid = sp.get('subid');
    const account = sp.get('account');
    const tid = sp.get('tid');

    if (ttype === '-1') {
      token = getNetworkDisplay(Number.parseInt(network));
      if (!token) token = getChain(Number.parseInt(network)).shortName;
    }

    let symbol;
    if (!network || (token && token.charAt(0) !== '0')) {
      symbol = token;
    }

    const _url = new URL(`${TPP}/api/chain/symbol`);
    _url.searchParams.set('token', token);
    _url.searchParams.set('network', network);

    const r = await fetch(_url.toString()).then((x) => x.json());
    symbol = r.symbol || token;

    return {
      token,
      amount,
      ttype,
      handle,
      subid,
      tid,
      account,
      symbol,
      network,
    };
  }, []);

  return [tokenData];
};

export { useTokenDataFromURL };
