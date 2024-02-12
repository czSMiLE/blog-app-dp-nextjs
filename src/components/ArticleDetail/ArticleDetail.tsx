import Image from 'next/image';
import { FC } from 'react';

import { IArticleDetailProps } from '@/components';

import { formatTime } from '@/utils';

export const ArticleDetail: FC<IArticleDetailProps> = ({ data, image }) => {
  return (
    <>
      <h1 className='font-2xl mb-4 mt-8 font-medium'>{data.title}</h1>
      <p className='mb-4 text-mediumGrey'>{formatTime(data.createdAt)}</p>

      {image && (
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt={data.title}
          width={460}
          height={220}
        />
      )}
      <p className='mt-4 text-dark'>{data.content}</p>
    </>
  );
};
