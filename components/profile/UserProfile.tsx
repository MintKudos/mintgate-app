import React from 'react';
import Fastly from 'components/utility/Fastly';
import Avatar from 'mintflow/Avatar';
import ProfileTabs from 'components/profile/profileComponents/profileTabs';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import Button from 'mintflow/Button';
import ALink from 'components/ALink';
import HomeTab from 'components/profile/profileComponents/profileTabs/homeTab';

export default function UserProfile({
  card,
  layout,
  name,
  username,
  description,
  banner,
  page_title,
  profileImage,
  newslink,
  createdNFTs,
}) {
  return (
    <div>
      <div className="relative w-full mt-16 h-64 lg:h-80 xl:h-96">
        {newslink && (
          <div className="absolute right-4 bottom-4">
            <ALink href={newslink} target="_blank" title="learn more">
              <Button variant="neutral" startIcon size="sm">
                <GlobeAltIcon className="w-5 h-5 text-base-content group-hover:text-primary" />
                {newslink.replace('http://', '').replace('https://', '')}
              </Button>
            </ALink>
          </div>
        )}
        <Fastly
          className="w-full h-full object-cover z-0 "
          src={banner ? banner : '/cover.jpg'}
          alt={page_title}
          width={1024}
          onError={(e) => (e.target.src = '/cover.jpg')}
        />
      </div>

      <div className="-mt-16 md:-mt-20 max-w-7xl px-4 md:px-6 mx-auto">
        <div className="relative flex flex-col justify-center w-full">
          <div className="mx-auto">
            <Avatar
              src={profileImage}
              border
              borderColor="base-100"
              borderSize="8"
              shape="circle"
              shadow
              size="xl"
              className="mx-auto"
            />
          </div>
          <div className="mt-6 max-w-xl mx-auto text-center">
            <h4 className="text-base-content">{name}</h4>
            <p className="mt-2 text-base-content/60 body2">
              {description ? description : null}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-32 max-w-7xl xl:max-w-8xl px-4 md:px-6 mx-auto">
        {!createdNFTs || createdNFTs?.length <= 0 ? (
          <div className="h-96 flex justify-center items-center space-y-4">
            <h2 className="text-base-content mx-auto"> No gates created. </h2>
            <ALink href="/create" title="create a gate">
              <Button variant="primary">Start now</Button>
            </ALink>
          </div>
        ) : (
          <HomeTab
            username={username}
            card={card}
            layout={layout}
            tokens={createdNFTs}
          />
        )}
      </div>
    </div>
  );
}
