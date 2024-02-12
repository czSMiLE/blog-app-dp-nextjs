import { API_ENDPOINTS, axiosInstance, ImageUploadResponse } from '@/api';

const uploadImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post<ImageUploadResponse>(
      API_ENDPOINTS.images,
      formData
    );
    const imageId = response.data[0].imageId;
    return imageId;
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`);
  }
};

const fetchImage = async (imageId: string): Promise<string | null> => {
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

export const ImageAPI = {
  uploadImage,
  fetchImage,
};
