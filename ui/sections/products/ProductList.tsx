'use client';

import {useFilterStore} from '@/components/accordion/useFilterStore';
import {Button} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import {useState} from 'react';
import {useProducts} from '@/hooks/useProducts';
import ProductCard from './ProductCard';

const ProductList = () => {
  const {selectedFilters} = useFilterStore();
  const {i18n} = useTranslation();
  const language = i18n.language.startsWith('uz') ? 'uz' : 'ru';
  const [page, setPage] = useState(1);

  // Преобразуем строки в числа для API
  const numericFilters = Object.fromEntries(
    Object.entries(selectedFilters).map(([key, values]) => [
      key,
      values.map(Number),
    ])
  );

  const {data, isLoading, isError} = useProducts({
    page,
    filters: numericFilters,
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const limit = data?.limit || 12;
  const hasMore = page * limit < total;

  if (isLoading) {
    return <div className='text-center'>Загрузка...</div>;
  }

  if (isError) {
    return <div className='text-center text-red-500'>Ошибка загрузки</div>;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 w-full h-fit'>
        {products.length === 0 ? (
          <div className='text-center text-gray-500 col-span-full'>
            {language === 'uz' ? 'Mahsulotlar topilmadi' : 'Товары не найдены'}
          </div>
        ) : (
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {hasMore && (
        <Button
          onClick={() => setPage(prev => prev + 1)}
          className='mx-auto mt-6'
          variant='outline'
          size='md'
        >
          {language === 'uz' ? 'Yana ko‘rsatish' : 'Показать ещё'}
        </Button>
      )}
    </div>
  );
};

export default ProductList;
