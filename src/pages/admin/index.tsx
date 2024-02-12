import Link from 'next/link';
import { useCallback } from 'react';

import { useDeleteArticle, useGetArticlesList } from '@/hooks';

import { AdminArticlesTable, columns } from '@/components';

import { withAuth, withAuthServerSideProps } from '@/hocs';
import { Layout } from '@/layout';

const Dashboard = () => {
  const { data } = useGetArticlesList();

  const { status, handleDeleteArticle: deleteArticle } = useDeleteArticle();

  const handleDeleteArticle = useCallback(
    async (articleId: string) => {
      await deleteArticle(articleId);
    },
    [deleteArticle]
  );

  return (
    <Layout seoProps={{ templateTitle: 'Admin panel - My articles' }}>
      <div className='my-8 flex flex-row items-center gap-8'>
        <h1 className='font-2xl font-medium'>My articles</h1>
        <Link
          className='rounded bg-primary-50 p-4 text-white'
          href='/admin/create-article'
        >
          Create new article
        </Link>
      </div>
      {data ? (
        <AdminArticlesTable
          columns={columns}
          data={data}
          handleDeleteArticle={handleDeleteArticle}
        />
      ) : null}
      {status.loading && <div className='mt-6 text-blue-500'>Loading...</div>}
      {status.error && (
        <div className='mt-6 text-red-500'>
          There was an error while deleting the article
        </div>
      )}
      {status.success && (
        <div className='mt-6 text-green-500'>
          Article was successfully deleted
        </div>
      )}
    </Layout>
  );
};

export default withAuth(Dashboard);
export const getServerSideProps = withAuthServerSideProps();
