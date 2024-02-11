import { FC, useMemo } from 'react';

import { IRecentArticlesProps, RecentArticlesContent } from '@/components';

export const RecentArticles: FC<IRecentArticlesProps> = ({ data }) => {
  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data]);

  return <RecentArticlesContent data={sortedData} />;
};
