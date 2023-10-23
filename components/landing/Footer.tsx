import Button from 'mintflow/Button';
import Link from 'next/link';

import { Container } from './Container';
import { NavLink } from './NavLink';

export function Footer({ actions }) {
  return (
    <footer className="bg-base-100">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center px-2 lg:px-0 space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-6 w-auto z-0"
                src="/logo-light.svg"
                alt="Mintgate"
              />
            </div>
            <p className="title text-base-content">Mintgate</p>
          </div>
          <nav className="text-sm" aria-label="quick links">
            <div className="mt-8 lg:-my-1 flex items-center justify-center gap-x-6">
              <NavLink href="#">Home</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#start">Get Started</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-base-300 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <Link
              href="https://twitter.com/mintgate_io"
              className="group"
              aria-label="TaxPal on GitHub"
            >
              <img
                src="/twitter.svg"
                className="w-6 h-6 invert opacity-80 hover:opacity-100"
              />
            </Link>
            <Link
              href="https://discord.gg/9BGwzQwJdt"
              className="group"
              aria-label="TaxPal on GitHub"
            >
              <img
                src="/discord.svg"
                className="w-6 h-6 invert opacity-80 hover:opacity-100"
              />
            </Link>
          </div>
          <p className="mt-6 text-sm text-base-content opacity-80 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} MintKudos inc. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
