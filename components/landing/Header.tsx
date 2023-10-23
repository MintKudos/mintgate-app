import { Fragment } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Container } from './Container';
import { NavLink } from './NavLink';
import Button from 'mintflow/Button';
import ALink from 'components/ALink';

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-base-content"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-base-100 bg-opacity-40 backdrop-blur-md transform" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-base-100 p-4 text-lg tracking-tight text-base-content shadow-xl border border-base-300"
          >
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#start">Get Started</MobileNavLink>
            <MobileNavLink href="#faq">FAQ</MobileNavLink>
            <hr className="m-2 border-base-300" />
            <MobileNavLink href="/login">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header({ actions }) {
  return (
    <header className="bg-base-100 border-b-300 lg:border-b-transparent lg:bg-transparent fixed top-0 w-screen py-6 z-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-6 w-auto"
                    src="/logo-light.svg"
                    alt="Mintgate"
                  />
                </div>
                <p className="title text-primary-content">Mintgate</p>
              </div>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#start">Get Started</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {/* 
            <div className="hidden md:block">
              <ALink
                href="https://about.mintgate.io"
                target="_blank"
                title="About Mintgate"
              >
                <Button variant="nav">
                  <span className="text-primary-content"> About </span>
                </Button>
              </ALink>
            </div>
            */}
            <Button
              onClick={(e) => {
                e?.preventDefault();
                window.location.href = 'https://medium.com/mintgate/mintgate-sunset-announcement-32945de1bbc0;
                // actions.triggerWallet();
              }}
            >
              Closed - Read More
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
