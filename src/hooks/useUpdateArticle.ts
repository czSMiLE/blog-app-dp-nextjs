import { parseCookies } from 'nookies';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import api from '@/libs/api';

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

  const { access_token } = parseCookies();

  const handleUpdateArticle = async (
    formData: ArticleSubmit,
    articleId: string | string[] | undefined
  ) => {
    try {
      await api({
        method: 'PATCH',
        url: `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
        data: {
          title: formData.title,
          perex: formData.perex,
          content: formData.content,
          imageId: formData.imageId,
          articleId: uuidv4(),
        },
        headers: {
          Authorization: access_token,
          'Content-Type': 'application/json',
        },
      });

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
