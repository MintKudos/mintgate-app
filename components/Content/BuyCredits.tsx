import React, { useState } from 'react';
import {
  BanknotesIcon,
  CreditCardIcon,
  MoonIcon,
} from '@heroicons/react/24/solid';
import Button from 'mintflow/Button';
import Modal from 'mintflow/Modal';
import ModalHeader from 'mintflow/Modal/ModalHeader';
import ModalBody from 'mintflow/Modal/ModalBody';
import ModalActions from 'mintflow/Modal/ModalActions';
import { useOvermind } from 'stores/Overmind';
import { ethers } from 'ethers';
import { useProvider } from 'components/utility/withWallet';

export const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function BuyCredits(): any {
  const { state: ostate, actions } = useOvermind();
  const [userBalance, setUserBalance] = useState<number>(1000);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const provider = useProvider();

  const buyCredits = async (amount: number) => {
    const userProvider = new ethers.providers.Web3Provider(provider);
    const signer = userProvider.getSigner();

    const usdc = new ethers.Contract(
      '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC-Poly Token Contract Address
      [
        'function transfer(address to, uint256 value) returns (bool)',
        'function balanceOf(address owner) view returns (uint256)',
      ],
      signer
    );

    const address = await signer.getAddress();
    const balance = await usdc.balanceOf(address);

    // Check if user has enough USDC & if not, prompt wert to buy some
    if (balance.lt(ethers.utils.parseUnits(amount.toString(), 6))) {
      alert(`You don't have enough USDC to buy ${amount} credits. Please buy some USDC first.`);

      actions.setWertUrl(
        `https://widget.wert.io/01FJ1SB6GP1QC272AM88CDMQV0/redirect?commodity=USDC&address=${address}`
      );

      return;
    }

    // transfer usdc to 0xc6Ef1f1C5Bc8B8B9CD1a178a6063bb9212Ce2a8B (Luis' address)
    // replace with your own address for testing to keep your usdc
    // TODO: switch to MG gnosis safe after testing for production: 0xa05188Abb0bcD9c99584e1B8763533aACc3c65BA
    const tx = await usdc.transfer(
      '0xc6Ef1f1C5Bc8B8B9CD1a178a6063bb9212Ce2a8B',
      ethers.utils.parseUnits(amount.toString(), 6),
      {
        maxFeePerGas: ethers.utils.parseUnits('150', 'gwei'),// very agressive gas settings to expedite transfer
        maxPriorityFeePerGas: ethers.utils.parseUnits('120', 'gwei'),
      }
    );
    await tx.wait();

    // call mintflow api to add credits
  }

  return (
    <div className="flex flex-col mx-auto">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="mt-4 flex items-center justify-center rounded-full w-14 h-14 bg-primary bg-opacity-30">
          <MoonIcon className="w-8 h-8 text-primary" />
        </div>
        <h5 className="mt-8 text-base-content">Simply pay as you go</h5>
        <p className="body2 mt-2 text-center text-base-content max-w-sm px-4">
          We offer a simple pricing where you only pay for what you use. One
          click on a gated link equals one view! You can purchase more views at
          any time!
        </p>
      </div>

      <div className="mt-12 mb-6 space-y-6">
        <div className="flex flex-row justify-between items-end">
          <div className="cursor-default flex flex-col items-start">
            <p className="base2 text-base-content opacity-80">
              Your current balance
            </p>
            <p className="h5 text-base-content mt-1">
              {userBalance}
              <span className="text-sm"> views</span>
            </p>
          </div>
          <div className="cursor-default flex flex-col justify-end items-end">
            <p className="h5 text-primary mt-1 text-right items-end">
              ${sliderValue * 0.1 /* change back to 0.1 after testing */}
              <span className="text-sm"> USDC</span>
            </p>
          </div>
          {/* 
          <Button variant="primary">
            Withdraw
          </Button>
          */}
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="range range-primary shadow-elevationLow bg-base-200"
          />
          <p className="mt-2 base1 text-primary">+ {sliderValue} views</p>
        </div>
      </div>
      <Button
        fullWidth
        variant="primary"
        className="mt-4"
        disabled={sliderValue === 0}
        onClick={() => buyCredits(sliderValue * 0.1)}
      >
        Buy credits
      </Button>
    </div>
  );
}
