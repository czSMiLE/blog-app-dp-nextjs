import { GetStaticPaths, GetStaticProps } from 'next';

import { useImageFetch } from '@/hooks';

import { ArticleDetail } from '@/components';

import { ArticlesAPI } from '@/api';
import { Layout } from '@/layout';

import { ArticleDetailType } from '@/types';

interface IArticlesDetailPageProps {
  data: ArticleDetailType;
}

const ArticlesDetailPage = ({ data }: IArticlesDetailPageProps) => {
  const { image } = useImageFetch({ imageId: data.imageId });

  return (
    <Layout seoProps={{ templateTitle: data.title, description: data.perex }}>
      <div className='mb-16'>
        <ArticleDetail data={data} image={image} />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await ArticlesAPI.listArticles();
  const paths = articles.items.map((article) => ({
    params: { id: article.articleId.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<
  IArticlesDetailPageProps,
  { id: string }
> = async ({ params }) => {
  try {
    if (!params?.id) {
      return { notFound: true };
    }

    const response = await ArticlesAPI.getArticleDetail(params.id);

    if (!response) {
      return { notFound: true };
    }

    return { props: { data: response }, revalidate: 60 };
  } catch (error) {
    return { notFound: true };
  }
};

export default ArticlesDetailPage;
