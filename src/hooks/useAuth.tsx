import axios from 'axios';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext, useState } from 'react';

import { LoginType } from '@/types/LoginType';

type User = {
  username: string;
};

type AuthContextData = {
  user: User | null;
  logIn: (formData: LoginType) => Promise<void>;
  logOut: () => void;
  error: boolean;
  children?: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const logIn = async (formData: LoginType) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
        data: JSON.stringify(formData),
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_TENANT_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      if (data.access_token) {
        setCookie(null, 'access_token', data.access_token, {
          maxAge: data.expires_in,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        setUser({ username: formData.username });
        router.push('/admin');
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 400 || error.response?.status === 401)
      ) {
        setError(true);
      } else {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  const logOut = () => {
    destroyCookie(null, 'access_token', {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
