import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks';

import { Input } from '@/components';

import { LoginData } from '@/api';
import { Layout } from '@/layout';

const LoginPage = () => {
  const { handleLogIn, status } = useAuth();
  const { register, handleSubmit } = useForm<LoginData>();

  const onSumbit = async (formData: LoginData) => {
    await handleLogIn(formData);
  };

  return (
    <Layout seoProps={{ templateTitle: 'Login page' }}>
      <main>
        <div className='mx-auto mt-16 w-96 rounded-lg p-8 shadow-lg'>
          <h1 className='text-3xl font-medium'>Log In</h1>
          <form
            className='mt-6 flex flex-col gap-2'
            onSubmit={handleSubmit(onSumbit)}
          >
            <Input
              label='Username'
              type='text'
              name='username'
              register={register}
              required
            />
            <Input
              label='Password'
              type='password'
              name='password'
              register={register}
              required
            />
            <div>
              <button
                type='submit'
                className='mt-4 rounded bg-primary-50 px-4 py-2 text-white'
              >
                Log In
              </button>
            </div>
          </form>

          {status.loading && (
            <div className='mt-6 text-blue-500'>Loading...</div>
          )}
          {status.error && (
            <div className='mt-6 text-red-500'>
              Username or password is incorrect.
            </div>
          )}
          {status.success && (
            <div className='mt-6 text-green-500'>Success! Logging you in.</div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = parseCookies(context);

  if (access_token) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
