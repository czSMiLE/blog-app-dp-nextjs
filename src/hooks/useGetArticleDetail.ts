import { useEffect, useState } from 'react';

import { ArticlesAPI, handleError } from '@/api';

import { FetchAPIStatus } from '@/types';
import { ArticleDetailType } from '@/types';

export const useGetArticleDetail = (
  articleId: string | string[] | undefined
) => {
  const [data, setData] = useState<ArticleDetailType | null>(null);
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
        const fetchedData = (await ArticlesAPI.getArticleDetail(
          articleId as string
        )) as ArticleDetailType;
        if (isMounted) {
          setData(fetchedData);
          setStatus({ loading: false, error: false, success: true });
        }
      } catch (error) {
        if (isMounted) {
          handleError(error, 'Error while getting articles');
          setStatus({ loading: false, error: true, success: false });
        }
      }
    };

    if (articleId) {
      fetchData();
    } else {
      setData(null);
      setStatus({ loading: false, error: false, success: false });
    }

    return () => {
      isMounted = false;
    };
  }, [articleId]);

  return {
    data,
    status,
  };
};
