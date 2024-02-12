import { v4 as uuidv4 } from 'uuid';

import { API_ENDPOINTS, axiosInstance, ImageAPI } from '@/api';
import { ArticlesResponse } from '@/api/types';

import { ArticleDetailType } from '@/types';

const listArticles = async () => {
  try {
    const response = await axiosInstance.get<ArticlesResponse>(
      API_ENDPOINTS.articles
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error listing articles: ${error}`);
  }
};

const getArticleDetail = async (articleId: string) => {
  try {
    const response = await axiosInstance.get<ArticleDetailType>(
      API_ENDPOINTS.articleDetail(articleId)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting article detail: ${error}`);
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
    throw new Error(`Error while updating article ${error}`);
  }
};

const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.articleDetail(articleId));
  } catch (error) {
    throw new Error(`Error while deleting article ${error}`);
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
    throw new Error(`Error creating article: ${error}`);
  }
};

export const ArticlesAPI = {
  listArticles,
  getArticleDetail,
  updateArticle,
  deleteArticle,
  createArticle,
};
