import React from 'react';
import LoadingOverlay from 'components/utility/LoadingOverlay';
import { useAsync } from 'react-use';
import ContentCard from 'components/Content/contentCard';
import { UserSearchbar } from 'components/utility/UserSearchbar';
import AccountDrawer from 'components/utility/AccountDrawer';
import PageHero from 'components/general/PageHero';
import getUserInfo from 'hooks/getUserInfo';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function UserProfile({ card, layout, newslink, createdNFTs }) {
  const userInfo = getUserInfo();

  const userContent = useAsync(async () => {
    if (!userInfo.id) return null;

    const response = await fetch(
      `${TPP}/api/v2/links/user?uid=${userInfo.id}`,
      {
        method: 'GET',
      }
    );
    let data = await response.json();

    if (data && data.result && data.result.length === 0) data = null; // no links

    return data.result;
  }, [userInfo?.id]);

  //console.log('User Info', userInfo);
  //console.log('User Content', userContent);

  if (!userInfo || !userContent || userContent.loading)
    return (
      <div className="mt-36 relative min-h-screen overflow-x-hidden">
        <LoadingOverlay />
      </div>
    );

  return (
    <div>
      <PageHero Text="Your Posts" />
      <div className="p-8">
        <h1 className="sr-only">Recent posts</h1>
        <ul role="list" className="flex flex-col space-y-6">
          {userContent?.value &&
            userContent.value.map((post) => (
              <ContentCard key={post.id} l={post} bigCard={true} />
            ))}
        </ul>
      </div>
    </div>
  );
}
