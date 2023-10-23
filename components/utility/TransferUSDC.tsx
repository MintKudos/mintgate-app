import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getNativeBal } from 'utils/helpers/getAccountBal';
import { useProvider } from './withWallet';
import { useOvermind } from 'stores/Overmind';
import { getTransactionLink } from 'utils/helpers/chainSpecificLinks';
import Input from 'mintflow/Input';
import Button from 'mintflow/Button';
import LoadingAnimationCircle from './LoadingAnimationCircle';
import erc20 from '../../abi/erc20.json';

export default function TransferUSDC({ balance }) {
  const { state: ostate, actions } = useOvermind();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [destination, setDestination] = useState();
  const [amountinUsdc, setAmount] = useState<number>();
  const [transactionHash, setTransactionHash] = useState<string>();

  const provider = useProvider();

  const [userEthBal, setEthBal] = useState<number>();

  useEffect(() => {
    if (ostate?.user?.wallets?.address)
      getNativeBal(ostate?.user?.wallets?.address, 1).then(setEthBal);
  }, [ostate?.user?.wallets?.address]);

  function checkEth() {
    if (userEthBal < 0.01) {
      let userConfirmation = confirm(
        'You cannot make crypto transfers without ETH. Buy ETH to complete transfer?'
      );

      if (userConfirmation) {
        open(
          `https://widget.wert.io/01FJ1SB6GP1QC272AM88CDMQV0/redirect?commodity=ETH&currency_amount=5&currency=USD&address=${ostate?.user?.wallets?.address}`
        );
      }

      return;
    }
  }

  useEffect(() => {
    const checkAmount = setTimeout(async () => {
      setAmount(amountinUsdc);
      checkEth();
    }, 1000);
    return () => clearTimeout(checkAmount);
  }, [userEthBal]);

  async function sendUsdc(destination, amountinUsdc) {
    const userProvider = new ethers.providers.Web3Provider(provider);
    const signer = userProvider.getSigner();

    const amount = ethers.utils.parseUnits(amountinUsdc.toString(), 6);

    console.log({ amount });

    const contract = new ethers.Contract(
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC-Ethereum Token Contract Address
      erc20,
      signer
    );

    const tx = await contract.transfer(destination, amount, {
      maxFeePerGas: ethers.utils.parseUnits('80', 'gwei'),
      maxPriorityFeePerGas: ethers.utils.parseUnits('80', 'gwei'),
    });

    const receipt = await tx.wait();

    return receipt;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const finalReceipt = await sendUsdc(destination, amountinUsdc);
      setTransactionHash(finalReceipt?.transactionHash);
      setSuccess(true);
      return finalReceipt;
    } catch (error) {
      alert('Error: ' + error);
      console.log('error:', error);
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col space-y-8 w-full">
      {loading && !success && (
        <div className="flex flex-col space-y-4 mx-auto">
          <LoadingAnimationCircle />
          <div className=" caption1 flex mx-auto text-base-content text-center">
            Please wait one moment for us to transfer rewards.
          </div>
        </div>
      )}
      {success && (
        <div className="flex flex-col space-y-4 mx-auto items-center">
          <img src="/check.gif" className="h-36 w-36 max-w-sm rounded-xl" />
          <p className="caption1 text-base-content text-center">
            We have successfully transferred your funds. Check out your
            confirmation
            <span>
              <a
                href={getTransactionLink(ostate?.network, transactionHash)}
                className="ml-1 link caption1"
                target="_blank"
              >
                here
              </a>
            </span>
          </p>
        </div>
      )}
      {!loading && !success && (
        <div className="space-y-6">
          <Input
            key="Send To"
            type="text"
            label="Enter Ethereum adress"
            variant="primary"
            name="Send To"
            id="Send To"
            onChange={(e) => setDestination(e.target.value)}
            placeholder="ex. 0x58807baD0B3...."
            className="w-full"
          />
          <Input
            key="Amount"
            type="number"
            variant="primary"
            label="Enter amount"
            labelalt={`You have: ${balance?.value?.toFixed(
              2
            )} USDC & You have: ${userEthBal?.toFixed(2)} ETH`}
            name="Amount"
            id="Amount"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="ex. 5"
            className="w-full"
          />
        </div>
      )}
      {!loading && !success && (
        <div className="flex">
          <Button variant="primary" fullWidth onClick={(e) => handleSubmit(e)}>
            Transfer USDC
          </Button>
        </div>
      )}
    </div>
  );
}
