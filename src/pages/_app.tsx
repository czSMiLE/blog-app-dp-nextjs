import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { AuthProvider } from '@/context';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
