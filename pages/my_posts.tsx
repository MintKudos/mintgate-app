import React, { useState, useEffect } from 'react';
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useOvermind } from 'stores/Overmind';
import { useAsync } from 'react-use';
import Metrics from 'components/Links/metrics';
import { checkAfterDate } from 'utils/helpers/convertTime';
import { updateGatedLink } from 'utils/tpp';
import ALink from 'components/ALink';
import Button from 'mintflow/Button';
import LoadingAnimationCircle from 'components/utility/LoadingAnimationCircle';
import { ScaleIcon } from '@heroicons/react/24/solid';
import PageHero from 'components/general/PageHero';
import { Feed } from 'components/Content/MainFeed';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function Dashboard() {
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    actions.setTheme(null);
  }, []);

  const links = useAsync(async () => {
    const uid = ostate.user.uid;
    if (!uid || !ostate.user.jwt || !parseInt(uid)) return null;

    const response = await fetch(
      `${TPP}/api/v2/links/user?uid=${uid}&jwt=${ostate.user.jwt}&hidden=true`,
      {
        method: 'GET',
      }
    );
    let data = await response.json();

    if (data && data.result && data.result.length === 0) data = null; // no links

    return data;
  }, [ostate.user.jwt, ostate.user.uid]);

  if (!links || links.loading)
    return (
      <div className="bg-base-100 w-screen h-screen flex justify-center items-center z-40">
        <LoadingAnimationCircle />
      </div>
    );

  return (
    <main>
      <PageHero Text="Post Analytics" />
      <div className="mt-8 px-4 mx-auto">
        {links.value && <LinksList tokenInfo={links.value} />}

        {!links.loading && !links.value && (
          <div className="min-h-screen h-full bg-mint bg-contain bg-no-repeat flex justify-start items-start">
            <div className="max-w-8xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <h2 className="text-3xl font-semibold text-base-content sm:text-4xl">
                <span className="block">You have no content created.</span>
              </h2>
              <div className="mt-8 flex justify-center">
                <ALink href="/new_project" title="create project">
                  <Button variant="primary">New Project</Button>
                </ALink>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function LinksList({ tokenInfo }) {
  const [tokenLinkDetails, setTokenLinkDetails] = useState([{}]);

  useEffect(() => {
    let updatedTokenDetails = [...tokenLinkDetails];

    tokenInfo.result.map(async (tokenLinks) => {
      let entry = tokenLinks.tokens[0];
      let ethAddresses;
      if (entry.address.startsWith('0x')) {
        ethAddresses = entry.address;
        //await getSymbol(ethAddresses)
      }
      updatedTokenDetails.push(entry);
      setTokenLinkDetails(updatedTokenDetails);
    });
  }, []);

  console.log('links: ', tokenInfo);

  return (
    <div className="mt-8 min-h-screen px-4 py-6 lg:px-10 z-20">
      {tokenInfo && <Feed feedPosts={tokenInfo.result} />}
    </div>
  );
}
