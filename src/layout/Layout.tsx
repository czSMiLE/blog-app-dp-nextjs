import { FC } from 'react';

import { Header, ILayoutProps } from '@/layout';

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main role='main' className='layout'>
        {children}
      </main>
    </div>
  );
};
