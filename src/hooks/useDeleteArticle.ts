import axios from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';

const useDeleteArticle = () => {
  const [status, setStatus] = useState({ success: false, error: false });
  const router = useRouter();
  const { access_token } = parseCookies();

  const deleteArticle = async (articleId: string | string[] | undefined) => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
        data: {
          articleId: articleId,
        },
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
          Authorization: access_token,
          'Content-Type': 'application/json',
        },
      });

      setStatus({ success: true, error: false });
      router.reload();
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
    deleteArticle,
    status,
  };
};

export default useDeleteArticle;
