import RecentArticleCard from '@/components/RecentArticles/RecentArticleCard';

import { Article } from '@/types/ArticlesType';

type RecentArticlesContentProps = {
  data: Article[];
};

const RecentArticlesContent = ({ data }: RecentArticlesContentProps) => {
  return (
    <>
      <h1 className='font-2xl mb-16 font-medium'>Recent articles</h1>
      <div className='flex flex-col gap-8'>
        {data.map((item) => {
          return <RecentArticleCard key={item.articleId} article={item} />;
        })}
      </div>
    </>
  );
};

RecentArticlesContent.displayName = 'RecentArticlesContent';

export default RecentArticlesContent;
