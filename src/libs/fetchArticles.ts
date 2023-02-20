import axios from 'axios';

import { Article } from '@/types/ArticlesType';

async function fetchArticles(): Promise<Article[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles`,
      {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
        },
      }
    );

    return data?.items ?? [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Page not found');
    }
    throw error;
  }
}

export default fetchArticles;
