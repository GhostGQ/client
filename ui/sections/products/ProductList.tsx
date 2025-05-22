'use client';

import {useFilterStore} from '@/components/accordion/useFilterStore';
import {mockProducts} from '@/data/products';
import {Divider, Image, Button} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import {IoIosArrowForward} from 'react-icons/io';
import {useState} from 'react';

const PAGE_SIZE = 6; // Количество товаров на "странице"

const ProductList = () => {
  const {selectedFilters} = useFilterStore();
  const {i18n} = useTranslation();
  const language = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  const filterKeys = [
    'category',
    'width',
    'density',
    'dye',
    'composition',
  ] as const;

  const filteredProducts = mockProducts.filter(product => {
    return filterKeys.every(key => {
      const selectedValues = selectedFilters[key];
      if (!selectedValues || selectedValues.length === 0) return true;
      return selectedValues.includes(product[key]);
    });
  });

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 w-full h-fit'>
        {filteredProducts.length === 0 ? (
          <div className='text-center text-gray-500 col-span-full'>
            {language === 'uz' ? 'Mahsulotlar topilmadi' : 'Товары не найдены'}
          </div>
        ) : (
          visibleProducts.map(product => (
            <div
              key={product.id}
              className='p-5 bg-[#F3F3F3] relative flex justify-center'
            >
              <Image src={product.img} w={'240px'} />
              <div className='p-3 bg-white w-[93%] shadow-md absolute bottom-4 flex justify-between cursor-pointer'>
                <div>
                  <h2 className='text-[18px] font-medium'>
                    {product.title[language]}
                  </h2>
                  <span className='text-[#7C7C7C]'>110±7 100% хлопок</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Divider orientation='vertical' h={'100%'} />
                  <IoIosArrowForward size={38} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <Button
          onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
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
