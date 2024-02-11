import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks';

import { Input } from '@/components';
import { Seo } from '@/components';

import { Layout } from '@/layout';

type FormData = {
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const { logIn, error } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();

  const onSumbit = async (formData: FormData) => {
    logIn(formData);
  };

  return (
    <Layout>
      <Seo templateTitle='Login page' />
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
          {error && (
            <div className='mt-6 text-red-500'>
              Username or password is incorrect
            </div>
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

LoginPage.displayName = 'Login';

export default LoginPage;
