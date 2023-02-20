import { useForm } from 'react-hook-form';

import usePostArticle from '@/hooks/usePostArticle';

import Seo from '@/components/Seo';

import { withAuth, withAuthServerSideProps } from '@/hocs/withAuth';
import Layout from '@/layout/Layout';

type FormData = {
  title: string;
  content: string;
  perex: string;
  imageId: File;
};

const CreateArticle = () => {
  const { handleSubmitArticle, status } = usePostArticle();
  const { register, handleSubmit } = useForm<FormData>();

  const onSumbit = async (formData: FormData) => {
    handleSubmitArticle(formData);
  };

  return (
    <Layout>
      <Seo templateTitle='Admin panel - New article' />
      <form className='max-w-3xl' onSubmit={handleSubmit(onSumbit)}>
        <div className='mt-8 mb-4 flex flex-row items-center gap-8'>
          <h1 className='font-2xl font-medium'>Create new article</h1>
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
          <div className='flex w-36 flex-col gap-2'>
            <label
              className='rounded bg-[#6C757D] px-3 py-2 text-white hover:cursor-pointer'
              htmlFor='imageId'
            >
              Upload Image
            </label>
            <input
              type='file'
              hidden
              {...register('imageId', {
                required: true,
              })}
              accept='image/png, image/jpeg'
              id='imageId'
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
          There was an error while submitting the article
        </div>
      )}
      {status.success && (
        <div className='mt-6 text-green-500'>
          Article was successfully created
        </div>
      )}
    </Layout>
  );
};

export default withAuth(CreateArticle);
export const getServerSideProps = withAuthServerSideProps();
