import { GetServerSideProps } from 'next';

import { EmptyState, ErrorState, RecentArticles } from '@/components';

import { ArticlesAPI } from '@/api';
import { Layout } from '@/layout';

import { Article } from '@/types';

interface IHomePageProps {
  data: Article[];
  isEmpty?: boolean;
  error?: string;
}

const HomePage = ({ data, isEmpty, error }: IHomePageProps) => {
  return (
    <Layout seoProps={{ templateTitle: 'Recent articles' }}>
      <div className='my-16'>
        {isEmpty && !error && <EmptyState />}
        {error && <ErrorState error={error} />}
        {!isEmpty && !error && <RecentArticles data={data} />}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  IHomePageProps
> = async () => {
  try {
    const response = await ArticlesAPI.listArticles();

    if (!response.items || response.items.length === 0) {
      return {
        props: {
          data: [],
          isEmpty: true,
        },
      };
    }

    return {
      props: {
        data: response.items,
      },
    };
  } catch (error: unknown) {
    let errorMessage = 'Failed to load articles.';

    if (error instanceof Error) {
      errorMessage = `Failed to load articles: ${error.message}`;
    }

    return {
      props: {
        data: [],
        error: errorMessage,
      },
    };
  }
};

export default HomePage;
