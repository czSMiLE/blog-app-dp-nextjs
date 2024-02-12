export type ArticleDetailType = Article & {
  content: string;
};

export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: Date;
  lastUpdatedAt: Date;
};
