import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/useAuth';

import Seo from '@/components/Seo';

import Layout from '@/layout/Layout';

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
          <form className='mt-6' onSubmit={handleSubmit(onSumbit)}>
            <div className='flex flex-col gap-2'>
              <label>Username</label>
              <input
                className='rounded border border-solid border-[#DFDFDF]'
                type='text'
                {...register('username', {
                  required: true,
                })}
              />
            </div>
            <div className='mt-2 flex flex-col gap-2'>
              <label>Password</label>
              <input
                className='rounded border border-solid border-[#DFDFDF]'
                type='password'
                {...register('password', {
                  required: true,
                })}
              />
            </div>
            <div>
              <button
                type='submit'
                className='mt-4 rounded bg-[#007BFF] py-2 px-4 text-white'
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
