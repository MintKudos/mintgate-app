import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useProvider } from './withWallet';
import { ethers } from 'ethers';
import { getNativeBal } from 'utils/helpers/getAccountBal';
import { useOvermind } from 'stores/Overmind';
import { useAsync } from 'react-use';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ALink from 'components/ALink';
import Button from 'mintflow/Button';
import Modal from 'mintflow/Modal';
import ModalBody from 'mintflow/Modal/ModalBody';
import ModalHeader from 'mintflow/Modal/ModalHeader';
import Input from 'mintflow/Input';
import thirdwebv21155 from '../../abi/thirdwebV21155.json';

export default function TransferNFT({ token, balance }) {
  // const [previewOpen, setPreviewOpen] = useState(false);
  const { state: ostate, actions } = useOvermind();
  const [amount, setAmount] = useState(1);
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState({
    active: false,
    type: null,
  });
  const provider = useProvider();

  const contract = token?.minting_info?.contract;
  const tokenId = token?.minting_info?.token_id;
  const account = ostate.user?.wallets?.address;

  const getNativeBalance = useAsync(async () => {
    return await getNativeBal(account, ostate.network);
  }, [account, ostate.network]);
  const nativeBalance = getNativeBalance?.value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!provider) return;
    if (!nativeBalance) return;
    if (amount < 1) {
      alert('Quantity cannot be less than one.');
      return;
    }
    if (amount > balance) {
      alert('Quantity cannot be more than you own.');
      return;
    }
    if (!destination.includes('0x')) {
      alert('Please add a destination address');
      return;
    }

    const editionModule = new ethers.Contract(
      contract,
      thirdwebv21155
      //provider
    );

    try {
      setLoading({
        active: true,
        type: 'transfer',
      });
      const transfer = await editionModule.transfer(
        destination,
        tokenId,
        amount
      );
      if (transfer.receipt.transactionHash) {
        setLoading({
          active: true,
          type: 'transfer_complete',
        });
        window.location.reload();
      } else throw new Error(`Transfer error: ${transfer}`);
    } catch (error) {
      alert(`There was an error: ${error}`);
    }
  };

  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleVisible}
        startIcon
        circle
      >
        <PaperAirplaneIcon className=" w-5 h-5 text-base-content" />
      </Button>
      <Modal
        open={visible}
        onClickBackdrop={toggleVisible}
        className="max-w-md"
      >
        <Button
          variant="nav"
          className="absolute top-4 right-4 focus:outline-none outline-none"
          onClick={toggleVisible}
        >
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
        <ModalHeader className="flex flex-col items-center w-full">
          <div className="mt-4 flex flex-col items-center justify-center rounded-full w-16 h-16 bg-primary bg-opacity-30">
            <PaperAirplaneIcon className="w-10 h-10 text-primary" />
          </div>
          <h5 className="mt-8 text-base-content mx-auto">
            Transfer your Access
          </h5>
          <p className="body2 mt-2 text-center text-base-content opacity-80 max-w-sm px-4">
            Send this access pass to another crypto wallet. Make sure to input a
            correct address, the transaction cannot be undone once successfully
            completed!
          </p>
        </ModalHeader>

        <ModalBody className="px-4 pb-6">
          <div className="relative flex flex-col items-center justify-center w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full space-y-2">
                <Input
                  min="1"
                  max="80000"
                  label="Quantity"
                  labelWarning="Quantity cannot be more than what you hold."
                  variant={amount > balance ? 'warning' : 'primary'}
                  type="number"
                  id="amount"
                  key="amount"
                  value={amount}
                  placeholder="Enter amount to send"
                  className="w-full"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <Input
                  type="text"
                  id="destination"
                  key="destination"
                  name="destination"
                  label="Address:"
                  value={destination}
                  variant="primary"
                  placeholder="e.g. 0x2fa7..."
                  className="w-full"
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>
              {destination && (
                <label className="label">
                  <span className="label-text-alt text-primary">
                    Please confirm the address is correct.
                  </span>
                </label>
              )}
              {!!nativeBalance && (
                <Button
                  variant="primary"
                  fullWidth
                  type="submit"
                  className="mt-6"
                >
                  Transfer Access Pass
                </Button>
              )}
            </form>
            {!nativeBalance && (
              <ALink
                target="_blank"
                href={`https://widget.wert.io/01FJ1SB6GP1QC272AM88CDMQV0/redirect?commodity=MATIC&currency_amount=${5}&currency=USD&address=${account}`}
                title="Top up your Wallet"
              >
                <Button
                  variant="primary"
                  fullWidth
                  className="text-primary-content mt-2"
                >
                  Top up Wallet & Reload to Transfer
                </Button>
              </ALink>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
