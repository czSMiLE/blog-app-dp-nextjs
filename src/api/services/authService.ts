import { destroyCookie, setCookie } from 'nookies';

import {
  API_ENDPOINTS,
  AuthResponse,
  axiosInstance,
  handleError,
  LoginData,
} from '@/api';

const login = async (data: LoginData): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.login,
      data
    );

    if (response.data && response.data.access_token) {
      const { access_token, expires_in } = response.data;
      setCookie(null, 'access_token', access_token, {
        maxAge: expires_in,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    handleError(error, 'Login failed');
    return false;
  }
};

const logout = (): void => {
  destroyCookie(null, 'access_token', {
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
};

export const AuthAPI = {
  login,
  logout,
};
