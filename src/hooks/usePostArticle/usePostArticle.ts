import { useState } from 'react';

import { ArticlesAPI } from '@/api';

import { FetchAPIStatus } from '@/types';

export const usePostArticle = () => {
  const [status, setStatus] = useState<FetchAPIStatus>({
    success: false,
    loading: false,
    error: false,
  });

  const handleSubmitArticle = async (formData) => {
    try {
      const file = formData.imageId[0];
      setStatus({ loading: true, error: false, success: false });
      await ArticlesAPI.createArticle(file, {
        title: formData.title,
        perex: formData.perex,
        content: formData.content,
      });

      setStatus({ loading: false, error: false, success: true });
    } catch (error) {
      setStatus({ loading: false, error: true, success: false });
    }
  };

  return {
    handleSubmitArticle,
    status,
  };
};
