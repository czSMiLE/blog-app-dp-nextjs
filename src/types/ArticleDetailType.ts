import { Article } from './ArticlesType';

export type ArticleDetail = Article & {
  content: string;
};
