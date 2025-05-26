'use client';

import {Product} from '@/hooks/useProducts';
import {Button} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {FaArrowRightLong} from 'react-icons/fa6';
import ImageGallery from './ImageGallery';
import {useDisclosure} from '@mantine/hooks';
import ContactModal from './ContactModal';

const ProductInfo = ({product}: Product) => {
  const [opened, {open, close}] = useDisclosure(false);
  const {t, i18n} = useTranslation('common');
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'uz';

  return (
    <section className='md:py-20 pt-4 pb-10'>
      <h1 className='text-[#2A3F87] text-[20px] font-medium mb-6 text-center md:hidden'>
        {lang === 'uz' ? product?.title_uz : product.title_ru}
      </h1>
      <div className='container flex gap-8 lg:flex-row flex-col'>
        <ImageGallery img={product?.img} images={product?.images} />
        <div className='lg:w-1/2 '>
          <div className='mb-2'>
            {product?.categorys?.map(category => (
              <span
                key={category.id}
                className='text-[##081B24] text-[16px] rounded-2xl bg-[#D3F0FF] px-3 py-1 ml-2 first:ml-0'
              >
                {lang === 'uz' ? category.name_uz : category.name_ru}
              </span>
            ))}
          </div>
          <div>
            <h2 className='text-[32px] font-semibold text-[#2A3F87]'>
              {lang === 'uz' ? product?.title_uz : product?.title_ru}
            </h2>
            <div className='text-[#7C7C7C]'>
              <span>
                {lang === 'uz'
                  ? product?.densitys?.[0].name_uz
                  : product?.densitys?.[0].name_ru}
              </span>
              <span className='ml-2'>
                {lang === 'uz'
                  ? product?.compositions?.[0].name_uz
                  : product?.compositions?.[0].name_ru}
              </span>
            </div>
          </div>

          <div className='mt-4'>
            <h2 className='text-[20px] text-[#081B24] font-semibold mb-2'>
              {lang === 'ru' ? 'Описание' : 'Tavsif'}
            </h2>
            <p className='text-[16px] text-[#7C7C7C]'>
              {lang === 'ru' ? product.description_ru : product.description_uz}
            </p>
          </div>

          <Button
            type='submit'
            size='lg'
            radius={'xl'}
            color='#43A1D0'
            fullWidth
            mt={48}
            rightSection={<FaArrowRightLong color='#fff' />}
            onClick={open}
          >
            {t('form.button')}
          </Button>
        </div>
      </div>

      <ContactModal opened={opened} onClose={close} />
    </section>
  );
};

export default ProductInfo;
