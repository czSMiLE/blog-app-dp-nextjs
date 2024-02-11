import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
