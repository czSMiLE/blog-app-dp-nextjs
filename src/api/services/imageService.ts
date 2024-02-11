import { UploadResponse } from '@/hooks';

import { API_ENDPOINTS, axiosInstance } from '@/api';

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post<UploadResponse>(
      API_ENDPOINTS.images,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const imageId = response.data[0].imageId;
    return imageId;
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`);
  }
};

export const fetchImage = async (imageId: string): Promise<string | null> => {
  try {
    const response = await axiosInstance.get<ArrayBuffer>(
      API_ENDPOINTS.imageDetail(imageId),
      { responseType: 'arraybuffer' }
    );
    const imageDataUrl = Buffer.from(response.data).toString('base64');
    return imageDataUrl;
  } catch (error) {
    throw new Error(`Error fetching image: ${error}`);
  }
};
