import api from '@/libs/api';

import { ArticleDetail } from '@/types/ArticleDetailType';

const fetchArticle = async (id: string): Promise<ArticleDetail> => {
  const articles = await api<ArticleDetail>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
    method: 'GET',
  });
  return articles;
};

export default fetchArticle;
