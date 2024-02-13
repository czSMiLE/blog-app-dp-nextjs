import { FC } from 'react';

import { ISkeletonProps } from '@/components';

import { cn } from '@/utils';

export const Skeleton: FC<ISkeletonProps> = ({ className }) => {
  return <div className={cn('animate-pulse bg-slate-300', className)}></div>;
};
