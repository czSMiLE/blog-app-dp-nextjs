import { useEffect, useState } from 'react';

import { ImageAPI } from '@/api';

import { FetchAPIStatus } from '@/types';

export const useImageFetch = ({ imageId }) => {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<FetchAPIStatus>({
    success: false,
    loading: false,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchAndSetImage = async () => {
      setStatus({ loading: true, error: false, success: false });
      try {
        const imageDataUrl = await ImageAPI.fetchImage(imageId);
        if (isMounted) {
          setImage(imageDataUrl);
          setStatus({ loading: false, error: false, success: true });
        }
      } catch (error) {
        if (isMounted) {
          setStatus({ loading: false, error: true, success: false });
        }
        throw new Error(`Error fetching image: ${error}`);
      }
    };

    if (imageId) {
      fetchAndSetImage();
    }

    return () => {
      isMounted = false;
    };
  }, [imageId]);

  return { image, status };
};
