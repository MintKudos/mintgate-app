import { useState, useEffect, memo, Fragment } from 'react';
import { useOvermind } from 'stores/Overmind';
import { useScroll } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'mintflow/Button';
import TokensList from './TokensList';
import AccountDrawer from 'components/utility/AccountDrawer';
import NavItems from './NavItems';
import { UserIcon } from '@heroicons/react/24/solid';
import { UserSearchbar } from 'components/utility/UserSearchbar';

export default memo(_StoreNavigation);
function _StoreNavigation({ theme }: any) {
  const { state: ostate } = useOvermind();
  const isContributor = ostate.user?.contributor;
  const canCreate = ostate.user.creator || isContributor;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // console.log("Private?", privatStore)
  // console.log("Public Store?", publicStore)
  // console.log("Permissions?", permissions)

  const [openThemeEditor, setOpenThemeEditor] = useState<boolean>(null);

  /** this hook gets the scroll y-axis **/
  const { scrollY }: { scrollY: any } = useScroll();

  /** this hook manages state **/
  const [hidden, setHidden] = useState(false);

  /** this onUpdate function will be called in the `scrollY.onChange` callback **/
  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  /** call update function on change of scrollY **/
  // useEffect(() => {
  //   scrollY.onChange(() => update());
  //   return scrollY.clearListeners();
  // }, []);

  useEffect(() => {
    if (open) {
      setOpen(!open);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (profileOpen) {
      setProfileOpen(!profileOpen);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (
      router.asPath === '/?theme_editor' &&
      (openThemeEditor == null || openThemeEditor)
    ) {
      setOpenThemeEditor(true);
    } else null;
  }, [openThemeEditor]);

  /** set hidden or visibale variants **/
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  };

  /** set Scroll Position of the whole window**/
  const [scrollPosition, setScrollPosition] = useState<number>();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      update();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!ostate.network) return null;
  if (ostate.hideNav) return null;

  return (
    <div
      className={`sticky top-0 mx-auto border-b border-base-100 ${
        scrollY?.current <= 15
          ? open
            ? 'bg-base-100'
            : profileOpen
            ? 'bg-base-100'
            : 'bg-opacity-0 border-opacity-0'
          : 'bg-base-100 bg-opacity-70 border-opacity-80 backdrop-blur-xl shadow-elevationSmall'
      } max-w-7xl px-2 sm:px-4 z-40`}
    >
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex">
          {/* Mobile menu button */}
          <Button
            variant="nav"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-base-content hover:text-primar focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3CenterLeftIcon
                className="block h-6 w-6"
                aria-hidden="true"
              />
            )}
          </Button>
          {/* Logo section */}
          <div className="flex items-center pl-2 space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-5 w-auto"
                src={theme === 'light' ? '/logo-dark.svg' : '/logo-light.svg'}
                alt="Mintgate"
              />
            </div>
            <p className="base1 text-base-content">Mintgate</p>
          </div>
        </div>

        {/* Search section */}
        <div className="flex justify-start lg:pr-16">
          {/* Hidden for Beta 
          <div className="block md:hidden w-full">
            <label htmlFor="search" className="sr-only">
              Search projects
            </label>
            <div className="relative focus-within:text-gray-400">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full border border-base-300 rounded-box bg-base-100 py-2 pl-10 pr-3 leading-5 text-base-content text-opacity-60 placeholder-base-content focus:bg-base-100 focus:text-primary focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search through  Mintgate"
                type="search"
              />
            </div>
          </div>
          */}
          <div className="hidden md:flex flex-row space-x-2">
            <NavItems small={false} />
          </div>

          <Button
            variant="nav"
            circle
            onClick={() => setProfileOpen(true)}
            className="md:hidden items-center flex"
          >
            {profileOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <UserIcon className="w-5 h-5" />
            )}
          </Button>
        </div>

        <Transition show={open} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={setOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden bg-base-100 bg-opacity-40 backdrop-blur-sm">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-0 sm:pr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl md:max-w-sm">
                      <div className="mt-16 flex h-full flex-col overflow-y-scroll bg-base-100 py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="border-none sm:border-r border-base-300 md:border-none">
                            <div className="block md:hidden mb-4 md:pr-0">
                              <NavItems small={false} />
                            </div>
                            <div className="md:px-0">
                              <TokensList
                                small={false}
                                chain={ostate.user.wallets.network}
                                owner_address={ostate.user.wallets.address}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition show={profileOpen} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={setProfileOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden bg-base-100 bg-opacity-40 backdrop-blur-sm">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-0 sm:pr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl md:max-w-sm">
                      <div className="mt-16 flex h-full flex-col overflow-y-scroll bg-base-100  shadow-xl">
                        <div className="relative  flex-1">
                          <div className="block md:hidden">
                            <AccountDrawer small={false} />
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
