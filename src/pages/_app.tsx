import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { AuthProvider } from '@/hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
