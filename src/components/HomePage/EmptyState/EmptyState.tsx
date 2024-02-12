import { FC } from 'react';

export const EmptyState: FC = () => {
  return (
    <div className='py-10 text-center'>
      <h2 className='text-xl font-semibold'>No articles found.</h2>
      <p>Check back later for new content.</p>
    </div>
  );
};
