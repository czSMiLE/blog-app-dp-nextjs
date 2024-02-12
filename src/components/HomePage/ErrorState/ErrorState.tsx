import { FC } from 'react';

import { IErrorState } from '@/components';

export const ErrorState: FC<IErrorState> = ({ error }) => {
  return (
    <div className='py-10 text-center text-red-500'>
      <h2 className='text-xl font-semibold'>Error Loading Articles</h2>
      <p>{error}</p>
    </div>
  );
};
