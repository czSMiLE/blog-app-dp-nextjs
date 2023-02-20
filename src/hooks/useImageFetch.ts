import axios from 'axios';
import { useEffect, useState } from 'react';

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
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}`,
          {
            headers: {
              'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
            },
            responseType: 'arraybuffer',
          }
        );

        const imageData = Buffer.from(response.data, 'binary').toString(
          'base64'
        );
        setImage(imageData);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchImages();
  }, [imageId]);

  return { image };
};

export default useImageFetch;
