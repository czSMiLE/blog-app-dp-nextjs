import { useForm } from 'react-hook-form';

import usePostArticle from '@/hooks/usePostArticle';

import { Input } from '@/components';
import { Seo } from '@/components';

import { withAuth, withAuthServerSideProps } from '@/hocs';
import { Layout } from '@/layout';

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
        <div className='mb-4 mt-8 flex flex-row items-center gap-8'>
          <h1 className='font-2xl font-medium'>Create new article</h1>
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
            required
            className='p-4'
            placeholder='My First Article'
          />
          <Input
            label='Description'
            type='text'
            name='perex'
            required
            register={register}
            className='p-4'
            placeholder='Perex'
          />
          <div className='flex w-36 flex-col gap-2'>
            <label
              className='rounded bg-mediumGrey px-3 py-2 text-white hover:cursor-pointer'
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
              className='rounded border border-borderGrey p-4'
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
