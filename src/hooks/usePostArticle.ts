import { parseCookies } from 'nookies';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import api from '@/libs/api';

import { ArticleDetail } from '@/types/ArticleDetailType';

type ArticleSubmit = Partial<ArticleDetail>;

type PostArticleStatus = {
  success: boolean;
  error: boolean;
};

export type UploadResponse = { imageId: string }[];

const usePostArticle = () => {
  const [status, setStatus] = useState<PostArticleStatus>({
    success: false,
    error: false,
  });

  const { access_token } = parseCookies();

  const handleSubmitArticle = async (formData: ArticleSubmit) => {
    try {
      const file = formData.imageId[0];
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const uploadResponse = await api<UploadResponse>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/images`,
        method: 'POST',
        data: formDataUpload,
        headers: {
          Authorization: access_token,
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageId = uploadResponse[0].imageId;

      await api({
        url: `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        method: 'POST',
        data: {
          title: formData.title,
          perex: formData.perex,
          content: formData.content,
          imageId: imageId,
          articleId: uuidv4(),
        },
        headers: {
          Authorization: access_token,
          'Content-Type': 'application/json',
        },
      });

      // await createArticle(formDataUpload, {
      // title: formData.title,
      //perex: formData.perex,
      //content: formData.content,
      //});

      setStatus({ success: true, error: false });
      return;
    } catch (error) {
      setStatus({ success: false, error: true });
    }
  };

  return {
    handleSubmitArticle,
    status,
  };
};

export default usePostArticle;
