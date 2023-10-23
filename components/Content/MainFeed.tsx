import AccountDrawer from 'components/utility/AccountDrawer';
import useSWR from 'swr';
import { useOvermind } from 'stores/Overmind';
import ContentCard from './contentCard';
import { UserSearchbar } from 'components/utility/UserSearchbar';
import PageHero from 'components/general/PageHero';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import Button from 'mintflow/Button';
import ALink from 'components/ALink';
import { NoAccessWidget } from 'pages/feed/[chain]/[contract]';

export default function MainFeed() {
  const { state: ostate } = useOvermind();
  const router = useRouter();

  const postInQuery = useMemo(() => {
    if (!router.isReady) return null;
    return router.query.p || router.query.post || null;
  }, [router.isReady]);
  // console.log('postInQuery', postInQuery);

  const filterId = postInQuery ? `&id=${postInQuery}` : '';

  const feedResp = useSWR(
    ostate.user.wallets.network &&
      ostate.user.jwt &&
      '/api/v2/links/feed?chain=' +
        ostate.user.wallets.network +
        '&jwt=' +
        ostate.user.jwt +
        filterId,
    { keepPreviousData: true }
  );
  const feedPosts = feedResp?.data?.feed || null;

  useEffect(() => {
    if (postInQuery && feedPosts?.length === 0) {
      // alert('You do not have access to this post or post was deleted.');
      router.push(window.location.pathname.replace(/\/p\/.*/g, ''));
    }
  }, [feedPosts, postInQuery]);

  if (!feedPosts) return null;

  // console.log('Global Posts?', feedResp);
  return (
    <div>
      <PageHero Text="Home Feed" />
      <div className="py-10 md:p-10">
        <Feed feedPosts={feedPosts} />
        {postInQuery && feedPosts?.length && (
          <ALink title="community" href={`/feed/${feedPosts[0]?.contract}/`}>
            <Button className="mt-4" variant="nav" size="sm">
              Back to community
            </Button>
          </ALink>
        )}
      </div>
    </div>
  );
}
export function Feed({ feedPosts }: { feedPosts: any[] }) {
  // console.log('feedPosts', feedPosts);
  return (
    <div>
      {feedPosts?.length > 0 ? (
        <>
          <h1 className="sr-only">Recent posts</h1>
          <ul role="list" className="flex flex-col space-y-14">
            {feedPosts &&
              feedPosts.map((post) => (
                <ContentCard key={post.id} l={post} bigCard={true} />
              ))}
          </ul>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="title">None exclusive posts to show...</p>
        </div>
      )}
    </div>
  );
}
