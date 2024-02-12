import Link from 'next/link';
import { FC } from 'react';

import { links } from '@/layout';

import Logo from '~/images/logo.svg';

export const HeaderLinks: FC = () => {
  return (
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
  );
};
