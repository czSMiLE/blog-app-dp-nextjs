import { v4 as uuidv4 } from 'uuid';

import { API_ENDPOINTS, axiosInstance, handleError, ImageAPI } from '@/api';
import { ArticlesResponse } from '@/api/types';

import { ArticleDetailType } from '@/types';

const listArticles = async () => {
  try {
    const response = await axiosInstance.get<ArticlesResponse>(
      API_ENDPOINTS.articles
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Error listing articles');
    return { items: [] };
  }
};

const getArticleDetail = async (articleId: string) => {
  try {
    const response = await axiosInstance.get<ArticleDetailType>(
      API_ENDPOINTS.articleDetail(articleId)
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Error listing article detail');
  }
};

const updateArticle = async (
  articleId: string | string[] | undefined,
  articleData: Partial<ArticleDetailType>
): Promise<void> => {
  const dataPayload = {
    ...articleData,
    articleId: uuidv4(),
  };

  try {
    await axiosInstance.patch(
      API_ENDPOINTS.articleDetail(articleId as string),
      dataPayload
    );
  } catch (error) {
    handleError(error, 'Error updating article');
  }
};

const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.articleDetail(articleId));
  } catch (error) {
    handleError(error, 'Error deleting article');
  }
};

const createArticle = async (
  imageFile: File,
  articleData: Partial<ArticleDetailType>
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const imageId = await ImageAPI.uploadImage(formData);

    const dataPayload = {
      ...articleData,
      imageId: imageId,
      articleId: uuidv4(),
    };

    await axiosInstance.post(API_ENDPOINTS.articles, dataPayload);
  } catch (error) {
    handleError(error, 'Error creating article');
  }
};

export const ArticlesAPI = {
  listArticles,
  getArticleDetail,
  updateArticle,
  deleteArticle,
  createArticle,
};
