import { useMemo } from 'react';

import RecentArticlesContent from '@/components/RecentArticles/RecentArticlesContent';

import { Article } from '@/types/ArticlesType';

type RecentArticlesContentProps = {
  data: Article[];
};

const RecentArticles = ({ data }: RecentArticlesContentProps) => {
  const sortedData = useMemo(
    () =>
      data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }),
    [data]
  );

  return <RecentArticlesContent data={sortedData} />;
};

RecentArticles.displayName = 'RecentArticles';

export default RecentArticles;
