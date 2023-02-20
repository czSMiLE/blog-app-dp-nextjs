import { NextPage } from 'next';
import Link from 'next/link';

import Seo from '@/components/Seo';

import Layout from '@/layout/Layout';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Seo templateTitle='About page' />
      <div>
        <h1 className='font-2xl mt-8 mb-4 font-medium'>About this project</h1>
        <p>
          This project is a Next.js (React) blog page made with TypeScript,
          Tailwind CSS, ESLint, Prettier, and Husky.
        </p>
        <div className='mt-1 flex flex-row gap-4'>
          <Link
            className='text-[#2B7EFB] hover:underline'
            href='https://github.com/Applifting/fullstack-exercise'
          >
            Applifting task repository
          </Link>
          <Link
            className='text-[#2B7EFB] hover:underline'
            href='https://github.com/czSMiLE/blog-app-dp-nextjs'
          >
            Source code
          </Link>
        </div>
      </div>
    </Layout>
  );
};

AboutPage.displayName = 'AboutPage';

export default AboutPage;
