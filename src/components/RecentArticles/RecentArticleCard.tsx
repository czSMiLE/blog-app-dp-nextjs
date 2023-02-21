import Image from 'next/image';
import Link from 'next/link';

import useImageFetch from '@/hooks/useImageFetch';

import formatTime from '@/utils/formatTime';

import { Article } from '@/types/ArticlesType';

type RecentArticleCardProps = {
  article: Article;
};

const RecentArticleCard = ({ article }: RecentArticleCardProps) => {
  const { image } = useImageFetch({ imageId: article.imageId });

  return (
    <div key={article.articleId} className='flex flex-row gap-4'>
      <div>
        {image && (
          <Image
            src={`data:image/jpeg;base64,${image}`}
            alt='Cat'
            width={175}
            height={175}
          />
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-medium'>{article.title}</h2>
        <p className='text-mediumGrey'>{formatTime(article.createdAt)}</p>
        <p className='text-dark'>{article.perex}</p>
        <Link
          className='text-primary-100 hover:underline'
          href={`/articles/${article.articleId}`}
        >
          Read whole article
        </Link>
      </div>
    </div>
  );
};

RecentArticleCard.displayName = 'RecentArticleCard';

export default RecentArticleCard;
