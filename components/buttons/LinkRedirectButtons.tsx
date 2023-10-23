import { unlockLink } from 'hooks/Chains/Unlock/unlockLinks';
import Button from 'mintflow/Button';

function LinkRedirectButtons({
  id,
  ttype,
  symbol,
  token,
  subid,
  address,
  network,
}) {
  {
    console.log('id', id);
  }
  if (ttype === 1) {
    return (
      <a href={`/projects/${address}`}>
        <Button className="flex mx-auto btn btn-gradient-two buttontext text-primary-content mt-4 mb-">
          Buy it on MintGate
        </Button>
      </a>
    );
  }

  if (ttype === 2) {
    return (
      <a
        href={`https://app.daohaus.club/dao/${Number.parseInt(network).toString(
          16
        )}/${address}`}
        target="_blank"
      >
        <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
          Visit daohaus.club to learn more about this DAO
        </button>
      </a>
    );
  }

  if (ttype === 3) {
    return (
      <a href={unlockLink(address, network, id)} target="_blank">
        <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
          Buy Key on Unlock
        </button>
      </a>
    );
  }

  if (ttype === 4) {
    return null;
  }

  if (ttype === 721 || ttype === 1155) {
    if (network === 1) {
      if (subid.indexOf(',') !== -1) {
        let arraySubid = subid.split(',');
        /*console.log('arraySubid', arraySubid);*/
        const subidButtons = arraySubid.map((subid) => (
          <a
            href={`https://rarible.com/token/${token}:${subid}?tab=details`}
            target="_blank"
          >
            <button className="ml-4 btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
              Buy NFT {subid} on Rarible
            </button>
          </a>
        ));
        return subidButtons;
      } else {
        return (
          <a
            href={`https://rarible.com/token/${token}:${subid}?tab=details`}
            target="_blank"
          >
            <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
              Buy NFT on Rarible
            </button>
          </a>
        );
      }
    }
  }

  if (ttype === -1) {
    if (network === 1) {
      return (
        <a href={`https://www.binance.us/en/home`} target="_blank">
          <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
            Buy ETH
          </button>
        </a>
      );
    }
    if (network === 137) {
      return (
        <a href={`https://matic.network/wallet`} target="_blank">
          <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
            Buy MATIC
          </button>
        </a>
      );
    }
  }

  if (ttype === 20 && network === 1) {
    const uniURL = new URL('https://app.uniswap.org/#/swap?outputCurrency=');
    const redirecturl = uniURL.origin + uniURL.hash + token;
    return (
      <a href={redirecturl} target="_blank">
        <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
          Buy {symbol ? symbol : token} on Uniswap
        </button>
      </a>
    );
  }

  if (ttype === 20 && network === 137) {
    const maticURL = new URL(
      'https://quickswap.exchange/#/swap?outputCurrency='
    );
    const redirecturl = maticURL.origin + maticURL.hash + token;
    return (
      <a href={redirecturl} target="_blank">
        <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
          Buy {token?.symbol !== null ? token?.symbol : token} on Quickswap
        </button>
      </a>
    );
  }

  if (ttype === 20 && network === 100) {
    const honeyURL = new URL('https://honeyswap.org/#/swap?outputCurrency=');
    const redirecturl = honeyURL.origin + honeyURL.hash + token;
    return (
      <a href={redirecturl} target="_blank">
        <button className="flex mx-auto btn btn-gradient-two buttontext  text-primary-content mt-4 mb-4">
          Buy {token?.symbol !== null ? token?.symbol : token} on Honeyswap
        </button>
      </a>
    );
  } else return null;
}

export default LinkRedirectButtons;
