import { ReactNode } from 'react';

export type AuthContextData = {
  user: User | null;
  logIn: (formData: LoginType) => Promise<void>;
  logOut: () => void;
  error: boolean;
  children?: ReactNode;
};

export type LoginType = {
  username: string;
  password: string;
};

export type User = {
  username: string;
};

export type AuthResponse = { access_token: string; expires_in: number };
