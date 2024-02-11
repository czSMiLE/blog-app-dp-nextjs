import { GetServerSideProps } from 'next';

import useImageFetch from '@/hooks/useImageFetch';

import { ArticleDetailContent } from '@/components';

import { getArticleDetail } from '@/api';
import { Layout } from '@/layout';

import { ArticleDetail } from '@/types/ArticleDetailType';

type ArticlesDetailPageProps = { data: ArticleDetail };

const ArticlesDetailPage = ({ data }: ArticlesDetailPageProps) => {
  const { image } = useImageFetch({ imageId: data.imageId });

  return (
    <Layout seoProps={{ templateTitle: data.title, description: data.perex }}>
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

  const data = await getArticleDetail(params?.id);

  return {
    props: {
      data,
    },
  };
};

export default ArticlesDetailPage;
