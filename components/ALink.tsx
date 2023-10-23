import Link from 'next/link';
import { forwardRef } from 'react';

export default forwardRef(
  (
    {
      href,
      title,
      children,
      id,
      className,
      onClick,
      target,
    }: {
      href: string;
      title: string;
      children: any;
      id?: string;
      className?: string;
      onClick?: (e: any) => void;
      target?: string;
    },
    ref
  ) => {
    let misc: any = {};
    if (id) misc.id = id;
    if (className) misc.className = className;
    if (target) misc.target = target;

    if (onClick) misc.onClick = onClick;

    if (!href) return <>{children}</>;

    if (
      href.startsWith('/') === false &&
      href.toLowerCase().startsWith('http') === false
    ) {
      href = `https://${href}`;
    }

    return (
      <Link href={href} title={title} ref={ref} {...misc} draggable="false">
        {children}
      </Link>
    );
  }
);
