import React from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import _dynamic from 'next/dynamic';
import { imgUrlCDN } from 'components/utility/Fastly';
import useSWR from 'swr';
import UserProfile from './UserProfile';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function Home(props) {
  const { state: ostate } = useOvermind();
  const router = useRouter();
  const username = props.username || router.query.uid;
  const card = props.card;
  const imgP = props.imgP;
  const imgB = props.imgB;
  const description = props.descr;
  const namechange = props.namechange;
  const title = props.title;
  const brandId = props?.brand?.brand?.id;

  let userInfo = props.userInfo; // use static profile props

  let tokenUrl = `${TPP}/api/v2/tokens/byuser?uid=${userInfo?.result?.id}&network=${ostate.network}`;
  if (brandId) tokenUrl += `&brand=${brandId}`;
  // console.log('tokenUrl', tokenUrl);
  const { data } = useSWR(
    userInfo?.result?.id && ostate.network ? tokenUrl : null
  );

  const tokens = data;

  // const tokensByUser = useAsync(async () => {
  //   let url = new URL(`${TPP}/api/v2/tokens/byuser`);
  //   if (userInfo?.result?.id)
  //     url.searchParams.set('uid', userInfo?.result?.id);
  //   if (ostate.network) url.searchParams.set('network', ostate.network);

  //   const response = await fetch(url, {
  //     method: 'GET',
  //   });
  //   const data = await response.json();

  //   return data;
  // }, [userInfo.result.id, ostate.network]);

  // const tokens = tokensByUser.value;

  // console.log("tokens", tokens);

  // const followCheck = useAsync(async () => {
  //   if (!ostate.user.uid) return null;
  //   let url = new URL(`${TPP}/api/v2/users/followCheck`);
  //   if (ostate.user.uid) url.searchParams.set('uid', ostate.user.uid);
  //   if (userInfo?.result?.id)
  //     url.searchParams.set('to_uid', userInfo?.result?.id);

  //   const response = await fetch(url.href, {
  //     method: 'GET',
  //   });
  //   const data = await response.json();

  //   return data;
  // }, [ostate.user.uid, userInfo?.result?.id]);

  // const follows = followCheck.value;

  let profileImage = imgP;
  let banner = imgB;

  if (userInfo) {
    if (userInfo?.result?.photo)
      profileImage = profileImage || userInfo?.result?.photo; // custom image
    if ((banner = userInfo?.result?.banner))
      banner = banner || userInfo?.result?.banner;
  }
  if (
    profileImage?.indexOf('cdn.') > -1 &&
    profileImage?.indexOf('.gif') === -1
  )
    profileImage = profileImage + '?width=160';
  if (true) {
    // (banner?.indexOf('cdn.') > -1 && banner?.indexOf('.gif') === -1) {
    const b = imgUrlCDN(banner, 1024);
    if (b.isImg && b.src) banner = b.src;
    // banner = banner + '?auto_optimize=medium';
  }

  // profileImage = profileImage || '/profile_token.png'; // defaults

  const page_title = 'MintGate' + ` - ` + username + ' community'; //
  // const descr = `See what's new on ${username} exclusive feed`;

  // if (!username || !userInfo) return <LoadingAnimationCircle />;

  // console.log("Usertheme Profile", usertheme)
  // console.log("Changed Username", username)
  // console.log("Changed Layout", layoutchange)

  // console.log("Usertheme Profile", usertheme)
  // console.log("Changed Username", username)
  // console.log("Changed Layout", layoutchange)
  // console.log('Layout', layoutName, tokens?.length);

  // console.log('Infolink', userInfo.result.settings.newsLink);
  return (
    <div className="min-h-screen w-full bg-base-100 overflow-hidden">
      <main className="w-full mx-auto profile-page">
        <UserProfile
          name={title ? title : userInfo?.result?.name}
          description={description ? description : userInfo?.result?.descr}
          username={namechange ? namechange : userInfo?.result?.username}
          banner={imgB ? imgB : banner}
          page_title={page_title}
          profileImage={imgP ? imgP : profileImage}
          createdNFTs={tokens}
          newslink={userInfo?.result?.settings?.newsLink}
          layout={'default'}
          card={card ? card : userInfo?.result?.themes?.card || 'default'}
        />
      </main>
    </div>
  );
}

const ProfilePage = React.memo(Home);
export default ProfilePage;
