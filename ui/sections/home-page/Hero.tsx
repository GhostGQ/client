'use client';

import {useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';

const Hero = () => {
  const {t} = useTranslation('main');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className={`container h-full flex flex-col justify-between`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full sm:h-[calc(100vh)] h-[573px] object-cover -z-10'
      >
        <source src='/hero-video.mp4' type='video/mp4' />
        Ваш браузер не поддерживает видео.
      </video>

      <div className='relative z-10 text-white sm:pt-20 pt-12 md:w-[800px] sm:w-[600px] w-[300px]'>
        <h1 className='lg:text-[84px] md:text-[64px] sm:text-[48px] text-[24px] font-medium'>
          {t('hero.title1')}
          <br /> {t('hero.title2')}
        </h1>
      </div>

      <div className='pb-[52px] flex md:flex-row flex-col gap-6 justify-between items-center'>
        <p className='text-white text-[14px] font-medium hidden sm:inline'>
          {t('hero.subTitle1')} <br />
          {t('hero.subTitle2')}
        </p>
        <div className='flex gap-4 flex-col sm:flex-row w-full sm:w-fit'>
          <button className='btn_filled sm:w-[206px]'>
            {t('hero.button.products')}
          </button>
          <button className='btn_outline sm:w-[206px]'>
            {t('hero.button.aboutCompany')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero