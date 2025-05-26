import {Divider, Image} from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {IoIosArrowForward} from 'react-icons/io';

const ProductCard = ({product}: {product: any}) => {
  const {i18n} = useTranslation();
  const language = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  return (
    <div className='p-5 bg-[#F3F3F3] relative flex justify-center'>
      <Image src={product.img} w={'240px'} />
      <div className='p-3 bg-white w-[93%] shadow-md absolute bottom-4 flex justify-between cursor-pointer'>
        <div>
          <h2 className='text-[18px] font-medium'>
            {language === 'uz' ? product.title_uz : product.title_ru}
          </h2>
          <span className='text-[#7C7C7C]'>
            {language === 'uz' ? product.title_uz : ''}
          </span>
        </div>
        <Link
          href={{
            pathname: `/products/${product.slug}`,
            query: {id: product.id},
          }}
          prefetch={false}
          className='flex items-center gap-3'
        >
          <Divider orientation='vertical' h={'100%'} />
          <IoIosArrowForward size={38} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
