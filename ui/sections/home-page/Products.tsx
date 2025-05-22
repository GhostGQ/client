'use client';

import {FaArrowRightLong} from 'react-icons/fa6';
import AnimatedCards from '@/ui/components/AnimatedCards';
import {useTranslation} from 'next-i18next';
import {useEffect, useState} from 'react';
import Link from 'next/link';

const Products = () => {
  const {t} = useTranslation('main');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className='py-20'>
      <div className='container'>
        <div className='flex sm:justify-between justify-center sm:mb-12 mb-6'>
          <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>
            {t('products.title')}
          </h2>
          <Link href='/products'>
            <button className='sm:flex hidden gap-2 items-center '>
              <span className='text-[#2A3F87]'>{t('products.button')}</span>
              <span className='bg-[#F3F3F3] py-2 px-5 rounded-full'>
                <FaArrowRightLong />
              </span>
            </button>
          </Link>
        </div>
        <AnimatedCards />
      </div>
    </section>
  );
};

export default Products;
