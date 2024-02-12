import { ReactNode } from 'react';

import { ISeoProps } from '@/components';

export interface ILayoutProps {
  children: ReactNode;
  seoProps: ISeoProps;
}
