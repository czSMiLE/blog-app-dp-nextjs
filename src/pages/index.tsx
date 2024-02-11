import { GetServerSideProps } from 'next';

import { RecentArticles } from '@/components';

import { listArticles } from '@/api';
import { Layout } from '@/layout';

import { Article } from '@/types/ArticlesType';

type HomePageProps = {
  data: Article[];
};

const HomePage = ({ data }: HomePageProps) => {
  return (
    <Layout seoProps={{ templateTitle: 'Recent articles' }}>
      <div className='my-16'>
        <RecentArticles data={data} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const data = await listArticles();

  return {
    props: {
      data: data.items,
    },
  };
};

HomePage.displayName = 'HomePage';

export default HomePage;
