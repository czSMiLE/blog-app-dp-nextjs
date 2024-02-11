import { useState } from 'react';

import { updateArticle } from '@/api';

import { ArticleDetail } from '@/types/ArticleDetailType';

type ArticleSubmit = Partial<ArticleDetail>;

type UpdateArticleStatus = {
  success: boolean;
  error: boolean;
};

const useUpdateArticle = () => {
  const [status, setStatus] = useState<UpdateArticleStatus>({
    success: false,
    error: false,
  });

  const handleUpdateArticle = async (
    formData: ArticleSubmit,
    articleId: string | string[] | undefined
  ) => {
    try {
      await updateArticle(articleId, formData);

      setStatus({ success: true, error: false });
      return;
    } catch (error) {
      setStatus({ success: false, error: true });
    }
  };

  return {
    handleUpdateArticle,
    status,
  };
};

export default useUpdateArticle;
