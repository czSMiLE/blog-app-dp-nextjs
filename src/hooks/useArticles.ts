import axios from 'axios';
import { useEffect, useState } from 'react';

import { Article } from '@/types/ArticlesType';

export const useArticles = () => {
  const [data, setData] = useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/articles`,
          {
            headers: {
              'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
            },
          }
        );

        setData(response.items);
      } catch (error: unknown) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};
