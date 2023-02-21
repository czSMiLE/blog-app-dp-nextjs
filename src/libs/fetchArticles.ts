import api from '@/libs/api';

import { Article } from '@/types/ArticlesType';

type ArticlesResponse = {
  items: Article[];
};

const fetchArticles = async (): Promise<ArticlesResponse> => {
  const articles = await api<ArticlesResponse>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/articles`,
    method: 'GET',
  });
  return articles;
};

export default fetchArticles;
