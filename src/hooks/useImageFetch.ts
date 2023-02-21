import { useEffect, useState } from 'react';

import api from '@/libs/api';

type UseImageFetchProps = {
  imageId: string;
};

type UseImageFetchReturn = {
  image: string | null;
};

const useImageFetch = ({
  imageId,
}: UseImageFetchProps): UseImageFetchReturn => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await api<ArrayBuffer>({
          url: `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}`,
          method: 'GET',
          responseType: 'arraybuffer',
        });

        const imageDataUrl = Buffer.from(imageData).toString('base64');
        setImage(imageDataUrl);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchImages();
  }, [imageId]);

  return { image };
};

export default useImageFetch;
