import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { handleError } from '@/api';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const { access_token } = parseCookies();

  config.headers['X-API-KEY'] = process.env.NEXT_PUBLIC_TENANT_API_KEY;

  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          handleError(status, 'Unauthorized');
          break;
        case 403:
          handleError(status, 'Forbidden');
          break;
        case 500:
          handleError(status, 'Server error');
          break;
        default:
          handleError(error.message, 'Error');
      }
    }
    return Promise.reject(error);
  }
);
