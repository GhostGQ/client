'use client';

import {useProducts} from '@/hooks/useProducts';
import React from 'react';
import ProductCard from './ProductCard';
import {FaArrowRightLong} from 'react-icons/fa6';
import {useTranslation} from 'react-i18next';
import Link from 'next/link';

const SuggestionProducts = () => {
  const {i18n} = useTranslation();
  const lang = i18n.language.startsWith('uz') ? 'uz' : 'ru';
  const {data, isLoading, isError} = useProducts({
    limit: 3,
    page: 1,
    filters: {},
  });

  return (
    <section className='pb-10 md:block hidden'>
      <div className='container'>
        <div className='text-[#2A3F87] flex justify-between items-center mb-8'>
          <h3 className='text-[24px] font-semibold'>
            {lang === 'uz' ? "Shunga o'xshash mahsulotlar" : 'Похожие продукты'}
          </h3>
          <Link href={'/products'} className='flex gap-2 items-center'>
            <span className='text-[18px] font-medium'>
              {lang === 'uz'
                ? "Boshqa mahsulotlarni ko'rsatish"
                : 'Показать другие товары'}
            </span>
            <span className='bg-[#F3F3F3] py-2 px-5 rounded-full'>
              <FaArrowRightLong color='#000' />
            </span>
          </Link>
        </div>
        <div className='grid grid-cols-3 gap-4 w-full'>
          {data?.products.map((product: any) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestionProducts;
