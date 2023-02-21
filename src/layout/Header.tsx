import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { useAuth } from '@/hooks/useAuth';

import Logo from '@/../public/svg/logo.svg';

const links = [
  { href: '/', label: 'Recent Articles' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const { user, logOut } = useAuth();

  return <>{user ? <HeaderLoggedIn logOut={logOut} /> : <HeaderLoggedOut />}</>;
};

const HeaderLoggedIn = ({ logOut }: any) => {
  return (
    <header className='sticky top-0 z-50 bg-[#F8F9FA]'>
      <div className='layout flex h-14 items-center justify-between'>
        <nav>
          <ul className='flex items-center justify-between gap-10'>
            <Link href='/'>
              <Logo height='2.25em' width='2.25em' />
            </Link>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link
                  href={href}
                  className='text-mediumGrey hover:text-gray-600'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex flex-row gap-10'>
          <Link href='/admin' className='text-mediumGrey hover:text-gray-600'>
            My Articles
          </Link>
          <Link
            href='/admin/create-article'
            className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
          >
            Create Article
          </Link>
          <button
            type='button'
            onClick={logOut}
            className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
          >
            <span>Logout</span>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </header>
  );
};

const HeaderLoggedOut = () => {
  return (
    <header className='sticky top-0 z-50 bg-[#F8F9FA]'>
      <div className='layout flex h-14 items-center justify-between'>
        <nav>
          <ul className='flex items-center justify-between gap-10'>
            <Link href='/'>
              <Logo height='2.25em' width='2.25em' />
            </Link>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link
                  href={href}
                  className='text-mediumGrey hover:text-gray-600'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Link
            href='/login'
            className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
          >
            <span>Login</span>
            <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
