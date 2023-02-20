import { GetServerSideProps } from 'next';

import fetchArticles from '@/libs/fetchArticles';

import RecentArticlesContent from '@/components/RecentArticlesContent/RecentArticlesContent';
import Seo from '@/components/Seo';

import Layout from '@/layout/Layout';

import { Article } from '@/types/ArticlesType';

type HomePageProps = { data: Article[] };

const HomePage = ({ data }: HomePageProps) => {
  return (
    <Layout>
      <Seo templateTitle='Recent articles' />
      <div className='my-16'>
        <RecentArticlesContent data={data} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const data = await fetchArticles();

  return {
    props: {
      data,
    },
  };
};

HomePage.displayName = 'HomePage';

export default HomePage;
