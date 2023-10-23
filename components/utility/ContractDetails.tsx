import React from 'react';
import { getTokenLink } from 'utils/helpers/chainSpecificLinks';

export default function ContractDetails({ tokenId, tokenContract, chainId, profileUrl, token }) {
  return (
    <div className={`mt-4 grid grid-cols-${!!token.total ? '4' : '3'} justify-between`}>
      <a href={profileUrl} title={token?.creator} className="cursor-pointer">
        <div className="flex flex-col justify-start items-start">
          <p className="font-semibold text-base-content text-xl w-full">
            <span className="opacity-50 text-sm">
              Created by:
            </span>
          </p>
          <p className="w-full truncate">{token?.creator}</p>
        </div>
      </a>
      <a
        href={getTokenLink(chainId, tokenContract, tokenId)}
        target="_blank" className="cursor-pointer">
        <div className="flex flex-col justify-start items-start">
          <p className="font-semibold text-base-content text-xl w-full">
            <span className="opacity-50 text-sm">
              Contract
            </span>
          </p>
          <p className="w-full truncate">{tokenContract.slice(0, 6) + '...' + tokenContract.slice(-6)}</p>
        </div>
      </a>
      <a
        href={getTokenLink(chainId, tokenContract, tokenId)}
        target="_blank" className="cursor-pointer">
        <div className="flex flex-col justify-start items-start">
          <p className="font-semibold text-base-content text-xl w-full">
            <span className="opacity-50 text-sm">
              Token ID:
            </span>
          </p>
          <p className="w-full truncate">{tokenId}</p>
        </div>
      </a>
      {!!token.total && (
        <div className="flex flex-col justify-start items-start">
          <p className="font-semibold text-base-content text-xl w-full">
            <span className="opacity-50 text-sm">
              Total Supply:
            </span>
          </p>
          <p className="w-full truncate">{token.total}</p>
        </div>
      )}
    </div>
  );
}
