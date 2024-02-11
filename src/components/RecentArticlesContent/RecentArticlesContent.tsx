import { FC } from 'react';

import { IRecentArticlesContentProps, RecentArticleCard } from '@/components';

export const RecentArticlesContent: FC<IRecentArticlesContentProps> = ({
  data,
}) => {
  return (
    <>
      <h1 className='font-2xl mb-16 font-medium'>Recent articles</h1>
      <div className='flex flex-col gap-8'>
        {data.map((article) => {
          return (
            <RecentArticleCard key={article.articleId} article={article} />
          );
        })}
      </div>
    </>
  );
};
