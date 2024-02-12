import { useRouter } from 'next/router';
import { useState } from 'react';

import { ArticlesAPI } from '@/api';

import { FetchAPIStatus } from '@/types';

export const useDeleteArticle = () => {
  const [status, setStatus] = useState<FetchAPIStatus>({
    success: false,
    loading: false,
    error: false,
  });
  const router = useRouter();

  const handleDeleteArticle = async (
    articleId: string | string[] | undefined
  ) => {
    setStatus((prevStatus) => ({ ...prevStatus, loading: true }));
    try {
      await ArticlesAPI.deleteArticle(articleId as string);

      setStatus({ loading: false, success: true, error: false });
      router.reload();
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return {
    handleDeleteArticle,
    status,
  };
};
