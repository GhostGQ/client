'use client';

import {Button} from '@mantine/core';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FaArrowRightLong} from 'react-icons/fa6';

const About = () => {
  const {t} = useTranslation('main');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className='py-16 md:py-20 lg:py-[80px] bg-[#F5F5F6]'>
      <div className='container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16'>
        {/* Левая колонка */}
        <div className='w-full lg:w-[30%] xl:w-1/3'>
          <h2 className='uppercase text-[#2A3F87] text-center sm:text-start font-semibold text-xl sm:text-2xl lg:text-[24px] sm:mb-6'>
            {t('about.title')}
          </h2>
          <div className='sm:block hidden'>
            <Button
              variant='filled'
              radius='xl'
              color='#43A1D0'
              size='lg'
              className='font-medium w-full sm:w-auto'
              rightSection={<FaArrowRightLong />}
            >
              {t('about.button.more')}
            </Button>
          </div>
        </div>

        {/* Правая колонка */}
        <div className='w-full lg:w-[70%] xl:w-2/3'>
          <p className='text-[16px] sm:text-3xl lg:text-[32px] md:font-semibold font-medium'>
            {t('about.text')}
          </p>

          <div className='mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {/* Карточка 1 */}
            <div className='border border-[#CBD6FF] p-4 sm:p-6 bg-white'>
              <span className='text-[#43A1D0] text-4xl sm:text-5xl lg:text-6xl font-semibold block'>
                2001
              </span>
              <div className='h-px w-full max-w-[240px] bg-[#E5E5E5] my-2'></div>
              <span className='text-sm sm:text-[14px] font-medium'>
                {t('about.cards.years')}
              </span>
            </div>

            {/* Карточка 2 */}
            <div className='border border-[#CBD6FF] p-4 sm:p-6 bg-white'>
              <span className='text-[#43A1D0] text-4xl sm:text-5xl lg:text-6xl font-semibold block'>
                1500+
              </span>
              <div className='h-px w-full max-w-[240px] bg-[#E5E5E5] my-2'></div>
              <span className='text-sm sm:text-[14px] font-medium'>
                {t('about.cards.partners')}
              </span>
            </div>

            {/* Карточка 3 */}
            <div className='border border-[#CBD6FF] p-4 sm:p-6 bg-white'>
              <span className='text-[#43A1D0] text-4xl sm:text-5xl lg:text-6xl font-semibold block'>
                1200+
              </span>
              <div className='h-px w-full max-w-[240px] bg-[#E5E5E5] my-2'></div>
              <span className='text-sm sm:text-[14px] font-medium'>
                {t('about.cards.employes')}
              </span>
            </div>
          </div>
          <div className='block sm:hidden mt-6'>
            <Button
              variant='filled'
              radius='xl'
              color='#43A1D0'
              size='lg'
              className='font-medium w-full sm:w-auto'
              fullWidth
              rightSection={<FaArrowRightLong />}
            >
              {t('about.button.more')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
