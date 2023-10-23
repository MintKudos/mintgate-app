import Link from 'next/link';

export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-primary-content opacity-60 hover:opacity-100"
    >
      {children}
    </Link>
  );
}
