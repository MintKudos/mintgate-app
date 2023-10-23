import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Avatar from 'mintflow/Avatar';
import { getOwnedNFTs } from 'hooks/whitelabel/getContractData';
import { State, useOvermind } from 'stores/Overmind';
import ALink from 'components/ALink';
import { Reorder, DragControls, useDragControls } from 'framer-motion';
import { useMedia } from 'react-use';
import { UserSearchbar } from 'components/utility/UserSearchbar';

export default function TokensList({ chain, owner_address, small }) {
  const { state: ostate } = useOvermind();
  const collections = getOwnedNFTs(owner_address, chain);
  const userCollections: any[] = collections?.data?.communities;

  const [contractAddress, setAddr] = useState<string>(null);

  const [collectionList, setCollectionList] = useState<any[]>([]);
  const router = useRouter();
  const showControl = useMedia('only screen and (max-width: 1000px)', false);
  const netKey = ostate.network === 1 ? '' : ostate.network?.toString();
  const dragControls = useDragControls();

  useEffect(() => {
    setCollectionList([]);
  }, [netKey]);

  useEffect(() => {
    setAddr(router.asPath.split('/')[3]);
  }, [router]);

  // Set inital list order
  useEffect(() => {
    if (!userCollections?.length) return;
    if (collectionList.length > 0) return; // only run once
    // console.log('userCollections', userCollections);

    const saved = localStorage.getItem('token_lists' + netKey);
    const savedArr: string[] = saved ? JSON.parse(saved) : [];
    // console.log('saved', savedArr);

    const collectionCopy = [...userCollections];
    collectionCopy.sort((a, b) => {
      if (!saved) return 0;

      const aSavedIdx = savedArr?.findIndex((x) => x === a.tokenId);
      const bSavedIdx = savedArr?.findIndex((x) => x === b.tokenId);

      return aSavedIdx - bSavedIdx;
    });

    window.localStorage.setItem(
      'token_lists' + netKey,
      JSON.stringify(collectionCopy.map((x) => x.tokenId))
    );

    setCollectionList(collectionCopy);
  }, [userCollections, collectionList, netKey]);

  const handleReorder = useCallback(
    (list) => {
      setCollectionList(list);
      window.localStorage.setItem(
        'token_lists' + netKey,
        JSON.stringify(list.map((x) => x.tokenId))
      );
    },
    [netKey]
  );

  // useEffect(() => {
  //   const data = window.localStorage.getItem('token_list2');
  //   if (!!data) setCollectionList(JSON.parse(data));
  // }, []);

  if (!collectionList || collectionList?.length === 0) return null;
  // console.log('collectionList', collectionList);
  return (
    <div className="relative">
      {!small && (
        <div className="pt-6 pb-1">
          <p className="base2 text-base-content opacity-60">Your Communities</p>
        </div>
      )}
      <div className="block md:hidden py-2">
        <UserSearchbar
          openNewWindow={false}
          popover={false}
          text="Search collections"
          clickToFollow={false}
        />
      </div>
      {userCollections && (
        <Reorder.Group
          axis="y"
          values={collectionList}
          onReorder={handleReorder}
          className="relative flex flex-col mt-4 space-y-4 pb-8 h-full"
        >
          {collectionList?.map((collection) => (
            <Reorder.Item
              key={collection.address + '_' + collection.name}
              value={collection}
              dragControls={dragControls}
              dragListener={showControl ? false : true}
            >
              <CollectionResult
                showDrag={true}
                showControl={showControl}
                small={small}
                collection={collection}
                network={ostate.network}
                contractAddress={contractAddress}
                dragControls={dragControls}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}

interface Props {
  dragControls: DragControls;
}

export function CollectionResult({
  small,
  collection,
  network,
  showDrag = false,
  contractAddress = null,
  showControl = false,
  dragControls = null as DragControls,
  ...props
}) {
  return (
    <div
      className="group flex flex-row justify-between items-center w-full"
      {...props}
    >
      <ALink
        className={`block cursor-pointer group transition transform ${
          !small ? 'hover:scale-105' : 'hover:scale-120'
        } ease-in-out duration-200`}
        title={collection.name}
        href={'/feed/' + network + '/' + collection.address}
      >
        <div className="flex flex-row items-center space-x-4">
          <Avatar
            src={collection.opensea?.imageUrl}
            shape="square"
            border={contractAddress === collection.address}
            borderColor="base-content"
            size="sm"
          />
          {small === false && (
            <p
              className={`base2 truncate ${
                contractAddress === collection.address
                  ? 'text-primary'
                  : 'text-base-content opacity-80 group-hover:text-primary group-hover:opacity-100'
              } `}
            >
              {collection.name}
            </p>
          )}
        </div>
      </ALink>
      {showDrag && (
        <div className="hidden md:group-hover:block cursor-grab opacity-60">
          <ReorderIcon dragControls={dragControls} />
        </div>
      )}
      {showControl && dragControls && (
        <div className="block md:hidden cursor-grab">
          <ReorderIcon dragControls={dragControls} />
        </div>
      )}
    </div>
  );
}

export function ReorderIcon({ dragControls }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 39"
      width="12"
      height="12"
      onPointerDown={(event) => dragControls.start(event)}
    >
      <path
        d="M 5 0 C 7.761 0 10 2.239 10 5 C 10 7.761 7.761 10 5 10 C 2.239 10 0 7.761 0 5 C 0 2.239 2.239 0 5 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 0 C 21.761 0 24 2.239 24 5 C 24 7.761 21.761 10 19 10 C 16.239 10 14 7.761 14 5 C 14 2.239 16.239 0 19 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 0 C 35.761 0 38 2.239 38 5 C 38 7.761 35.761 10 33 10 C 30.239 10 28 7.761 28 5 C 28 2.239 30.239 0 33 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 14 C 35.761 14 38 16.239 38 19 C 38 21.761 35.761 24 33 24 C 30.239 24 28 21.761 28 19 C 28 16.239 30.239 14 33 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 14 C 21.761 14 24 16.239 24 19 C 24 21.761 21.761 24 19 24 C 16.239 24 14 21.761 14 19 C 14 16.239 16.239 14 19 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 5 14 C 7.761 14 10 16.239 10 19 C 10 21.761 7.761 24 5 24 C 2.239 24 0 21.761 0 19 C 0 16.239 2.239 14 5 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 5 28 C 7.761 28 10 30.239 10 33 C 10 35.761 7.761 38 5 38 C 2.239 38 0 35.761 0 33 C 0 30.239 2.239 28 5 28 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 28 C 21.761 28 24 30.239 24 33 C 24 35.761 21.761 38 19 38 C 16.239 38 14 35.761 14 33 C 14 30.239 16.239 28 19 28 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 28 C 35.761 28 38 30.239 38 33 C 38 35.761 35.761 38 33 38 C 30.239 38 28 35.761 28 33 C 28 30.239 30.239 28 33 28 Z"
        fill="#CCC"
      ></path>
    </svg>
  );
}
