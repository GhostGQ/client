'use client';

import LanguageSwitcher from '@/features/LanguageSwitcher';
import {Burger} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';

const Navbar = ({isMain}: {isMain: boolean}) => {
  const {t} = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [opened, {toggle, close}] = useDisclosure(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    {key: 'nav.home', path: '/'},
    {key: 'nav.about', path: '/about'},
    {key: 'nav.production', path: '/production'},
    {key: 'nav.products', path: '/products'},
    {key: 'nav.news', path: '/news-and-blog'},
    {key: 'nav.contacts', path: '/contacts'},
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <ul
        className={`hidden lg:flex ${
          isMain ? 'text-white' : 'text-[#2A3F87]'
        } w-full text-[16px] font-medium justify-between gap-3`}
      >
        {navItems.map(item => (
          <li key={item.key}>
            <Link
              href={item.path}
              className={`relative pb-1 hover:text-blue-300 transition whitespace-nowrap
                ${
                  router.pathname === item.path
                    ? `text-blue-400 font-medium after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[120%] ${
                        isMain ? 'after:bg-white' : 'after:bg-[#2A3F87]'
                      }`
                    : ''
                }`}
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>

      <Burger
        opened={opened}
        onClick={toggle}
        className='lg:hidden z-50'
        color={isMain ? 'white' : 'dark'}
        size='md'
      />

      {/* Mobile Menu Overlay */}
      {opened && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-40 lg:hidden'>
          <div className='container h-full flex flex-col justify-center items-center'>
            <ul className='text-white text-xl space-y-8 flex flex-col items-center text-center'>
              {navItems.map(item => (
                <li key={item.key}>
                  <Link
                    href={item.path}
                    className={`hover:text-blue-300 transition ${
                      router.pathname === item.path
                        ? 'text-blue-400 font-medium'
                        : ''
                    }`}
                    onClick={close}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <LanguageSwitcher isMain={isMain} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
