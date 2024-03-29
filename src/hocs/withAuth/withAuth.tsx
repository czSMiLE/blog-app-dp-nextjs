import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { IWithAuthProps } from '@/hocs';

export const withAuth = (Page: React.ComponentType<any>) => {
  const WithAuth = ({ isAuth, ...pageProps }: IWithAuthProps) => {
    const router = useRouter();

    if (!isAuth) {
      router.push('/login');
      return null;
    }

    return <Page {...pageProps} />;
  };

  WithAuth.displayName = `WithAuth(${
    Page.displayName || Page.name || 'Component'
  })`;

  return WithAuth;
};

export const withAuthServerSideProps = (
  getServerSidePropsFunc?: GetServerSideProps
) => {
  return async (context: GetServerSidePropsContext) => {
    const { access_token } = parseCookies(context);

    if (!access_token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    let pageProps = {};
    if (getServerSidePropsFunc) {
      const serverSideProps = await getServerSidePropsFunc(context);
      if ('props' in serverSideProps) {
        pageProps = serverSideProps.props;
      }
    }

    return {
      props: {
        isAuth: true,
        ...(pageProps || {}),
      },
    };
  };
};
