'use client';

import React from 'react';
import Navbar from './ui/Navbar';
import LanguageSwitcher from '@/features/LanguageSwitcher';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const location: string = usePathname();
  const isMain: boolean = location === '/';

  return (
    <header
      className={`border-b border-[#ffffff34] ${!isMain && 'bg-white'} py-7`}
    >
      <div className='container flex justify-between items-center'>
        <div className='flex items-center lg:justify-start justify-between gap-12 lg:w-3/4 w-full'>
          <Link href={'/'}>
            <img src={isMain ? '/logo.png' : '/alt_logo.png'} alt='Logo' />
          </Link>
          <Navbar isMain={isMain} />
        </div>
        <div className='hidden md:block'>
          <LanguageSwitcher isMain={isMain} />
        </div>
      </div>
    </header>
  );
};

export default Header;
