import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { useImageFetch } from '@/hooks';

import { IRecentArticleCardProps } from '@/components';

import { formatTime } from '@/utils';

export const RecentArticleCard: FC<IRecentArticleCardProps> = ({ article }) => {
  const { image, status } = useImageFetch({ imageId: article.imageId });

  return (
    <div className='flex flex-row gap-4'>
      {status.loading && <p>Loading article image...</p>}
      {status.error && <p>Error loading image.</p>}
      {image && !status.error && (
        <>
          <div>
            <Image
              src={`data:image/jpeg;base64,${image}`}
              alt={article.title}
              width={175}
              height={175}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-medium'>{article.title}</h2>
            <p className='text-mediumGrey'>{formatTime(article.createdAt)}</p>
            <p className='text-dark'>{article.perex}</p>
            <Link
              className='text-primary-100 hover:underline'
              href={`/articles/${article.articleId}`}
              aria-label={`Read whole article about ${article.title}`}
            >
              Read whole article
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
