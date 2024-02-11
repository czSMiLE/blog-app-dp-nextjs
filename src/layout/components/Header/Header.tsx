import Link from 'next/link';
import { FC } from 'react';

import { useAuth } from '@/hooks';

import { HeaderLoggedIn, HeaderLoggedOut } from '@/layout/components';

import Logo from '~/images/logo.svg';

const links = [
  { href: '/', label: 'Recent Articles' },
  { href: '/about', label: 'About' },
];

export const Header: FC = () => {
  const { user, logOut } = useAuth();

  return (
    <header className='sticky top-0 z-50 bg-[#F8F9FA]' role='banner'>
      <div className='layout flex h-14 items-center justify-between'>
        <nav aria-label='Main navigation'>
          <ul className='flex items-center justify-between gap-10'>
            <Link href='/' aria-label='Go to homepage'>
              <Logo height='2.25em' width='2.25em' aria-hidden='true' />
            </Link>
            {links.map((item) => (
              <li
                key={`${item.href}${item.label}`}
                className='text-mediumGrey hover:text-gray-600'
              >
                <Link
                  href={item.href}
                  aria-label={`Go to ${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {user ? <HeaderLoggedIn logOut={logOut} /> : <HeaderLoggedOut />}
      </div>
    </header>
  );
};
