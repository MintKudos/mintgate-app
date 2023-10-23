import React, { Fragment, useEffect } from 'react';
import { getStaticProps as _getStaticProps } from 'utils/staticProps';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { NFTAvatar } from 'components/NFT/NFTAvatar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NFTSelector({ userNfts, selectedNFT, setSelectedNFT }) {
  // const router = useRouter();
  // Remvoved current Selected NFT from the list
  const userNftList = userNfts;

  // console.log('NFT List', userNftList);
  // console.log('NFT selectedNFT', selectedNFT);

  useEffect(() => {
    if (!selectedNFT && userNftList?.length > 0) {
      const contact = userNftList[0].contract.address;
      const saved = localStorage.getItem('s_' + contact);
      if (saved) {
        const selected = userNftList.find((nft) => nft.tokenId === saved);
        if (selected) {
          setSelectedNFT(selected);
          return;
        }
      }
      // NFT no longer exists
      localStorage.removeItem('s_' + contact);
      // otherwise select the first one
      setSelectedNFT(userNftList[0]);
    }
  }, [userNftList, selectedNFT]);

  if (!selectedNFT) return <p>Loading NFTs...</p>;

  const onChange = (nft) => {
    setSelectedNFT(nft);
    // Remember if the NFT is not the first index, otherwise remove the saved value
    if (nft !== userNftList[0])
      localStorage.setItem('s_' + nft?.contract.address, nft?.tokenId);
    else localStorage.removeItem('s_' + nft?.contract.address);
  };

  // console.log('selectedNFT', selectedNFT);
  return (
    <Listbox value={selectedNFT} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative group w-full pr-4 focus:outline-none">
              <NFTAvatar
                img={
                  selectedNFT?.media?.[0]?.thumbnail ||
                  selectedNFT?.media?.[0]?.gateway ||
                  null
                }
                title={(selectedNFT?.title as string) + ':'}
              />
              {userNftList?.length != 0 && (
                <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-4 w-4 text-base-content opacity-60 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              )}
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full overflow-auto shadow-elevationHigh focus:outline-none space-y-1">
                {userNftList?.map((nft) => (
                  <Listbox.Option
                    key={nft?.tokenId}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-pointer select-none pr-9 w-full'
                      )
                    }
                    value={nft}
                  >
                    {({ active }) => (
                      <>
                        <div className="flex items-center">
                          <NFTAvatar
                            img={
                              nft?.media?.[0]?.thumbnail ||
                              nft?.media?.[0]?.gateway
                            }
                            title={(nft.title as string) + ':'}
                          />
                        </div>

                        {selectedNFT ? (
                          <span
                            className={classNames(
                              active ? 'opacity-100' : 'opacity-0',
                              'absolute inset-y-0 right-0 flex items-center pr-2 text-base-content'
                            )}
                          >
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
