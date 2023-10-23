import useSWR, { preload } from 'swr';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export const getContractOwners = (contract: string, chain: number) => {
  return useSWR(
    contract &&
      chain &&
      `${TPP}/api/v2/data/contractNftOwners?contract_address=${contract}&chain=${chain}`,
    (url) => fetch(url).then((resp) => resp.json()),
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};

export const getOwnedNFTs = (
  owner_address: string,
  chain: number,
  contract?: string
) => {
  const addContract = contract ? `&contract=${contract}` : '';
  return useSWR(
    owner_address &&
      chain &&
      `${TPP}/api/v2/data/ownedNFTs?owner_address=${owner_address}&chain=${chain}${addContract}`,
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};

export const getContractData = (contract: string, chain: number) => {
  return useSWR(
    contract &&
      chain &&
      `${TPP}/api/v2/data/getContractMetadata?contract_address=${contract}&chain=${chain}`,
    (url) => fetch(url).then((resp) => resp.json()),
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};

export const getNftData = (contract: string, id: string, chain: number) => {
  return useSWR(
    contract &&
      id &&
      `${TPP}/api/v2/data/alchemy_fetch?chain=${chain}&action=getNFTMetadata&msg=${encodeURIComponent(
        `?contractAddress=${contract}&tokenId=${id}&refreshCache=false`
      )}`,
    (url) => fetch(url).then((resp) => resp.json()),
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};

export const getContractMetadataPreload = (contract: string, chain: number) => {
  if (typeof window === 'undefined') return;

  preload(
    contract &&
      chain &&
      `${TPP}/api/v2/data/getContractMetadata?contract_address=${contract}&chain=${chain}`,
    (url) => fetch(url).then((resp) => resp.json())
  );
};

if (typeof window !== 'undefined') {
  const url = window.location.pathname.split('/');

  if (url[1] === 'feed' && Number.parseInt(url[2] && url[2]))
    getContractMetadataPreload(url[4], Number.parseInt(url[2]));
}
