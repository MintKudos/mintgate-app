import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import ALink from 'components/ALink';
import Button from 'mintflow/Button';

export default function Guide({ loggedIn, usdPrice, openWallet, account }) {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <Button
        variant="nav"
        onClick={() => setGuideOpen(true)}
        className="col-span-2 justify-start"
        startIcon
      >
        <QuestionMarkCircleIcon className="w-5 h-5" />
        How to purchase an NFT
      </Button>

      <Transition.Root show={guideOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-30"
          onClose={() => setGuideOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-base-100/60" />
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-base-100 border-l-2 border-base-200 pb-6 shadow-xl ">
                    <div className="bg-base-300 py-8 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-bold text-base-content">
                          {' '}
                          How to buy an NFT guide.
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="text-base-content/60 hover:text-base-content focus:outline-none"
                            onClick={() => setGuideOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-base-content/60">
                          Learn how to buy your first NFT.
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div>
                        <p className="text-sm text-base-content/50">Setp 1</p>
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-base-content sm:text-2xl">
                            Setup a Crypto Wallet
                          </h3>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                        <ALink
                          target="_blank"
                          href="https://metamask.io/download/"
                          title="Intsall Metamask"
                        >
                          <button
                            type="button"
                            className="btn bg-orange-500 border-orange-500 text-base-content hover:text-primary-content px-4 py-3 w-full flex"
                          >
                            Download Metamask
                          </button>
                        </ALink>
                      </div>

                      <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                        <dl className="mt-6 space-y-8 sm:space-y-6">
                          <div>
                            <dt className="text-sm font-medium text-base-content sm:max-w-md sm:flex-shrink-0">
                              What is a crypto wallet?
                            </dt>
                            <dd className="mt-1 text-sm text-base-content/70 sm:col-span-2">
                              Crypto wallets store your private keys, keeping
                              your crypto safe and accessible. They also allow
                              you to send, receive, and spend cryptocurrencies
                              such as Ethereum and Matic, and NFTs.
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-base-content sm:max-w-md sm:flex-shrink-0">
                              How do you use a crypto wallet?
                            </dt>
                            <dd className="mt-1 text-sm text-base-content/70 sm:col-span-2">
                              Metamask will give you the option to Import
                              Wallet, or you can Create a Wallet. Click on
                              Create a Wallet to register a new wallet. Now it’s
                              time to save the secret recovery phrase. You can
                              uncover the secret phrase and download it as a
                              text file. After that, you are ready to log in and
                              start your crypto journey!
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {!loggedIn && (
                        <>
                          <div className="mt-8">
                            <p className="text-sm text-base-content/50">
                              Setp 2
                            </p>
                            <div className="flex items-center">
                              <h3 className="text-xl font-bold text-base-content sm:text-2xl">
                                Login to the application
                              </h3>
                            </div>
                          </div>
                          <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                            <Button
                              variant="primary"
                              onClick={openWallet}
                              fullWidth
                            >
                              Login to buy
                            </Button>
                          </div>

                          <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                            <dl className="mt-6 space-y-8 sm:space-y-6">
                              <div>
                                <dt className="text-sm font-medium text-base-content/60 sm:max-w-md sm:flex-shrink-0">
                                  What is connecting a wallet?
                                </dt>
                                <dd className="mt-1  sm:col-span-2">
                                  <p className="text-sm text-base-content/50">
                                    Log in into this app means that you have to
                                    connect your crypto wallet. This will
                                    automatically create your accunt. No
                                    password.
                                  </p>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </>
                      )}

                      <div className="mt-8">
                        <p className="text-sm text-base-content/50">
                          {!loggedIn ? 'Step 3' : 'Step 2'}
                        </p>
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-base-content sm:text-2xl">
                            Get USDC or buy with Card
                          </h3>
                        </div>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-3 w-full">
                        <ALink
                          target="_blank"
                          href={`https://widget.wert.io/01FJ1SB6GP1QC272AM88CDMQV0/redirect?commodity=USDC&currency_amount=${
                            usdPrice > 5 ? usdPrice : 10
                          }&currency=USD&address=${account}`}
                          title="Buy Matic"
                        >
                          <Button variant="primary" fullWidth>
                            Buy USDC
                          </Button>
                        </ALink>
                      </div>

                      <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                        <dl className="mt-6 space-y-8 sm:space-y-6">
                          <div>
                            <dt className="text-sm font-medium text-base-content sm:max-w-md sm:flex-shrink-0">
                              What is USDC?
                            </dt>
                            <dd className="mt-1 text-sm text-base-content/60 sm:col-span-2">
                              USDC is a cryptocurrency that is stable in its
                              value to the USD. You use it to purchase NFTs on
                              the platform. You can buy or sell USDC via
                              exchanges like Coinbase.
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-base-content sm:max-w-md sm:flex-shrink-0">
                              Why do I need USDC?
                            </dt>
                            <dd className="mt-1 text-sm text-base-content/60 sm:col-span-2">
                              USDC serves as a native currency to buy and sell
                              NFTs on our platform.
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
