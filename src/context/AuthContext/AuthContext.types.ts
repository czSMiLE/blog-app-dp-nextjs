import { ReactNode } from 'react';

import { LoginData } from '@/api';

import { FetchAPIStatus } from '@/types';

export type AuthContextData = {
  user: User | null;
  handleLogIn: (formData: LoginData) => Promise<void>;
  logOut: () => void;
  status: FetchAPIStatus;
  children?: ReactNode;
};

export type User = {
  username: string;
};
