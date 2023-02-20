import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import fetchArticle from '@/libs/fetchArticle';
import useUpdateArticle from '@/hooks/useUpdateArticle';

import Seo from '@/components/Seo';

import { withAuth, withAuthServerSideProps } from '@/hocs/withAuth';
import Layout from '@/layout/Layout';

import { ArticleDetail } from '@/types/ArticleDetailType';

const ArticleEditPage = () => {
  const router = useRouter();
  const [data, setData] = useState<ArticleDetail>();
  const { register, handleSubmit, setValue } = useForm();

  const articleId = router.query.id;

  useEffect(() => {
    const getArticle = async () => {
      try {
        const article = await fetchArticle(articleId as string);
        setData(article);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    if (articleId) {
      getArticle();
    }
  }, [articleId]);

  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('perex', data.perex);
      setValue('content', data.content);
    }
  }, [data, setValue]);

  const { handleUpdateArticle, status } = useUpdateArticle();

  const onSumbit = async (formData: Partial<ArticleDetail>) => {
    handleUpdateArticle(formData, articleId);
  };

  return (
    <Layout>
      <Seo templateTitle='Admin panel - Edit article' />
      <form className='max-w-3xl' onSubmit={handleSubmit(onSumbit)}>
        <div className='mt-8 mb-4 flex flex-row items-center gap-8'>
          <h1 className='font-2xl font-medium'>Edit article</h1>
          <button type='submit' className='rounded bg-[#007BFF] p-4 text-white'>
            Publish article
          </button>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>Article Title</label>
            <input
              id='title'
              {...register('title', {
                required: true,
              })}
              placeholder='My First Article'
              className='rounded border border-[#DFDFDF] p-4'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='perex'>Description</label>
            <input
              id='perex'
              {...register('perex', {
                required: true,
              })}
              placeholder='Perex'
              className='rounded border border-[#DFDFDF] p-4'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>Content</label>
            <textarea
              id='content'
              {...register('content', {
                required: true,
              })}
              className='rounded border border-[#DFDFDF] p-4'
              placeholder='Enter content'
            ></textarea>
          </div>
        </div>
      </form>
      {status.error && (
        <div className='mt-6 text-red-500'>
          There was an error while editing the article
        </div>
      )}
      {status.success && (
        <div className='mt-6 text-green-500'>
          Article was successfully edited
        </div>
      )}
    </Layout>
  );
};

export default withAuth(ArticleEditPage);
export const getServerSideProps = withAuthServerSideProps();
