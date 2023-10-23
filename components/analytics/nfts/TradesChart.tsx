import React from 'react';
import { useAsync } from 'react-use';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { useOvermind } from 'stores/Overmind';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function TransfersNFT({
  contract_address,
  token_id,
  network,
  titleName,
}) {
  const { state: ostate, actions } = useOvermind();
  titleName = titleName || 'Transfers';

  const transferNFTObj = useAsync(async () => {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contract_address: contract_address,
        token_id: token_id,
        chain: network,
      }),
    };

    const data = await fetch(`${TPP}/api/v2/data/nftTransfers`, requestOptions)
      .then((response) => response.json())
      .catch((e) => {
        alert(e);
      });

    if (data && data.result && data.result.length === 0) return null;

    // console.log('data', data);
    return data;
  }, [contract_address, token_id, network]);

  const transfers = transferNFTObj?.value;

  return (
    <div className="mt-5 w-full">
      <div
        id="tradesCard"
        className="relative bg-blue-200 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
      >
        <div className="flex flex-row space-x-1">
          <div className="bg-white rounded-lg h-1/2 py-2 px-2 my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#0071ff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <div>
            <dt>
              <p className="ml-6 text-xl uppercase tracking-wider font-medium text-gray-500 truncate">
                {titleName}
              </p>
            </dt>
            <dd className="ml-6 mb-4 flex mt-2 items-baseline">
              <p className="text-5xl font-semibold text-base-content">
                {transfers?.result?.total}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-blue-100 py-4">
                <div className="text-sm ml-10">
                  <a
                    href="#"
                    className="font-medium text-gray-500 hover:text-indigo-500"
                  >
                    {' '}
                    View all<span className="sr-only"> {titleName} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
