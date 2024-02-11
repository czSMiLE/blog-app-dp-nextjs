import { useEffect, useState } from 'react';

import { fetchImage } from '@/api';

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
    const fetchAndSetImage = async () => {
      try {
        const imageDataUrl = await fetchImage(imageId);
        setImage(imageDataUrl);
      } catch (error) {
        throw new Error(`Error fetching image: ${error}`);
      }
    };

    if (imageId) {
      fetchAndSetImage();
    }
  }, [imageId]);

  return { image };
};

export default useImageFetch;
