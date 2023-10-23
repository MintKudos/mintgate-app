import { ethers } from 'ethers';
import { getRPC } from 'components/utility/withWallet';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

const MAIN_SPLITTER = '0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE';
const USDC_ADDRESS_ETH = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

export async function getUsdcBalance(
  account: string,
  chainId: number
): Promise<number> {
  if (!account) return null;
  const provider = new ethers.providers.StaticJsonRpcProvider(
    getRPC(chainId),
    chainId
  );

  const erc20 = (await import('../../abi/erc20.json')).default;

  const usdcContract = new ethers.Contract(
    USDC_ADDRESS_ETH,
    erc20,
    provider
  );

  const balance = await usdcContract.balanceOf(account);

  return Number(ethers.utils.formatUnits(balance, 6)); // USDC has 6 decimals
}