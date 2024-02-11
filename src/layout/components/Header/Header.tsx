import { FC } from 'react';

import { useAuth } from '@/hooks';

import {
  HeaderLinks,
  HeaderLoggedIn,
  HeaderLoggedOut,
} from '@/layout/components';

export const Header: FC = () => {
  const { user } = useAuth();

  return (
    <header className='sticky top-0 z-50 bg-[#F8F9FA]' role='banner'>
      <div className='layout flex h-14 items-center justify-between'>
        <HeaderLinks />
        {user ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
  );
};
