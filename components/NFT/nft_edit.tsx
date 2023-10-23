import React, { useEffect, useState, useMemo } from 'react';
import { useOvermind } from 'stores/Overmind';
import { Dialog } from '@headlessui/react';
import DropdownFormLayout from 'components/utility/react/DropdownFormLayout';
import { useAsyncFn } from 'react-use';
import Button from 'mintflow/Button';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
// import { useBalanceCheck } from 'hooks/getBalance';
import { TIER_VARIANTS } from 'mintflow/Tiercard/Tiercard';
import Drawer from 'mintflow/Drawer';

export default function NFTEdit({ token, tiers }) {
  const { state: ostate } = useOvermind();
  // const gatedContent = link.value?.result?.length || 0;
  const [addContent, setAddContentOpen] = useState(false);
  const [addNewRecipientOpen, setAddNewRecipientOpen] = useState(false);
  const [pageInfo, setpageInfo] = useState(token);
  const [inputtedAddress, setInputtedAddress] = useState(
    token?.minting_info?.payment_address || token?.minting_info?.creator_address
  );
  const [recipientDisplay, setRecipientDisplay] = useState<string>();
  // const [balance] = useBalanceCheck(token);

  // check whitelable premissions

  useEffect(() => {
    setRecipientDisplay(
      `${
        'Sales currently sent here:' +
          ' ' +
          token.minting_info?.payment_address ||
        token.minting_info?.creator_address
      }`
    );
  }, [
    token.minting_info?.payment_address,
    token.minting_info?.creator_address,
  ]);

  const customRecipientInputs = [
    {
      name: 'address',
      type: 'text',
      placeholder: 'e.g. 0x123abc...',
      message: 'Sales for this NFT will go to this address:',
      defaultValue: inputtedAddress,
    },
  ];

  const tierItems = useMemo(() => {
    return [0, 1, 2, 3].map((_, i) => ({
      d: '',
      v: i === 0 ? 1 : -1,
      title: TIER_VARIANTS[i],
      ...tiers?.[i],
    }));
  }, [tiers]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputtedAddress(e.target.value);
  };

  function displayInfo(recipientDisplay) {
    return (
      <div className="w-1/2">
        <p className="caption-small tracking-wider text-base-content my-2">
          {recipientDisplay}
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="static flex flex-col space-y-4 items-center">
          {!!ostate.user.creator ? (
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setAddContentOpen(true)}
              startIcon
            >
              <PlusIcon className="w-5 h-5" />
              Add Content
            </Button>
          ) : null}
        </div>

        <Dialog
          open={addNewRecipientOpen}
          onClose={() => setAddNewRecipientOpen(false)}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen md:px-8 lg:px-0">
            <Dialog.Overlay className="fixed inset-0 bg-base-100 backdrop-blur-md bg-opacity-30 cursor-pointer" />
            <div className="relative bg-base-100 border border-base-300 shadow-mg pt-14 md:pt-8 w-full h-full min-h-screen md:h-auto md:min-h-0 md:max-w-3xl md:rounded-box p-8">
              <div className="block absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setAddNewRecipientOpen(false)}
                  type="button"
                  className="rounded-md text-base-content opacity-80 hover:opacity-100 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}
