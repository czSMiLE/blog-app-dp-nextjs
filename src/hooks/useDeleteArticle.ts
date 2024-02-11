import { useRouter } from 'next/router';
import { useState } from 'react';

import { deleteArticle as deleteArticleService } from '@/api';

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

  const deleteArticle = async (articleId: string | string[] | undefined) => {
    try {
      await deleteArticleService(articleId as string);

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
