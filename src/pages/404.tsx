import Link from 'next/link';
import { RiAlarmWarningFill } from 'react-icons/ri';

import { Layout } from '@/layout';

const NotFoundPage = () => {
  return (
    <Layout seoProps={{ templateTitle: 'Not Found' }}>
      <main>
        <section className='bg-white' aria-label='Page Not Found'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
              aria-hidden='true'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <Link
              className='mt-4 md:text-lg'
              href='/'
              aria-label='Back to Home'
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
