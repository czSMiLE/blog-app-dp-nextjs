import Image from 'next/image';
import { FC } from 'react';

import { useImageFetch } from '@/hooks';

import { IArticleDetailProps, Skeleton } from '@/components';

import { formatTime } from '@/utils';

export const ArticleDetail: FC<IArticleDetailProps> = ({ data }) => {
  const { image, status } = useImageFetch({ imageId: data.imageId });

  return (
    <>
      <h1 className='font-2xl mb-4 mt-8 font-medium'>{data.title}</h1>
      <p className='mb-4 text-mediumGrey'>{formatTime(data.createdAt)}</p>
      {status.loading && <Skeleton className='h-56 w-96' />}
      {image && !status.error && (
        <Image src={image} alt={data.title} width={460} height={220} />
      )}
      <p className='mt-4 text-dark'>{data.content}</p>
    </>
  );
};
