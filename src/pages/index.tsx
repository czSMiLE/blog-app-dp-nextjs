import { GetServerSideProps } from 'next';

import fetchArticles from '@/libs/fetchArticles';

import { RecentArticles, Seo } from '@/components';

import { Layout } from '@/layout';

import { Article } from '@/types/ArticlesType';

type HomePageProps = {
  data: Article[];
};

const HomePage = ({ data }: HomePageProps) => {
  return (
    <Layout>
      <Seo templateTitle='Recent articles' />
      <div className='my-16'>
        <RecentArticles data={data} />
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
      data: data.items,
    },
  };
};

HomePage.displayName = 'HomePage';

export default HomePage;
