import { v4 as uuidv4 } from 'uuid';

import { API_ENDPOINTS, axiosInstance, uploadImage } from '@/api';
import { ArticlesResponse } from '@/api/types';

import { ArticleDetail } from '@/types';

export const listArticles = async () => {
  try {
    const response = await axiosInstance.get<ArticlesResponse>(
      API_ENDPOINTS.articles
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error listing articles: ${error}`);
  }
};

export const getArticleDetail = async (articleId: string) => {
  try {
    const response = await axiosInstance.get<ArticleDetail>(
      API_ENDPOINTS.articleDetail(articleId)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting article detail: ${error}`);
  }
};

export const updateArticle = async (
  articleId: string | string[] | undefined,
  articleData: Partial<ArticleDetail>
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

export const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.articleDetail(articleId));
  } catch (error) {
    throw new Error(`Error while deleting article ${error}`);
  }
};

export const createArticle = async (
  imageFormData: FormData,
  articleData: Partial<ArticleDetail>
): Promise<void> => {
  try {
    //console.log(imageFormData);
    //console.log(articleData);
    const imageId = await uploadImage(imageFormData);

    //console.log(imageId);

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
