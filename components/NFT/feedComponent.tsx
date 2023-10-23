import React from 'react';
import Masonry from 'react-masonry-css';
import ProjectCard from 'mintflow/Cards/ProjectCard';
import { useOvermind } from 'stores/Overmind';

export function _feedComponent({
  username,
  tokens,
  base,
  xl,
  lg,
  md,
  sm,
  xs,
  url,
}: any) {
  const { state: ostate } = useOvermind();
  const NFT = tokens;

  const breakpointColumnsObj = {
    default: base ? base : 4,
    1920: xl ? xl : 4,
    1520: lg ? lg : 3,
    1100: md ? md : 2,
    700: sm ? sm : 1,
    500: xs ? xs : 1,
  };

  // if (NFT.loading || !NFT?.length)
  // console.log('tokens', tokens);
  if (!NFT || !NFT.map) return null;

  return (
    <Masonry
      className="flex h-auto flex-wrap w-full"
      breakpointCols={breakpointColumnsObj}
    >
      {NFT.map((token, i) => {
        token.username = token.username || username;

        return (
          <div key={token?.id || token?.tid}>
            <ProjectCard token={token} />
          </div>
        );
      })}
    </Masonry>
  );
}

var FeedComponent = React.memo(_feedComponent);
export default FeedComponent;
