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

  return (
    <header className='sticky top-0 z-50 bg-[#F8F9FA]'>
      <div className='layout flex h-14 items-center justify-between'>
        <nav>
          <ul className='flex items-center justify-between gap-10'>
            <Link href='/'>
              <Logo height='2.25em' width='2.25em' />
            </Link>
            {links.map((item) => (
              <li
                key={`${item.href}${item.label}`}
                className='text-mediumGrey hover:text-gray-600'
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {user ? <HeaderLoggedIn logOut={logOut} /> : <HeaderLoggedOut />}
      </div>
    </header>
  );
};

type HeaderLoggedInProps = {
  logOut: () => void;
};

const HeaderLoggedIn = ({ logOut }: HeaderLoggedInProps) => {
  return (
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
  );
};

const HeaderLoggedOut = () => {
  return (
    <div>
      <Link
        href='/login'
        className='flex flex-row items-center gap-2 font-normal text-primary-100 hover:underline'
      >
        Login
        <AiOutlineArrowRight />
      </Link>
    </div>
  );
};

Header.displayName = 'Header';

export default Header;
