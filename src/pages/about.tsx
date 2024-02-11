import Link from 'next/link';

import { Seo } from '@/components';

import { Layout } from '@/layout';

const AboutPage = () => {
  return (
    <Layout>
      <Seo templateTitle='About page' />
      <div>
        <h1 className='font-2xl mb-4 mt-8 font-medium'>About this project</h1>
        <p>
          This project is a Next.js (React) blog page made with TypeScript,
          Tailwind CSS, ESLint, Prettier, and Husky.
        </p>
        <div className='mt-1 flex flex-row gap-4'>
          <Link
            className='text-primary-100 hover:underline'
            href='https://github.com/Applifting/fullstack-exercise'
          >
            Applifting task repository
          </Link>
          <Link
            className='text-primary-100 hover:underline'
            href='https://github.com/czSMiLE/blog-app-dp-nextjs'
          >
            Source code
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
