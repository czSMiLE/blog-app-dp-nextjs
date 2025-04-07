import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useGetArticleDetail, useUpdateArticle, useZodForm } from '@/hooks';

import { Input } from '@/components';

import { handleError } from '@/api';
import { withAuth, withAuthServerSideProps } from '@/hocs';
import { Layout } from '@/layout';
import { cn } from '@/utils';
import { ArticleFormData, articleSchema } from '@/validations';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: article, status: getStatus } = useGetArticleDetail(
    id as string
  );
  const { handleUpdateArticle, status: updateStatus } = useUpdateArticle();
  const [validationError, setValidationError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useZodForm(articleSchema);

  useEffect(() => {
    if (article) {
      try {
        const validatedData = articleSchema.parse({
          title: article.title,
          perex: article.perex,
          content: article.content,
        });
        reset(validatedData);
        setValidationError(null);
      } catch (error) {
        handleError(error, 'Article validation failed');
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown validation error';
        setValidationError(`Invalid article data: ${errorMessage}`);

        reset({
          title: article.title,
          perex: article.perex,
          content: article.content,
        });
      }
    }
  }, [article, reset]);

  const onSubmit = async (formData: ArticleFormData) => {
    try {
      await handleUpdateArticle(formData, id);
    } catch (error) {
      handleError(error, 'Failed to update article');
    }
  };

  const handleReset = () => {
    if (article) {
      reset({
        title: article.title,
        perex: article.perex,
        content: article.content,
      });
      setValidationError(null);
    }
  };

  if (getStatus.loading) {
    return <div>Loading...</div>;
  }

  if (getStatus.error) {
    return <div>Error loading article</div>;
  }

  return (
    <Layout seoProps={{ templateTitle: 'Admin panel - Edit article' }}>
      <form className='max-w-3xl' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 mt-8 flex flex-row items-center gap-8'>
          <h1 className='font-2xl font-medium'>Edit article</h1>
          <div className='flex gap-4'>
            <button
              type='submit'
              className={cn(
                'rounded p-4 text-white',
                updateStatus.loading
                  ? 'cursor-not-allowed bg-primary-50/50'
                  : 'bg-primary-50 hover:bg-primary-50/90'
              )}
              disabled={updateStatus.loading || !isDirty}
            >
              {updateStatus.loading ? 'Saving...' : 'Save changes'}
            </button>
            <button
              type='button'
              onClick={handleReset}
              className={cn(
                'rounded p-4 text-white',
                !isDirty
                  ? 'cursor-not-allowed bg-gray-500/50'
                  : 'bg-gray-500 hover:bg-gray-500/90'
              )}
              disabled={!isDirty}
            >
              Reset
            </button>
          </div>
        </div>
        {validationError && (
          <div className='mb-4 rounded bg-red-100 p-4 text-red-700'>
            <p className='font-medium'>Validation Error</p>
            <p>{validationError}</p>
          </div>
        )}
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
      {updateStatus.error && (
        <div className='mt-6 text-red-500'>
          There was an error while updating the article
        </div>
      )}
      {updateStatus.success && (
        <div className='mt-6 text-green-500'>
          Article was successfully updated
        </div>
      )}
    </Layout>
  );
};

export default withAuth(EditArticle);
export const getServerSideProps = withAuthServerSideProps();
