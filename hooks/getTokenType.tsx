import React from 'react';
import { unlockLink } from 'hooks/Chains/Unlock/unlockLinks';
import { findPOAPMetaData } from 'hooks/Chains/POAP/getPOAP';

export const getTokenType = (t) => {
  let label = t?.symbol ? t?.symbol : t?.address;

  if (t.ttype === 1) {
    return (
      <span>
        <a href={`/projects/${t.address}`}>{label}</a>
        <span className="text-base-content"> (MintGate NFT)</span>
      </span>
    );
  }

  if (t.ttype === 2) {
    return (
      <span>
        <a
          href={`https://app.daohaus.club/dao/${Number.parseInt(
            t.network
          ).toString(16)}/${t.address}`}
        >
          {label}
        </a>{' '}
        <span className="text-base-content">(Moloch Shares)</span>
      </span>
    );
  }

  if (t.ttype === 3) {
    return (
      <span>
        <a href={unlockLink(t.address, t.network, t.id)}>
          key(s) in {t.address}
        </a>{' '}
        <span className="text-base-content">from Unlock</span>
      </span>
    );
  }

  if (t.ttype === 4) {
    const POAPMetaData = findPOAPMetaData(t.address).value;
    return (
      <div>
        <span className="text-base-content">
          POAP for event #{t.address}
          {POAPMetaData && ' - ' + `${POAPMetaData.name}`}
        </span>
      </div>
    );
  }

  if (t.ttype === 721) {
    if (t.network === 1) {
      let address = t.address;
      if (t.address === '0x5407381b6c251cfd498ccd4a1d877739cb7960b8') {
        label = 'NXM';
      } else if (t.subid.indexOf(',') !== -1) {
        let subid = t.subid;
        /*console.log('subid2', subid);*/
        let arraySubid = subid.split(',');
        let subidLinks = arraySubid.map((s) => (
          <a href={`https://rarible.com/token/${t.address}:${s}?tab=details`}>
            <span className="word-wrap">{' ' + `${s}`}</span>
          </a>
        ));
        return [...label, ' with subids ', subidLinks];
      } else
        return (
          <span>
            <a
              href={`https://rarible.com/token/${t.address}:${t.subid}?tab=details`}
            >
              {label}{' '}
              {t.subid != '' || t.subid == null ? `with subid ${t.subid}` : ''}
            </a>{' '}
            <span className="text-base-content">(ERC-721 NFT)</span>
          </span>
        );
    } else
      return (
        <span>
          <a
            href={`https://rarible.com/token/${t.address}:${t.subid}?tab=details`}
          >
            {label}{' '}
            {t.subid != '' || t.subid == null ? `with subid ${t.subid}` : ''}
          </a>{' '}
          <span className="text-base-content">(ERC-721 NFT)</span>
        </span>
      );
  }

  if (t.ttype === 1155) {
    if (t.subid.indexOf(',') !== -1) {
      let subid = t.subid;
      /*console.log('subid2', subid);*/
      let arraySubid = subid.split(',');
      let subidLinks = arraySubid.map((s) => (
        <a href={`https://rarible.com/token/${t.address}:${s}?tab=details`}>
          <span className="word-wrap">{' ' + `${s}`}</span>
        </a>
      ));
      return [...label, ' with subids ', subidLinks];
    } else
      return (
        <span>
          <a
            href={`https://rarible.com/token/${t.address}:${t.subid}?tab=details`}
          >
            {label} {`with subid ${t.subid}`}
          </a>{' '}
          <span className="text-base-content">(ERC-1155 NFT)</span>
        </span>
      );
  }

  if (t.ttype === 20) {
    if (t.network === 1) {
      return (
        <span>
          <a href={`https://coingecko.com/en/coins/${t.address}`}>
            {label}{' '}
            {t.subid != '' || t.subid == null ? `with subid ${t.subid}` : ''}{' '}
          </a>
          <span className="text-base-content">(ERC-20 Token)</span>
        </span>
      );
    }

    if (t.network === 100) {
      return (
        <span>
          <a href={`https://blockscout.com/xdai/mainnet/address/${t.address}`}>
            {label}{' '}
            {t.subid != '' || t.subid == null ? `with subid ${t.subid}` : ''}{' '}
          </a>
          <span className="text-base-content">(ERC-20 Token)</span>
        </span>
      );
    } else {
      return (
        <span>
          {label}{' '}
          {t.subid != '' || t.subid == null ? `with subid ${t.subid}` : ''}{' '}
          <span className="text-base-content">(ERC-20 Token)</span>
        </span>
      );
    }
  } else {
    return <span>{label}</span>;
  }
};
