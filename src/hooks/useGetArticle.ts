import { useEffect, useState } from 'react';

import { getArticleDetail } from '@/api';

import { ArticleDetail } from '@/types/ArticleDetailType';

export const useGetArticle = (articleId: string | string[] | undefined) => {
  const [data, setData] = useState<ArticleDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticleDetail(articleId as string);
      setData(data);
    };

    fetchData();
  }, [articleId]);

  return {
    data,
  };
};
