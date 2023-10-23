import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { useRouter } from 'next/router';
import ShareButtons from 'components/utility/ShareButtons';
import { UserSearchbar } from 'components/utility/UserSearchbar';

export default function PageHero({ Text }) {
  /** this hook gets the scroll y-axis **/
  const { scrollY }: { scrollY: any } = useScroll();
  const router = useRouter();

  /** set Scroll Position of the whole window**/
  const [scrollPosition, setScrollPosition] = useState<number>();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // console.log('Scroll Current', scrollPosition);

  return (
    <div
      className={`hidden lg:flex items-center sticky top-0 justify-between px-4 md:px-8 py-0 md:py-4 border-b bg-base-100 border-base-300 z-30 w-full transition-all ease-in duration-300 delay-75 ${
        scrollY?.current <= 15
          ? 'bg-opacity-0 border-opacity-0'
          : 'bg-base-100 bg-opacity-70 border-opacity-80 backdrop-blur-xl shadow-elevationSmall'
      }`}
    >
      <div className="min-w-0 flex-1 flex flex-row items-center space-x-4">
        <UserSearchbar
          openNewWindow={false}
          popover={true}
          text="Search collections"
          clickToFollow={false}
        />
        <h2 className="base1 text-base-content">{Text}</h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <ShareButtons quote={Text} shareURL={router.asPath} iconOnly={false} />
      </div>
    </div>
  );
}
