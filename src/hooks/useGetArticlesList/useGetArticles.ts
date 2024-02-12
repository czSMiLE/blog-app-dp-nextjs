import { useEffect, useState } from 'react';

import { ArticlesAPI } from '@/api';

import { FetchAPIStatus } from '@/types';
import { Article } from '@/types';

export const useGetArticlesList = () => {
  const [data, setData] = useState<Article[] | null>(null);
  const [status, setStatus] = useState<FetchAPIStatus>({
    success: false,
    loading: false,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setStatus({ loading: true, error: false, success: false });
      try {
        const data = await ArticlesAPI.listArticles();
        if (isMounted) {
          setData(data.items);
          setStatus({ loading: false, error: false, success: true });
        }
      } catch (error) {
        if (isMounted) {
          setStatus({ loading: false, error: true, success: false });
        }
        throw new Error(`Error while fetching article: ${error}`);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    status,
    data,
  };
};
