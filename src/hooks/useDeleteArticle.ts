import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';

import api from '@/libs/api';

type DeleteArticleStatus = {
  success: boolean;
  error: boolean;
};

const useDeleteArticle = () => {
  const [status, setStatus] = useState<DeleteArticleStatus>({
    success: false,
    error: false,
  });
  const router = useRouter();
  const { access_token } = parseCookies();

  const deleteArticle = async (articleId: string | string[] | undefined) => {
    try {
      await api({
        url: `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
        method: 'DELETE',
        headers: {
          Authorization: access_token,
          'Content-Type': 'application/json',
        },
        data: {
          articleId: articleId,
        },
      });

      setStatus({ success: true, error: false });
      router.reload();
    } catch (error) {
      setStatus({ success: false, error: true });
    }
  };

  return {
    deleteArticle,
    status,
  };
};

export default useDeleteArticle;
