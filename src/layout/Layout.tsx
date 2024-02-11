import { FC } from 'react';

import { Seo } from '@/components';

import { Header, ILayoutProps } from '@/layout';

export const Layout: FC<ILayoutProps> = ({ children, seoProps }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <Seo {...seoProps} />
      <main role='main' className='layout'>
        {children}
      </main>
    </div>
  );
};
