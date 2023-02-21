import { useEffect, useState } from 'react';

import fetchArticle from '@/libs/fetchArticle';

import { ArticleDetail } from '@/types/ArticleDetailType';

export const useGetArticle = (articleId: string | string[] | undefined) => {
  const [data, setData] = useState<ArticleDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticle(articleId as string);
      setData(data);
    };

    fetchData();
  }, [articleId]);

  return {
    data,
  };
};
