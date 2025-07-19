import {Product} from '@/hooks/useProducts';
import {Divider, Image} from '@mantine/core';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {IoIosArrowForward} from 'react-icons/io';

const ProductCard = ({product}: {product: any}) => {
  const {i18n} = useTranslation();
  const language = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  return (
    <div className='p-5 bg-[#F3F3F3] relative flex justify-center min-h-[400px]'>
      <Image
        src={product?.img}
        w={'250px'}
        className='w-fit md:h-full h-[270px]'
      />
      <div className='p-3 bg-white w-[93%] shadow-md absolute bottom-4 flex justify-between cursor-pointer'>
        <div>
          <h2 className='text-[18px] font-medium'>
            {language === 'uz' ? product?.title_uz : product?.title_ru}
          </h2>
          <div className='text-[#7C7C7C]'>
            <span>
              {language === 'uz'
                ? product?.densitys?.[0]?.name_uz
                : product?.densitys?.[0]?.name_ru}
            </span>
            <span className='ml-2'>
              {language === 'uz'
                ? product?.compositions?.[0].name_uz
                : product?.compositions?.[0]?.name_ru}
            </span>
          </div>
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
