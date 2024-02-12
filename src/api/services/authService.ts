import { destroyCookie, setCookie } from 'nookies';

import { API_ENDPOINTS, AuthResponse, axiosInstance, LoginData } from '@/api';

const login = async (data: LoginData): Promise<void> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.login,
      data
    );
    const { access_token, expires_in } = response.data;

    if (access_token) {
      setCookie(null, 'access_token', access_token, {
        maxAge: expires_in,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
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
