'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Sell to Us', href: '/sell' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        Antique Gallery
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
