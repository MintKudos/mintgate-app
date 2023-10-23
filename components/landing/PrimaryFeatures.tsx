import { useEffect, useState, useId } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { Container } from './Container';

const features = [
  {
    title: 'Community Pages',
    description:
      'The HQ for every NFT project. Join the conversation with your NFT community. Flex your NFTs, create gated experiences, and more.',
    image: '/community-page.png',
  },
  {
    title: 'NFT Profiles',
    description:
      'Hey Anon, we scrapped profiles and let your favorite NFT represent you. For the first time, make it more than a PFP, make it your identity.',
    image: '/nft-page.png',
  },
  {
    title: 'Gated Content',
    description:
      'Movies, Shows, Videos, Art, Articles, Events & More! Only for you and your community.',
    image: '/content-page.png',
  },
  // {
  //   title: 'Media Content',
  //   description:
  //     'Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.',
  //   image: 'images/screenshots/reporting.png',
  // },
];

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState('horizontal');

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)');

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal');
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener('change', onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, []);

  function BackgroundIllustration(props) {
    let id = useId();

    return (
      <div {...props}>
        <svg
          viewBox="0 0 1026 1026"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-spin-slow"
        >
          <path
            d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
            stroke="#212836"
            strokeOpacity="0.7"
          />
          <path
            d="M513 1025C230.23 1025 1 795.77 1 513"
            stroke={`url(#${id}-gradient-1)`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id={`${id}-gradient-1`}
              x1="1"
              y1="513"
              x2="1"
              y2="1025"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7857FF" />
              <stop offset="1" stopColor="#DD2DEC" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          viewBox="0 0 1026 1026"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
        >
          <path
            d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
            stroke="#212836"
            strokeOpacity="0.7"
          />
          <path
            d="M913 513c0 220.914-179.086 400-400 400"
            stroke={`url(#${id}-gradient-2)`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id={`${id}-gradient-2`}
              x1="913"
              y1="513"
              x2="913"
              y2="913"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7857FF" />
              <stop offset="1" stopColor="#DD2DEC" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-transparent pt-20 pb-28 sm:py-32"
    >
      <BackgroundIllustration className="absolute left-1/2 bottom-0 h-full w-full stroke-base-300 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:top-80 xl:top-0" />
      <Container className="relative">
        <div className="max-w-3xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-primary-content sm:text-4xl md:text-5xl">
            Give NFTs a heart and soul.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg tracking-tight text-primary-content opacity-60">
            Unlock and join the conversation with your NFTs.Share and chat with
            multiple NFT profiles. MintGate deepens the community experience by
            making content interactive.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mb-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group flex flex-col justify-center item-center relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-base-100 backdrop-blur-sm bg-opacity-20 border border-base-300'
                          : 'hover:bg-base-100 hover:backdrop-blur-sm hover:bg-opacity-10'
                      )}
                    >
                      <Tab
                        className={clsx(
                          'text-start title focus:outline-none focus:border-none focus:ring-none',
                          selectedIndex === featureIndex
                            ? 'text-primary lg:text-base-content'
                            : 'text-base-content opacity-60 hover:opacity-100'
                        )}
                      >
                        <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                        {feature.title}
                        <p
                          className={clsx(
                            'mt-1 hidden text-sm lg:block',
                            selectedIndex === featureIndex
                              ? 'text-base-content opacity-80'
                              : 'text-base-content opacity-60 group-hover:opacity-80'
                          )}
                        >
                          {feature.description}
                        </p>
                      </Tab>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-base-100 bg-opacity-40 ring-1 ring-inset ring-base-200 ring-opacity-50 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-base-content opacity-60 sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-box shadow-elevationHigh sm:w-auto lg:mt-0 lg:w-[67.8125rem] border-2 border-base-300">
                      <img className="w-full" src={feature.image} alt="" />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
