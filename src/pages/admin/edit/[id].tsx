import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetArticleDetail, useUpdateArticle } from '@/hooks';

import { Input } from '@/components';

import { withAuth, withAuthServerSideProps } from '@/hocs';
import { Layout } from '@/layout';

import { ArticleDetailType } from '@/types';

const ArticleEditPage = () => {
  const router = useRouter();
  const articleId = router.query.id;
  const { data } = useGetArticleDetail(articleId);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        perex: data.perex,
        content: data.content,
      });
    }
  }, [data, reset]);

  const { handleUpdateArticle, status } = useUpdateArticle();

  const onSubmit = async (formData: Partial<ArticleDetailType>) => {
    await handleUpdateArticle(formData, articleId);
  };

  return (
    <Layout seoProps={{ templateTitle: 'Admin panel - Edit article' }}>
      <form className='max-w-3xl' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 mt-8 flex flex-row items-center gap-8'>
          <h1 className='font-2xl font-medium'>Edit article</h1>
          <button
            type='submit'
            className='rounded bg-primary-50 p-4 text-white'
          >
            Publish article
          </button>
        </div>
        <div className='flex flex-col gap-8'>
          <Input
            label='Article Title'
            type='text'
            name='title'
            register={register}
            className='p-4'
            placeholder='My First Article'
          />
          <Input
            label='Description'
            type='text'
            name='perex'
            register={register}
            className='p-4'
            placeholder='Perex'
          />
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>Content</label>
            <textarea
              id='content'
              {...register('content', {
                required: true,
              })}
              className='rounded border border-borderGrey p-4'
              placeholder='Enter content'
            ></textarea>
          </div>
        </div>
      </form>
      {status.loading && <div className='mt-6 text-blue-500'>Loading...</div>}
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
