'use client';

import {useTranslation} from 'next-i18next';
import {FaArrowRightLong} from 'react-icons/fa6';

const LelitAdd = () => {
  const {t} = useTranslation('main');
  return (
    <section className='relative overflow-hidden'>
      {/* Базовый контейнер для фонов */}
      <div className='absolute inset-0 w-full h-full flex'>
        {/* Левая часть: изображение + градиент */}
        <div className='relative h-full md:w-[60%] w-full'>
          {/* Фон-картинка */}
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: 'url(/bg_flower.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left center',
              backgroundSize: 'cover',
            }}
          />
          {/* Градиент поверх изображения — слева направо */}
          <div
            className='absolute inset-0 w-full'
            style={{
              background:
                'linear-gradient(to left, rgba(25, 42, 97, 1), rgba(31, 50, 112, 0.5))',
            }}
          />
        </div>

        {/* Правая часть: заливка градиентом справа налево */}
        <div
          className='h-full w-[40%]'
          style={{
            background:
              'linear-gradient(to left, rgba(4, 15, 50, 1), rgba(25, 42, 97, 1))',
          }}
        />
      </div>

      {/* Контент поверх всего */}
      <div className='container relative z-10 h-full mx-auto flex flex-col gap-3 md:flex-row items-center py-12'>
        <div className='w-full md:w-2/3 text-white md:py-8 md:order-1 order-2'>
          <h3 className='text-[20px] md:text-4xl font-bold md:mb-6 mb-2'>
            Lelit Bed Linen
          </h3>
          <p className='text-lg max-w-full hidden md:block'>
            {t('lelitAd.desc')}
          </p>
          <p className='text-[14px] md:hidden inline w-full max-w-[350px]'>
            {t('lelitAd.mobileDesc')}
          </p>
          <button className='flex gap-2 items-center mt-4 md:mt-8'>
            <span className='text-white text-[16px]'>
              {t('lelitAd.button')}
            </span>
            <span className='bg-white py-2 px-5 rounded-full'>
              <FaArrowRightLong color='#000' />
            </span>
          </button>
        </div>

        <div className='w-full md:w-1/3 flex justify-left md:justify-end mt-8 md:mt-0 md:order-2 order-1'>
          <img
            src='/lelit_logo.png'
            alt='Lelit Logo'
            className='w-[50px] md:w-full md:max-w-[300px] object-contain'
          />
        </div>
      </div>
    </section>
  );
};

export default LelitAdd;
