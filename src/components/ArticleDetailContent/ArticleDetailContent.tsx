import Image from 'next/image';

import formatTime from '@/utils/formatTime';

import { ArticleDetail } from '@/types/ArticleDetailType';

type ArticleDetailContentProps = {
  data: ArticleDetail;
  image: string | null;
};

const ArticleDetailContent = ({ data, image }: ArticleDetailContentProps) => {
  return (
    <>
      <h1 className='font-2xl mt-8 mb-4 font-medium'>{data.title}</h1>
      <p className='mb-4 text-[#6C757D]'>{formatTime(data.createdAt)}</p>

      {image && (
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt='Cat'
          width={460}
          height={220}
        />
      )}
      <p className='mt-4 text-[#212529]'>{data.content}</p>
      
    </>
  );
};

ArticleDetailContent.displayName = 'ArticleDetailContent';

export default ArticleDetailContent;
