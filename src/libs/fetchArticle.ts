import axios from 'axios';

import { ArticleDetail } from '@/types/ArticleDetailType';

async function fetchArticle(id: string): Promise<ArticleDetail> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
      {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Page not found');
    }
    throw error;
  }
}

export default fetchArticle;
