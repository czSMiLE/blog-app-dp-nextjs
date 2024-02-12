import { useState } from 'react';

import { ArticlesAPI, handleError } from '@/api';

import { FetchAPIStatus } from '@/types';
import { ArticleDetailType } from '@/types';

export const useUpdateArticle = () => {
  const [status, setStatus] = useState<FetchAPIStatus>({
    success: false,
    loading: false,
    error: false,
  });

  const handleUpdateArticle = async (
    formData: Partial<ArticleDetailType>,
    articleId: string | string[] | undefined
  ) => {
    setStatus((prevStatus) => ({ ...prevStatus, loading: true }));
    try {
      await ArticlesAPI.updateArticle(articleId, formData);

      setStatus({ loading: false, success: true, error: false });
      return;
    } catch (error) {
      handleError(error, 'Error while updating article');
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return {
    handleUpdateArticle,
    status,
  };
};
