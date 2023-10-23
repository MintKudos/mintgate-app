import React from 'react';
import _dynamic from 'next/dynamic';
import MainProjectCard from 'mintflow/Cards/MainProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Scrollbar } from 'swiper';
import ProjectCard from 'mintflow/Cards/ProjectCard';
import { useMedia } from 'react-use';
import Feed from 'components/NFT/feedComponent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export function _homeTab({ username, tokens }: any) {
  if (tokens && !tokens.filter) {
    console.error('err', tokens);
    // alert(`Error: createdNFTs value is incorrect ${tokens}`);
    tokens = []; // HACK: NOT SURE WHY THIS HAPPENS -JD
  }

  const isMobile = useMedia('only screen and (max-width: 760px)', false);
  const isTablet = useMedia('only screen and (max-width: 1000px)', false);
  const pinnedNFTs = tokens?.filter((x) => x.pinned === true) || [];
  let unpinnedNFTs = tokens?.filter((x) => x.pinned === false) || [];
  const homeTokens = pinnedNFTs?.length === 0 ? tokens : pinnedNFTs;

  // move first unpinned to pinned, if there's no pinned
  if (pinnedNFTs?.length === 0) {
    const t = unpinnedNFTs.shift();
    pinnedNFTs.push(t);
  } else {
    unpinnedNFTs = [...pinnedNFTs, ...unpinnedNFTs];
  }

  return (
    <div className="mt-8">
      {pinnedNFTs.slice(0, 1).map((token, i) => {
        token.username = token.username || username;
        return (
          <div key={token?.id || token?.tid} className="px-2">
            <MainProjectCard token={token} />
          </div>
        );
      })}
      {unpinnedNFTs.length > 1 && (
        <div className="mt-32 space-y-4">
          <h5 className="mb-8">More Gates</h5>
          <Feed username={username} tokens={tokens} />
        </div>
        /*  Showing all tokens on the Profile
          <Swiper
            slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
            spaceBetween={isMobile || isTablet ? 10 : 20}
            modules={[Navigation, Pagination, Keyboard, Scrollbar]}
            navigation={true}
            pagination={{
              clickable: true,
            }}
          >
            {unpinnedNFTs.slice(1, 10).map((token, i) => {
              token.username = token.username || username;
              return (
                <SwiperSlide
                  className="pt-6 pb-12 px-1"
                  key={token?.id || token?.tid}
                >
                  <ProjectCard token={token} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      */
      )}
    </div>
  );
}

var FeedComponent = React.memo(_homeTab);
export default FeedComponent;
