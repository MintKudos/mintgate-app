import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { useAsync, useAsyncFn } from 'react-use';
import StorefrontDetails from 'components/settings/StorefrontDetails';
import { Transition } from '@headlessui/react';
import { Disclosure } from '@headlessui/react';
import { KeyIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import Button from 'mintflow/Button';
import WhitelabelSettings from 'components/settings/WhitelabelSettings';
import Input from 'mintflow/Input';
import Textarea from 'mintflow/Textarea';
import PageHero from 'components/general/PageHero';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;
export const fontWeights = ['lighter', 'normal', 'bold'].sort();

export default function settings() {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();
  const [email, setEmail] = useState<string>(null);
  const [emailOpt, setEmailOpt] = useState(false);
  const [wallet, setWallet] = useState<any>({
    address: null,
    address_sig: null,
  });
  const [copyNoticeOpen, setCopyNoticeOpen] = useState(false);

  const userInfoLoader = useAsync(async () => {
    if (!ostate.user.uid || !ostate.user.jwt) return null;

    let url = `${TPP}/api/v2/users/info?uid=${ostate.user.uid}&jwt=${ostate.user.jwt}`;
    const data = await fetch(url).then((resp) => resp.json());
    const user = data.result;

    // setUserInfo(user);
    if (user?.settings) {
      const settings = user?.settings;

      if (settings.emailOpt === true || settings.emailOpt === false)
        setEmailOpt(settings.emailOpt);
    }
    if (user?.wallet) setWallet({ address: user?.wallet });
    setEmail(user?.email);

    return user;
  }, [ostate.user.uid, ostate.user.jwt]);

  async function submitData() {
    if (!email || email.indexOf('@') === -1) {
      alert('Email is required');
      return;
    }

    const url = new URL(`${TPP}/api/v2/users/update`);
    url.searchParams.set('jwt', ostate.user.jwt);
    if (email) url.searchParams.set('email', email);
    if (emailOpt !== null)
      url.searchParams.set('emailOpt', emailOpt.toString());

    if (wallet.address_sig && wallet.address) {
      url.searchParams.set('wallet', wallet.address);
      url.searchParams.set('wallet_sig', wallet.address_sig);
      url.searchParams.set('wallet_sig_ver', wallet.address_sig_ver);
    }

    const updateUser = await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({}),
      },
    })
      .then((response) => response.json())
      .then(async (r) => {
        if (r && r.status === 'fail') {
          alert('Could not save: ' + r.message);
          return null;
        } else {
          return r;
        }
      })
      .catch((e) => {
        alert(e);
        return;
      });

    if (!updateUser) return;

    window.location.href = '/';
  }

  const [submitResult, handleSubmit] = useAsyncFn(async () => {
    if (userInfoLoader.value) await submitData();
  }, [userInfoLoader, ostate.user.creator, email]);

  const loading = userInfoLoader.loading || submitResult.loading;

  useEffect(() => {
    if (ostate.user.loggedIn !== false) return;
    console.warn('Not logged in for Settings page- redirecting to /login');
    router.push('/login?callback=' + encodeURIComponent(window.location.href));
  }, [ostate.user.loggedIn]);

  const SaveButtons = useCallback(
    ({ text }) => {
      return (
        <Button loading={loading} disabled={loading} type="submit">
          {text ? text : 'Save Settings'}
        </Button>
      );
    },
    [loading]
  );

  if (!ostate.user.wallets.address)
    return (
      <main className="bg-base-200 pt-24 pb-8 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-8xl lg:px-8 text-3xl font-semibold">
          Please login...
        </div>
      </main>
    );

  return (
    <main>
      <PageHero Text="Settings" />
      <div className="px-4 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <StorefrontDetails
            email={email}
            setEmail={setEmail}
            SaveButtons={SaveButtons}
            setEmailOpt={setEmailOpt}
            emailOpt={emailOpt}
          />
          {/* 
            {ostate.user.creator &&
              ostate.whitelabel?.brand?.contracts?.length > 0 && (
                <div className="mt-12">
                  <WhitelabelSettings defaultBrandName={name} />
                </div>
              )} */}

          <Disclosure as="div" className="mt-12">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full py-4 px-6 text-sm font-medium text-left border border-base-300 text-base-content bg-base-100 rounded-box hover:shadow-elevationMedium focus:outline-none focus:shadow-mg">
                  <div>
                    <div className="flex flex-wrap items-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-box bg-primary bg-opacity-10">
                        <KeyIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <h3 className="base1 text-base-content">
                          API Token & User ID
                        </h3>
                        <p className="caption1 text-base-content opacity-60">
                          Utilize your API token to access MintGate data APIs
                          and plugin API
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={`${
                      open ? 'transform rotate-180' : ''
                    } w-6 h-6 text-primary`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-base-content">
                  <div className="relative">
                    <p className="mt-2 body2 text-base-content">
                      This API key allows you to utilize{' '}
                      <a className="text-primary" href="https://mgate.io/docs/">
                        MintGate's APIs
                      </a>{' '}
                      and widgets for direct integration and data access. For
                      more information, check out the developer docs{' '}
                      <a
                        className="text-primary"
                        href="https://mintgate.gitbook.io/mintgate-docs/direct-integrations/direct-integrations"
                      >
                        here
                      </a>
                    </p>
                  </div>
                  <main>
                    <section className="mt-6" aria-labelledby="contact-heading">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1 flex flex-col space-y-4">
                          <Textarea
                            label="Your API token. KEEP THIS TOKEN SECRET!"
                            id="jwtapi"
                            name="jwtapi"
                            value={ostate.user.jwtapi}
                            className="w-full h-32"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(ostate.user.jwtapi);
                              if (setCopyNoticeOpen) setCopyNoticeOpen(true);
                            }}
                            className="mt-2"
                          >
                            Copy Token
                          </Button>
                        </div>
                        <div className="col-span-1 flex flex-col space-y-4">
                          <Input
                            label="Your User ID"
                            variant="primary"
                            id="jwtapi"
                            name="jwtapi"
                            value={ostate.user.uid}
                            className="w-full"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(ostate.user.uid);
                              if (setCopyNoticeOpen) setCopyNoticeOpen(true);
                            }}
                          >
                            Copy ID
                          </Button>
                        </div>
                      </div>
                    </section>
                  </main>
                </Disclosure.Panel>
                <Transition
                  show={copyNoticeOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-250"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <div className="w-full flex justify-end">
                    <div className="max-w-sm w-full bg-base-100 rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-primary"
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-primary">
                              Copied successfully!
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex">
                            <div
                              onClick={() => setCopyNoticeOpen(false)}
                              className="rounded-md inline-flex text-base-content hover:text-base-content opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <span className="sr-only">Close</span>
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </>
            )}
          </Disclosure>
        </form>
      </div>
    </main>
  );
}
