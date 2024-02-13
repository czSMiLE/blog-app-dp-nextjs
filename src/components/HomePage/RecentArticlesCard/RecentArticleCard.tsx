import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { useImageFetch } from '@/hooks';

import { IRecentArticleCardProps, Skeleton } from '@/components';

import { formatTime } from '@/utils';

export const RecentArticleCard: FC<IRecentArticleCardProps> = ({ article }) => {
  const { image, status } = useImageFetch({ imageId: article.imageId });

  return (
    <div className='flex flex-row gap-4'>
      <div>
        {status.loading && <Skeleton className='h-44 w-44' />}
        {image && !status.error && (
          <Image
            src={image}
            alt={article.title}
            width={175}
            height={175}
            layout='fixed'
          />
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-medium'>{article.title}</h2>
        <p className='text-mediumGrey'>{formatTime(article.createdAt)}</p>
        <p className='text-dark'>{article.perex}</p>
        <Link
          href={`/articles/${article.articleId}`}
          className='text-primary-100 hover:underline'
          aria-label={`Read whole article about ${article.title}`}
        >
          Read whole article
        </Link>
      </div>
    </div>
  );
};
