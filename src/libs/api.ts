import axios, { AxiosRequestConfig } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type FetchDataConfig = {
  url: string;
  method: HttpMethod;
  data?: unknown;
  headers?: Record<string, string>;
  responseType?: any;
};

async function api<T>(config: FetchDataConfig): Promise<T> {
  const axiosConfig: AxiosRequestConfig = {
    url: config.url,
    method: config.method,
    data: config.data,
    headers: {
      ...config.headers,
      'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
    },
    responseType: config.responseType,
  };
  try {
    const { data } = await axios(axiosConfig);

    return data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status &&
      error.response.status >= 400
    ) {
      throw new Error('Not found');
    }
    throw error;
  }
}

export default api;
