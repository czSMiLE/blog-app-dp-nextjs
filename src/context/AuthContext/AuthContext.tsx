import { useRouter } from 'next/router';
import { createContext, useState } from 'react';

import { AuthAPI, LoginData } from '@/api';
import { AuthContextData, User } from '@/context';

import { FetchAPIStatus } from '@/types';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<FetchAPIStatus>({
    success: false,
    loading: false,
    error: false,
  });
  const router = useRouter();

  const handleLogIn = async (formData: LoginData) => {
    setStatus({ loading: true, success: false, error: false });
    try {
      await AuthAPI.login(formData);
      setUser({ username: formData.username });
      setStatus({ loading: false, success: true, error: false });
      router.push('/admin');
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      throw new Error(`Login failed: ${error}`);
    }
  };

  const logOut = () => {
    AuthAPI.logout();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogIn, logOut, status }}>
      {children}
    </AuthContext.Provider>
  );
};
