import { ethers } from 'ethers';
import thirdweb1155 from '../abi/thirdwebV21155.json';
import { useOvermind } from 'stores/Overmind';
import { getRPC } from 'components/utility/withWallet';
import { useSWRFn } from 'components/utility/react/call-hooks';

async function getBalance(
  account,
  tokenId,
  whitelabelContract,
  chainId
) {
  const useContract = whitelabelContract;

  if (!useContract) return null;

  const provider = new ethers.providers.StaticJsonRpcProvider(
    getRPC(chainId),
    chainId
  );

  const contract = new ethers.Contract(useContract, thirdweb1155, provider);
  const balance = await contract.balanceOf(account, tokenId);
  return Number.parseInt(balance);
}

export const useBalanceCheck = (token, rapidCheck: boolean = false) => {
  const { state: ostate, actions } = useOvermind();

  const chainId = ostate.network;
  const account = ostate.user.wallets.address;

  const hasMintingInfo = !!token?.minting_info;
  const tokenId = token?.minting_info?.token_id || null;
  const whitelabelContract = !hasMintingInfo
    ? null
    : token?.minting_info?.contract;

  const useContract = whitelabelContract;

  const balance = useSWRFn<number>(
    'getBalance',
    getBalance,
    [account, tokenId, useContract, chainId, !!ostate.wertUrl],
    rapidCheck
  );

  return [balance];
};
