import React from 'react';
import Button from 'mintflow/Button';
import CardImage from './utils/CardImage';
import ALink from 'components/ALink';
import PinNFT from 'components/utility/pinNFTs';

export default function MainProjectCard({ token }) {
  return (
    <div>
      <div className="mt-8 flex flex-col lg:flex-row space-y-12 lg:space-x-12 justify-between items-center">
        <div className="lg:w-1/2">
          <ALink
            href={`/projects/${token?.to_tid || token?.tid}`}
            title={token?.name}
          >
            <CardImage
              token={token}
              className="max-h-80 lg:max-h-65 w-full object-contain object-center rounded-box"
            />
          </ALink>
        </div>

        <div className="flex flex-col justify-center items-center lg:items-start w-3/4 md:w-1/2">
          <h2 className="text-center lg:text-start">{token?.name}</h2>
          <p className="mt-2 text-center lg:text-start text-base-content opacity-60 mx-auto lg:w-full">
            {token?.description?.slice(0, 300) || null}
            {token?.description?.length > 300 ? '...' : null}
          </p>
            <ALink
              href={`/projects/${token?.to_tid || token?.tid}`}
              title={token?.name}
            >
              <Button variant="primary" className='mt-4'>Explore Project</Button>
            </ALink>
            <div className='mt-6'>
              <PinNFT token={token} />
            </div>
        </div>
      </div>
    </div>
  );
}
