import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

export const HeaderLoggedOut: FC = () => {
  return (
    <div>
      <Link
        href='/login'
        className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
        aria-label='Log in to your account'
      >
        Login
        <AiOutlineArrowRight aria-hidden='true' />
      </Link>
    </div>
  );
};
