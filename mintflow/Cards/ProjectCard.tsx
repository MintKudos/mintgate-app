import React from 'react';
import { useOvermind } from 'stores/Overmind';
import CardImage from './utils/CardImage';
import PinNFT from 'components/utility/pinNFTs';
import HideButton from 'components/utility/hideButton';
import ALink from 'components/ALink';
import Button from 'mintflow/Button';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function ProjectCard({ token }) {
  const { state: ostate, actions } = useOvermind();
  const unlockables = token?.unlocks || 0;

  return (
    <div key={'card_' + token?.id || token?.tid}>
      <ALink
        href={`/projects/${token?.to_tid || token?.tid}`}
        title={token?.name}
      >
        <div className="cursor-pointer border border-base-300 rounded-box hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300">
          <div className="group h-full bg-base-100 rounded-box">
            <div className="absolute w-full h-full rounded-box flex items-center justify-center transition-all ease-in-out duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-base-200/20">
              <Button
                variant="neutral"
                circle
                className="px-4 transform group-hover:translate-x-4"
              >
                <ArrowRightIcon className="w-12 h-12" />
              </Button>
            </div>
            <CardImage
              token={token}
              className="object-contain w-full h-full rounded-t-box "
            />
          </div>
          <div className="px-4 py-6 w-full justify-between">
            <h6 className="title text-base-content">{token?.name}</h6>
            <p className="mt-2 body2 text-base-content opacity-60">
              {token?.description?.slice(0, 300)}
            </p>
          </div>
        </div>
      </ALink>
      {ostate.user.creator ? (
        <div className="pt-4 flex flex-row justify-between items-center">
          <PinNFT token={token} />
          <HideButton token={token} />
        </div>
      ) : null}
    </div>
  );
}
