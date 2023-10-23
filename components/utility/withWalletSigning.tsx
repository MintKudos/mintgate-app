import { memo, useCallback, useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { storageGet, storageSet, storageRemove } from 'stores/storage';
import { json } from 'overmind';
import { ethers } from 'ethers';
import { useProvider } from './withWallet';
import { useAsync } from 'react-use';
import { useRouter } from 'next/router';

import Modal from 'mintflow/Modal';
import ModalHeader from 'mintflow/Modal/ModalHeader';
import ModalBody from 'mintflow/Modal/ModalBody';
import { SignalIcon, WalletIcon } from '@heroicons/react/24/solid';
import ModalActions from 'mintflow/Modal/ModalActions';
import Button from 'mintflow/Button';

export function SignModal() {
  const { state: ostate, actions } = useOvermind();
  const [signMessage, setSignMessage] = useState<boolean>(false);

  const sign = useRequireSigning();

  useEffect(() => {
    if (!ostate.user.wallets.provider) return;

    if (!ostate.user.wallets.signature_login) setSignMessage(true);
    else setSignMessage(false);
  }, [ostate.user.wallets.signature_login, ostate.user.wallets.provider]);

  return (
    <Modal open={signMessage}>
      <ModalBody className="flex flex-col items-center space-y-4 px-8 pt-10 pb-10">
        <div className="w-14 h-14 bg-primary bg-opacity-30 p-2 rounded-full">
          <SignalIcon className=" text-primary" />
        </div>
        <h6>Verify your account</h6>
        <p className="body1 text-center max-w-xs opacity-60">
          To finish connecting, you must sign a message in your wallet to verify
          that you are the owner of this account.
        </p>
      </ModalBody>
      <ModalActions className="flex flex-col space-y-2 space-x-0 justify-center items-center w-full">
        <Button variant="primary" onClick={() => sign()}>
          Sign Message
        </Button>
        <Button variant="nav" onClick={() => window.location.reload()}>
          Cancel
        </Button>
      </ModalActions>
    </Modal>
  );
}

export function useRequireSigning() {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();
  const provider = useProvider();

  // Prompt to sign on provider
  return useCallback(() => {
    const address = ostate.user.wallets.address;

    if (!provider) return;
    if (!address || !ostate.user.wallets.network) return; // wait until we have address
    // if (ostate.user.wallets.signature_login) return; // already signed

    // NO LONGER NEEDED -JD 8/1/2022
    // if (provider?.isMetaMask)
    //   alert('Please provide your signature to prove wallet ownership.');

    getWalletSig(provider)
      .then((getSig) => {
        if (!getSig?.signature) {
          alert('Could not create signature- please report @mintgate_io');
          throw new Error('Could not create signature');
        }
        actions.updateWalletSig({
          signature: getSig.signature,
          ver: getSig.ver,
          network: ostate.user.wallets.network,
          address: address,
          provider: provider,
        });
        console.log('updateWalletSig');
      })
      .finally(() => {
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
      });
  }, [!!provider, ostate.user.wallets.address]);
}

async function getWalletSig(provider) {
  const _msg = `Mintgate.io requests a cryptographic signature is used to verify your account.`;

  var signature = null;
  if (!provider) return null;
  if (provider.enable) await provider.enable();

  if (provider.signature) return { signature: provider.signature, ver: '1.1' };

  const provider3 = new ethers.providers.Web3Provider(provider);
  const signer = provider3.getSigner();
  let authType = '0';

  const msg = { msg: _msg };

  try {
    // const domain = { name: 'MintGate', version: '1' }; // , chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
    // const types = { MSG: [{ name: 'msg', type: 'string' }] };

    console.log('trying to sign');

    //try {
    signature = await signer.signMessage(msg.msg);
    authType = '0';
    // } catch (e) {
    //   console.log('signMessage failed', e);
    //   signature = await signer._signTypedData(domain, types, msg);
    //   authType = 1;
    // }
    //
    console.log('signed using authtype: ' + authType);
  } catch (e) {
    console.error(e);
    alert('Failed to generate signature');
    window.location.reload();
    throw e;
  }

  return { signature, ver: authType };
}
