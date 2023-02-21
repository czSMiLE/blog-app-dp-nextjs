import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext, useState } from 'react';

import api from '@/libs/api';

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

type AuthResponse = { access_token: string; expires_in: number };

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const logIn = async (formData: LoginType) => {
    try {
      const data = await api<AuthResponse>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
        method: 'POST',
        data: formData,
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
      setError(true);
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
