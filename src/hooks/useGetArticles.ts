import { useEffect, useState } from 'react';

import fetchArticles from '@/libs/fetchArticles';

import { Article } from '@/types/ArticlesType';

export const useGetArticles = () => {
  const [data, setData] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles();
      setData(data.items);
    };

    fetchData();
  }, []);

  return {
    data,
  };
};
