import {
  API_ENDPOINTS,
  axiosInstance,
  handleError,
  ImageUploadResponse,
} from '@/api';

const uploadImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post<ImageUploadResponse>(
      API_ENDPOINTS.images,
      formData
    );
    const imageId = response.data[0].imageId;
    return imageId;
  } catch (error) {
    handleError(error, 'Error uploading fime');
  }
};

const fetchImage = async (imageId: string) => {
  try {
    const response = await axiosInstance.get<ArrayBuffer>(
      API_ENDPOINTS.imageDetail(imageId),
      { responseType: 'arraybuffer' }
    );
    const imageDataUrl = Buffer.from(response.data).toString('base64');
    return imageDataUrl;
  } catch (error) {
    handleError(error, 'Error fetching image');
  }
};

export const ImageAPI = {
  uploadImage,
  fetchImage,
};
