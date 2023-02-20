import Header from '@/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='layout'>{children}</main>
    </div>
  );
}
