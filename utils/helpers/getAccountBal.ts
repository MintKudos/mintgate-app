import { ethers } from 'ethers';
import { getRPC } from 'components/utility/withWallet';

const getNativeBal = async (account, network) => {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    getRPC(network),
    network
  );
  const nativeBalance = await provider.getBalance(account);
  let fe = Number(ethers.utils.formatEther(nativeBalance));
  fe = Number.parseFloat(fe.toFixed(2));
  return fe;
};

export { getNativeBal };
