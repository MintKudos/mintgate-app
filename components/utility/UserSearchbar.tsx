import React, { useState, useEffect, Fragment } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useDebounce } from 'react-use';
import { Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { handleFollow } from 'components/profile/profileComponents/followButtons';
import LoadingAnimationCircle from './LoadingAnimationCircle';
import { getOwnedNFTs } from 'hooks/whitelabel/getContractData';
import { CollectionResult } from 'components/general/TokensList';

export const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

// async function onSearch(searchFor) {
//   if (!searchFor) return null;
//   return await fetch(
//     `${TPP}/api/v2/users/search?query=` + encodeURIComponent(searchFor)
//   ).then((res) => res.json());
// }

function searchFor(collection: any[], search: string) {
  if (!search) return null;

  const is721 = search.indexOf('721') > -1;
  const is1155 = search.indexOf('1155') > -1;

  search = search.replace('721', '').replace('1155', '').trim();

  const matchesName = collection
    .filter((x) => x.name?.toLowerCase().includes(search))
    .map((x) => x.address);
  const matchesAddress = collection
    .filter((x) => x.address?.toLowerCase().includes(search))
    .map((x) => x.address);
  const matchesOSAddress = collection
    .filter((x) => x.opensea?.collectionName?.toLowerCase().includes(search))
    .map((x) => x.address);

  const matchesSymbol = collection
    .filter((x) => x.symbol?.toLowerCase() === search)
    .map((x) => x.address);

  const matches = new Set([
    ...matchesName,
    ...matchesAddress,
    ...matchesOSAddress,
    ...matchesSymbol,
  ]);

  return collection
    .filter((x) => matches.has(x.address))
    .filter((x) => (!is721 ? true : x.tokenType === 'ERC721'))
    .filter((x) => (!is1155 ? true : x.tokenType === 'ERC1155'));
}

export function UserSearchbar({ openNewWindow, popover, text, clickToFollow }) {
  const { state: ostate } = useOvermind();
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState<any[]>(null);

  const collections = getOwnedNFTs(
    ostate.user.wallets.address,
    ostate.user.wallets.network
  );
  const userCollections: any[] = collections?.data?.communities;

  // const [mounted, setMounted] = useState(false); // fix for SSR

  // useEffect(() => {
  //   setMounted(true); // fix for SSR
  // }, []);

  const db = useDebounce(
    async () => setResults(searchFor(userCollections, search)),
    500,
    [search]
  );

  // if (results) console.log(results);

  function onChange(e) {
    const searchFor = e.target.value;
    setSearch(searchFor?.toLowerCase());
  }

  return (
    <div>
      <Popover>
        <div className="flex flex-1 w-full max-w-xs justify-start">
          <div className="w-full ">
            <label htmlFor="search" className="sr-only">
              Search projects
            </label>
            <div className="-ml-2 relative rounded-box bg-opacity-0 focus-within:text-base-content">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-4 w-4 z-10"
                  aria-hidden="true"
                />
              </div>
              <input
                autoComplete="off"
                type="search"
                id="search"
                name="search"
                className="block w-full rounded-box py-2 pl-10 pr-3 leading-5 text-base-content text-opacity-60 bg-base-200 bg-opacity-60 backdrop-blur-xl focus:text-base-content focus:outline-none focus:ring-0 sm:text-sm"
                placeholder={text ? text : 'Search username or wallet'}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <Transition
          show={search?.length > 0}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className={`${
              popover
                ? '-ml-2 mt-4 bg-base-100 bg-opacity-80 backdrop-blur-2xl absolute z-10 w-screen p-4 transform rounded-box shadow-elevationHigh border border-base-300 border-opacity-80 lg:max-w-lg overflow-auto'
                : 'bg-base-100'
            }`}
          >
            {search?.length > 0 && results == null && (
              <LoadingAnimationCircle />
            )}
            {results && results.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center py-8">
                <p className="title">no results</p>
              </div>
            ) : (
              <div className="pt-4 md:pt-0 w-full grid grid-cols-1 gap-5 overflow-visible">
                {results &&
                  results.map((result) => {
                    return (
                      <CollectionResult
                        showDrag={false}
                        onClick={() => setSearch(null) as any}
                        small={false}
                        collection={result}
                        network={ostate.network}
                      />
                    );
                  })}
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
