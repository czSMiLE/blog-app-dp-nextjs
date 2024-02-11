import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetArticle } from '@/hooks/useGetArticle';
import useUpdateArticle from '@/hooks/useUpdateArticle';

import { Input } from '@/components';

import { withAuth, withAuthServerSideProps } from '@/hocs';
import { Layout } from '@/layout';

import { ArticleDetail } from '@/types/ArticleDetailType';

const ArticleEditPage = () => {
  const router = useRouter();
  const articleId = router.query.id;
  const { data } = useGetArticle(articleId);
  const { register, handleSubmit, setValue } = useForm();

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
    <Layout seoProps={{ templateTitle: 'Admin panel - Edit article' }}>
      <form className='max-w-3xl' onSubmit={handleSubmit(onSumbit)}>
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
