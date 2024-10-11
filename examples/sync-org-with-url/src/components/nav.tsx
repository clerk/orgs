'use client';

import { usePathname } from 'next/navigation';
import { NavLinks } from './NavLinks';
import Link from 'next/link';

export default function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    // Add more links as needed
  ];

  return (
    <nav>
      <ul>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );