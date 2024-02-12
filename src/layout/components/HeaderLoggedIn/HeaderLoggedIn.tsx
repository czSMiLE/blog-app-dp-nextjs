import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { IHeaderLoggedInProps } from '@/layout';

export const HeaderLoggedIn: FC<IHeaderLoggedInProps> = ({ logOut }) => {
  return (
    <div
      className='flex flex-row gap-10'
      role='navigation'
      aria-label='Admin panel navigation'
    >
      <Link
        href='/admin'
        className='text-mediumGrey hover:text-gray-600'
        aria-label='View my articles'
      >
        My Articles
      </Link>
      <Link
        href='/admin/create-article'
        className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
        aria-label='Create a new article'
      >
        Create Article
      </Link>
      <button
        type='button'
        onClick={logOut}
        className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
        aria-label='Logout'
      >
        <span>Logout</span>
        <AiOutlineArrowRight aria-hidden='true' />
      </button>
    </div>
  );
};
