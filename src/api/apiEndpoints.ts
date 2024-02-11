export const API_ENDPOINTS = {
  login: `/login`,
  articles: `/articles`,
  articleDetail: (articleId: string) => `/articles/${articleId}`,
  images: `/images`,
  imageDetail: (imageId: string) => `/images/${imageId}`,
} as const;
