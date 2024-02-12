import axios from 'axios';
import { parseCookies } from 'nookies';

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
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error('An error occurred');
    }
    return Promise.reject(error);
  }
);
