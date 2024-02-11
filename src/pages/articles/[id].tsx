import { GetServerSideProps } from 'next';

import fetchArticle from '@/libs/fetchArticle';
import useImageFetch from '@/hooks/useImageFetch';

import { ArticleDetailContent, Seo } from '@/components';

import { Layout } from '@/layout';

import { ArticleDetail } from '@/types/ArticleDetailType';

type ArticlesDetailPageProps = { data: ArticleDetail };

const ArticlesDetailPage = ({ data }: ArticlesDetailPageProps) => {
  const { image } = useImageFetch({ imageId: data.imageId });

  return (
    <Layout>
      <Seo templateTitle={data.title} description={data.perex} />
      <div className='mb-16'>
        <ArticleDetailContent data={data} image={image} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesDetailPageProps,
  { id: string }
> = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const data = await fetchArticle(params?.id);

  return {
    props: {
      data,
    },
  };
};

ArticlesDetailPage.displayName = 'ArticlesDetailPage';

export default ArticlesDetailPage;
