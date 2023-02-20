import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import formatTime from '@/utils/formatTime';

import { Article } from '@/types/ArticlesType';

type RecentArticlesContentProps = {
  data: Article[];
};

const RecentArticlesContent = ({ data }: RecentArticlesContentProps) => {
  const [images, setImages] = useState<Record<string, string>>({});

  const fetchImages = async (imageId: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}`,
      {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    const imageData = Buffer.from(response.data, 'binary').toString('base64');
    setImages((prevImages) => ({ ...prevImages, [imageId]: imageData }));
  };

  useEffect(() => {
    data.forEach((item) => {
      fetchImages(item.imageId);
    });
  }, [data]);

  return (
    <>
      <h1 className='font-2xl mb-16 font-medium'>Recent articles</h1>
      <div className='flex flex-col gap-8'>
        {data.map((item) => {
          const image = images[item.imageId];

          return (
            <div key={item.articleId} className='flex flex-row gap-4'>
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
                <h2 className='text-2xl font-medium'>{item.title}</h2>
                <p className='text-[#6C757D]'>{formatTime(item.createdAt)}</p>
                <p className='text-[#212529]'>{item.perex}</p>
                <Link
                  className='text-[#2B7EFB] hover:underline'
                  href={`/articles/${item.articleId}`}
                >
                  Read whole article
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

RecentArticlesContent.displayName = 'RecentArticlesContent';

export default RecentArticlesContent;
