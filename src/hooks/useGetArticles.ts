import { useEffect, useState } from 'react';

import { listArticles } from '@/api';

import { Article } from '@/types/ArticlesType';

export const useGetArticles = () => {
  const [data, setData] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listArticles();
      setData(data.items);
    };

    fetchData();
  }, []);

  return {
    data,
  };
};
