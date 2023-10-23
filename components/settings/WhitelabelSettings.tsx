import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { getNetworkDisplay, useOvermind } from 'stores/Overmind';
import { Disclosure } from '@headlessui/react';
import { useAsync, useAsyncFn } from 'react-use';
import { setAuthSearchParams } from 'hooks/global/useLoginAction';
import { handleLoadingText } from 'utils/handleLoadingText';
import Button from 'mintflow/Button';
import Input from 'mintflow/Input';
import Modal from 'mintflow/Modal';
import ModalBody from 'mintflow/Modal/ModalBody';
import LoadingAnimationCircle from 'components/utility/LoadingAnimationCircle';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function WhitelableSettings({ defaultBrandName }) {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();
  const [brand, setBrandInfo] = useState<any>();
  const [origin, setOrigin] = useState<string>();
  const [royalty, setRoyalty] = useState<number>();
  const [permissions, setPermissions] = useState<number>();
  const [brandName, setBrandName] = useState<string>();
  const [network, setNetwork] = useState<any>(ostate.network || null);
  const [id, setId] = useState(0);
  const [contract, setContract] = useState<any[]>();
  const [trigger, setTrigger] = useState(false);
  const [reward, setReward] = useState(0);

  const nft_contract = contract?.find(
    (x) => x.network === network && x.ignore !== true
  )?.mod_nft;

  const uid = router.query.uid;
  const activeAccount = ostate.user?.wallets?.address;

  const [userInfoLoader, getUser] = useAsyncFn(async () => {
    if (!ostate.user.uid) return null;
    let url = `${TPP}/api/v2/brand/info?uid=${ostate.user.uid}&jwt=${ostate.user.jwt}`;
    const data = await fetch(url).then((resp) => resp.json());

    //console.log({ data })
    const brand = data.result[0];
    setBrandInfo(brand);
    if (brand?.origin) setOrigin(brand?.origin);
    setRoyalty(brand?.royalty ? brand.royalty / 100 : 0.1);
    if (brand?.permissions) setPermissions(brand?.permissions);
    if (brand?.brandname) setBrandName(brand?.brandname);
    if (brand?.contracts) setContract(brand?.contracts);
    if (brand?.network && Number.parseInt(brand?.network))
      setNetwork(brand?.network);

    setReward(brand?.referral_split_percent || 0);

    setId(brand?.id || 0);

    return brand;
  }, [ostate.user.uid, ostate.user.jwt]);

  if (userInfoLoader.error) console.error(userInfoLoader.error);

  useMemo(getUser, [ostate.user.uid, ostate.user.jwt]); // call at startup

  const domainStatus = useAsync(async () => {
    if (!ostate.user.uid || !ostate.user.jwt) return null;
    if (!brand?.origin) return null;
    let url = `${TPP}/api/v2/brand/domains/${brand.origin}/verify?uid=${ostate.user.uid
      }&jwt=${ostate.user.jwt}&cb=${Math.random()}`;
    const data = await fetch(url).then((resp) => resp.json());
    return data;
  }, [brand?.origin, ostate.user.uid, ostate.user.jwt, brand?.nonce]);

  async function submitData() {
    window.gtag &&
      window.gtag('event', 'action_save_whitelabel', {
        transport_type: 'beacon',
        userId: ostate.user.uid,
      });

    const url = new URL(`${TPP}/api/v2/brand/update`);
    let originStr = origin?.toString().toLowerCase();

    if (reward) {
      if (reward > 100 || reward < 0) {
        alert('Error: Reward must be between 0 and 100');
        return;
      }
    }

    if (!origin) {
      originStr = '';
      // return alert('No origin domain given');
    } else {
      if (originStr.split('.').length <= 2) {
        alert(
          'Error: You must add a top level domains with www [eg: www.tkngate.com] or a subdomain. [eg: mg.tkngate.com]'
        );
        return;
      }
    }
    url.searchParams.set('origin', originStr);
    url.searchParams.set('jwt', ostate?.user?.jwt);
    url.searchParams.set('id', id ? id?.toString() : '0');

    //console.log({ nft_contract });

    let obj = {
      permissions: permissions,
      brandName: brandName || defaultBrandName,
      referral_split_percent: reward || 0,
    };

    // console.log('url', url.href);
    await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((x) => x.json())
      .then(async (r) => {
        if (r && r.status === 'fail') {
          alert('Could not save: ' + r.message);
          throw new Error('could not save settings body');
        }
        console.log('----');

        alert('Your settings are now updated.');
        // getUser();
        console.log('brand?.brandname', brand?.brandname, brandName, origin);
        if (brand?.brandname !== brandName && !origin) {
          window.location.href = setAuthSearchParams(
            new URL(
              window.location.href.replace(
                brand?.brandname?.toLowerCase(),
                brandName.toLowerCase()
              )
            )
          ).href;
        } else window.location.reload();
      });
  }

  const [submitResult, handleSubmit] = useAsyncFn(async () => {
    await submitData();
    setTrigger(true); // in use?
    router.reload();
    return true;
  }, [
    submitData,
    origin,
    royalty,
    permissions,
    brandName,
    // contract,
    ostate?.user?.uid,
    id,
  ]);

  const [delService, deleteSubmit] = useAsyncFn(async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this domain? This will delete your site and self-deployed contract'
      )
    )
      return;

    const url = new URL(`${TPP}/api/v2/brand/delete`);
    url.searchParams.set('jwt', ostate?.user?.jwt);
    url.searchParams.set('uid', ostate?.user?.uid);
    url.searchParams.set('id', id?.toString());

    await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({}),
      },
    }).then((response) => response.json());

    alert('Deleted domain');
    window.location.reload();
  }, [ostate?.user?.uid, ostate?.user?.jwt, id]);

  const loading =
    userInfoLoader.loading || submitResult.loading || delService.loading;

  function onDomainRetry() {
    setBrandInfo((x) => {
      return { ...x, nonce: !x.nonce ? 1 : ++x.nonce };
    });
  }

  return (
    <div className="mt-24 space-y-8">
      <section aria-labelledby="storefront-images">
        <h4 className="text-base-content">Promoter Payouts</h4>
        <p className="mt-2 body1 text-base-content">
          Set aside a percentage of sales to reward your top promoters.
        </p>

        <div className="space-y-4 text-base-content">
          <Modal open={submitResult.loading}>
            <ModalBody className="pb-6 px-4 space-y-6">
              <LoadingAnimationCircle />
              <div className="flex flex-col space-y-2 items-center text-center">
                <h5 className="text-base-content">Saving...</h5>
                {handleLoadingText('referral_update')}
              </div>
            </ModalBody>
          </Modal>

          <>
            <div className="mt-3">
              <Input
                type="number"
                placeholder="10 for 10%"
                variant="primary"
                label="The percentage to distribute between the top 3 weekly referrers"
                labelalt="> 9% recommended, changes takes effect next week"
                step={1}
                min={0}
                max={100}
                name="reward"
                id="reward"
                value={reward}
                onChange={(e) => setReward(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {origin && (
              <div className="col-span-4 sm:col-span-2">
                <Input
                  type="text"
                  variant="primary"
                  key="origin"
                  label="Optional: Custom domain"
                  required
                  name={origin}
                  id="origin"
                  placeholder={'example.com'}
                  value={origin}
                  onChange={(e) =>
                    setOrigin(e.target.value?.replace(/https?: \/\//, ''))
                  }
                  className="w-full"
                />
              </div>
            )}

            {!loading && (
              <div className="flex flex-row space-x-2">
                {brand?.origin && (
                  <div className="flex">
                    <Button
                      variant="warning"
                      id="deleteDomain"
                      disabled={loading}
                      loading={loading}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteSubmit();
                      }}
                    >
                      Delete Domain
                    </Button>
                  </div>
                )}
                <Button
                  id="saveSettings"
                  loading={loading}
                  disabled={loading}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Save Reward Settings
                </Button>
              </div>
            )}

            <div className="mb-8 text-base-content">
              <div className="mt-12">
                {brand?.origin && brand?.origin != null && (
                  <div>
                    <div
                      id="configurationStatus"
                      className="tracking-wide block base1 text-base-content mb-1"
                    >
                      Configuration Status:{' '}
                      {domainStatus.loading ? (
                        'Loading...'
                      ) : domainStatus.value?.status === 'success' ? (
                        <b className="text-green-500">success</b>
                      ) : (
                        <b className="text-red-500">
                          <br />
                          {domainStatus.value?.code?.replace('_', ' ')} (may
                          take a few mintues) -{' '}
                          <a
                            href="#domains"
                            className="underline"
                            onClick={onDomainRetry}
                          >
                            check again?
                          </a>
                        </b>
                      )}
                    </div>
                    <div>
                      {domainStatus.loading ? (
                        'Loading...'
                      ) : domainStatus.value?.status === 'success' ? (
                        <p className="caption1 text-base-content">
                          Your domain has been configured access now at:{' '}
                          <span className="link link-primary">
                            <a href={'https://' + brand?.origin} target="_new">
                              {brand?.origin}
                            </a>
                          </span>{' '}
                        </p>
                      ) : (
                        <div>
                          <p>Oh no! Your configuration did not go through.</p>
                          <ul className="list-decimal pl-4">
                            <li>Check back and refresh in 30 minutes.</li>
                            <li>
                              If you still this message after waiting 30 minutes
                              and refreshing the page, follow Steps One and Two
                              again or reach out to{' '}
                              <b>
                                <a href="mailto:support@mintgate.io">
                                  support@mintgate.io
                                </a>
                              </b>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {origin && (
              <Disclosure
                as="div"
                className="border border-base-300 rounded-box"
              >
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left text-base-content bg-base-200 rounded-lg hover:bg-base-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>
                      How to setup a custom domain{' '}
                      <span className=" text-sm tracking-wide">
                        - Via your domain provider
                      </span>
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-base-content" />
                  </Disclosure.Button>
                  <Disclosure.Panel className="p-2 lg:p-6 space-y-4">
                    <p className="font-sans text-base-content font-semibold tracking-wide">
                      Own a domain
                    </p>
                    <ul className="list-disc ml-6 text-primary">
                      <li>You must first own the domain</li>
                      <li>Root domains must include WWW [www.tkngate.com]</li>
                      <li>Subdomains are allowed [mysite.tkngate.com]</li>
                    </ul>
                    <p className="mt-2 font-sans text-base-content font-semibold tracking-wide">
                      Set up the domain
                    </p>
                    <ul className="list-disc ml-6 text-primary">
                      <li>
                        In the DNS settings, a CNAME Record with the value:{' '}
                        <pre className="font-bold">dns.mintgate.io</pre>
                      </li>
                    </ul>
                    <div className="opacity-none">
                      To learn more in detail, review our{' '}
                      <a
                        className="font-extrabold underline"
                        href="https://mintgate.gitbook.io/mintgate-docs/whitelabel-nft-storefront/set-up-a-whitelabel-nft-storefront"
                      >
                        documentation
                      </a>
                      .
                    </div>
                  </Disclosure.Panel>
                </>
              </Disclosure>
            )}
          </>
        </div>
      </section>
    </div>
  );
}
