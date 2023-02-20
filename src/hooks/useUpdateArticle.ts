import axios from 'axios';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ArticleDetail } from '@/types/ArticleDetailType';

type ArticleSubmit = Partial<ArticleDetail>;

const useUpdateArticle = () => {
  const [status, setStatus] = useState({ success: false, error: false });

  const { access_token } = parseCookies();

  const handleUpdateArticle = async (
    formData: ArticleSubmit,
    articleId: string | string[] | undefined
  ) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
        data: {
          title: formData.title,
          perex: formData.perex,
          content: formData.content,
          imageId: formData.imageId,
          articleId: uuidv4(),
        },
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
          Authorization: access_token,
          'Content-Type': 'application/json',
        },
      });

      setStatus({ success: true, error: false });
      return;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response.status >= 400
      ) {
        setStatus({ success: false, error: true });
      } else {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  return {
    handleUpdateArticle,
    status,
  };
};

export default useUpdateArticle;
