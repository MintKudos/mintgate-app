import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Feed from 'components/NFT/feedComponent';
import HomeTab from 'components/profile/profileComponents/profileTabs/homeTab';
import { useOvermind } from 'stores/Overmind';
import Tabs from 'mintflow/Tabs';
import Tab from 'mintflow/Tabs/Tab';
import Button from 'mintflow/Button';
import ALink from 'components/ALink';

// const ProfileFeed = React.memo(_ProfileFeed);
export default ProfileTabs;

function ProfileTabs({
  card,
  username,
  createdNFTs,
  layout,
  base,
  xl,
  lg,
  md,
  sm,
  xs,
}: any) {
  const { state: ostate } = useOvermind();
  const [currentTab, setTab] = useState('home');

  return (
    <>
      <div className="mx-2 mb-12">
        <Tabs center>
          <Tab
            key={0}
            value={0}
            active={currentTab === 'home'}
            onClick={() => {
              setTab('home');
            }}
          >
            Home
          </Tab>
          <Tab
            key={1}
            value={1}
            active={currentTab === 'projects'}
            onClick={() => {
              setTab('projects');
            }}
          >
            Created
          </Tab>
          {/*<Tab value={2} active={currentTab === 'supported'} onClick={() => { setTab('supported');}}>Supported</Tab>*/}
        </Tabs>
      </div>
      <div>
        <Transition
          show={currentTab === 'home'}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          {((ostate.user.loggedIn && ostate.user.creator && !createdNFTs) ||
            createdNFTs?.length <= 0) && (
              <div className="h-96 flex flex-col justify-center items-center">
                <h2 className="text-base-content mx-auto">
                  {' '}
                  Start your first Project{' '}
                </h2>
                <ALink title="new Project" href="/new_project">
                  <Button variant="primary" className="mt-12">
                    Create a project
                  </Button>
                </ALink>
              </div>
            )}

          {!createdNFTs || createdNFTs?.length <= 0 ? (
            <div className="h-96 flex justify-center items-center">
              <h2 className="text-base-content mx-auto">
                {' '}
                No projects created.{' '}
              </h2>
            </div>
          ) : (
            <HomeTab
              username={username}
              card={card}
              layout={layout}
              base={base}
              xl={xl}
              lg={lg}
              md={md}
              sm={sm}
              xs={xs}
              tokens={createdNFTs}
            />
          )}
        </Transition>
        <Transition
          show={currentTab === 'projects'}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          {!createdNFTs || createdNFTs?.length <= 0 ? (
            <div className="h-96 flex justify-center items-center">
              <h2 className="text-base-content mx-auto">
                {' '}
                No projects created.{' '}
              </h2>
            </div>
          ) : (
            <Feed
              username={username}
              card={card}
              layout={layout}
              base={base}
              xl={xl}
              lg={lg}
              md={md}
              sm={sm}
              xs={xs}
              tokens={createdNFTs}
            />
          )}
        </Transition>
        {/* This needs to be the supported projects (tokens that the user owns)
        <Transition
          show={currentTab === 'supported'}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
         
          {!createdNFTs || createdNFTs?.length <= 0 ? (
            <div className="h-96 flex justify-center items-center">
              <h2 className="text-base-content mx-auto">
                {' '}
                No projects supported.{' '}
              </h2>
            </div>
          ) : (
            <Feed
              username={username}
              card={card}
              layout={layout}
              base={base}
              xl={xl}
              lg={lg}
              md={md}
              sm={sm}
              xs={xs}
              tokens={createdNFTs}
            />
          )}
        </Transition>
         */}
        <Transition
          show={currentTab === 'ranking'}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        ></Transition>
      </div>
    </>
  );
}
