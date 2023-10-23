import React, { useState, useEffect } from 'react';
import TokensList from './TokensList';
import { useOvermind } from 'stores/Overmind';
import { UserSearchbar } from 'components/utility/UserSearchbar';
import AccountDrawer from 'components/utility/AccountDrawer';
import Navigation from './Navigation';
import { useMedia } from 'react-use';
import Landing from 'components/landing';
import { useRouter } from 'next/router';
import NavItems from './NavItems';
import { useDarkMode } from 'components/utility/useDarkMode';
import { DarkModeToggel } from 'components/utility/darkModeToggel';
import CustomTheme from './CustomTheme';
import { useScroll } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Layout({ url, children }) {
  const { state: ostate, actions } = useOvermind();
  const router = useRouter();
  const [contractAddress, setAddr] = useState<string>(null);
  const [small, setSmall] = useState(true);
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  useEffect(() => {
    setAddr(router.asPath.split('/')[2]);
    //console.log('router.isReady', router.isReady, router);
  }, [router]);

  /** set Scroll Position of the whole window**/
  const { scrollY }: { scrollY: any } = useScroll();
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

  const handleSidbarSize = () => {
    if (small === false) {
      window.localStorage.setItem('sidebar_size', 'true');
    } else {
      window.localStorage.setItem('sidebar_size', 'false');
    }
    setSmall(!small);
  };

  useEffect(() => {
    const sidebarSize = window.localStorage.getItem('sidebar_size');
    const sidebarSizeBool = JSON.parse(sidebarSize);
    sidebarSize && setSmall(sidebarSizeBool);
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes('logout')) {
      actions.logOut({ force: true });
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  }, []);

  const isNav = useMedia('only screen and (max-width: 1300px)', false);
  const themeMode = theme === 'dark' ? 'default' : 'light';
  if (!mountedComponent) return <div />;

  return (
    <CustomTheme theme={themeMode} globalstate={true}>
      {!ostate.user.loggedIn ? (
        <Landing />
      ) : (
        <div className="bg-base-100 transfrom-all transition-all duration-200 ease-in">
          {isNav && <Navigation theme={theme} />}
          <div className="max-w-8xl bg-base-100 mx-auto min-h-full">
            <div className="fixed top-2 right-14 lg:top-auto lg:bottom-4 lg:right-4 z-40">
              <DarkModeToggel theme={theme} themeToggler={themeToggler} />
            </div>

            {/* Static sidebar for desktop */}
            {!isNav && (
              <div
                className={`hidden lg:fixed lg:inset-y-0 lg:flex ${
                  small ? 'lg:w-24' : 'lg:w-72'
                } lg:flex-col lg:pt-5 border-r border-base-300 bg-base-100 z-10`}
              >
                <div className="absolute text-base-content flex flex-col justify-end items-start w-full bottom-0 z-10 bg-gradient-to-t from-base-100 to-transparent h-8" />
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex h-0 flex-1 flex-col  overflow-y-auto no-scrollbar">
                  {/* Navigation */}
                  <nav className="pt-2 px-4">
                    {/* Logo section */}
                    <div
                      className={`pl-2 flex ${
                        small ? 'space-x-2' : 'justify-between'
                      } items-center`}
                    >
                      <div className="flex items-center">
                        <img
                          className="h-6 w-auto"
                          src={
                            theme === 'light'
                              ? '/logo-dark.svg'
                              : '/logo-light.svg'
                          }
                          alt="Mintgate"
                        />
                        {small === false && (
                          <p className="pl-4 title text-base-content">
                            Mintgate
                          </p>
                        )}
                      </div>
                      <div onClick={handleSidbarSize}>
                        <ChevronRightIcon
                          className={`block h-4 w-4 font-medium text-base-content opacity-60 hover:opacity-100 cursor-pointer ${
                            !small && 'rotate-180'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="mt-8 pb-4">
                      <NavItems small={small} />
                      <div className="flex flex-row items-center pl-1">
                        <TokensList
                          small={small}
                          chain={ostate.user.wallets.network}
                          owner_address={ostate.user.wallets.address}
                        />
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            )}
            {/* Main column */}
            <div
              className={`${
                isNav ? 'mx-auto max-w-7xl' : small ? 'lg:pl-24' : 'lg:pl-72'
              } md:grid grid-cols-12 bg-base-100`}
            >
              <main
                className={` ${
                  small ? 'lg:col-span-9' : 'lg:col-span-8'
                } min-h-screen`}
              >
                {children}
              </main>
              <aside
                className={`${
                  small ? 'lg:col-span-3' : 'lg:col-span-4'
                } hidden lg:block border-l border-base-300 bg-base-100 transition-all ease-in duration-300 delay-75
               '
                `}
              >
                <div className="sticky top-0 space-y-4 bg-base-100">
                  <AccountDrawer small={small} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </CustomTheme>
  );
}
