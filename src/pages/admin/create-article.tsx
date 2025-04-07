import { usePostArticle, useZodForm } from '@/hooks';

import { Input } from '@/components';

import { withAuth, withAuthServerSideProps } from '@/hocs';
import { Layout } from '@/layout';
import { cn } from '@/utils';
import { CreateArticleFormData, createArticleSchema } from '@/validations';

const CreateArticle = () => {
  const { handleSubmitArticle, status } = usePostArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(createArticleSchema);

  const onSubmit = async (formData: CreateArticleFormData) => {
    handleSubmitArticle(formData);
  };

  return (
    <Layout seoProps={{ templateTitle: 'Admin panel - New article' }}>
      <form className='max-w-3xl' onSubmit={handleSubmit(onSubmit)}>
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
            error={errors.title?.message?.toString()}
          />
          <Input
            label='Description'
            type='text'
            name='perex'
            required
            register={register}
            className='p-4'
            placeholder='Perex'
            error={errors.perex?.message?.toString()}
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
              {...register('imageId')}
              accept='image/png, image/jpeg'
              id='imageId'
            />
            {errors.imageId && (
              <p className='text-sm text-red-500'>
                {errors.imageId.message?.toString()}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>Content</label>
            <textarea
              id='content'
              {...register('content')}
              className={cn(
                'rounded border',
                errors.content ? 'border-red-500' : 'border-borderGrey',
                'p-4'
              )}
              placeholder='Enter content'
            ></textarea>
            {errors.content && (
              <p className='text-sm text-red-500'>
                {errors.content.message?.toString()}
              </p>
            )}
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
