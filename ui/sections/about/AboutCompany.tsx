'use client';
import {useTranslation} from 'next-i18next';

const AboutCompany = () => {
  const {t} = useTranslation('about');

  return (
    <section className='md:pt-20 p-4 md:pb-10'>
      <div className='container'>
        <h2 className='text-[#2A3F87] text-[24px] font-medium text-center uppercase'>
          {t('content.title')}
        </h2>
        <p className='text-[16px] text-[#081B24] font-medium mt-4'>
          {t('content.intro')}
        </p>
        <p className='text-[16px] text-[#081B24] font-medium mt-1'>
          {t('content.intro2')}
        </p>
        <p className='text-[16px] text-[#081B24] font-medium mt-1'>
          {t('content.intro3')}
        </p>
        <div className='mt-6'>
          <h4 className='text-[#2BA8FC] text-[18px] font-semibold'>
            {t('content.functions_title')}
          </h4>
          <div className='flex flex-col gap-3 mt-3'>
            <div className='flex gap-1 font-medium'>
              <span>1.</span>
              <p className='md:text-[16px] text-[14px]'>
                <b>{t('content.functions.f1.title')}</b>{' '}
                {t('content.functions.f1.desc')}
              </p>
            </div>
            <div className='flex gap-1 font-medium'>
              <span>2.</span>
              <p className='md:text-[16px] text-[14px]'>
                <b>{t('content.functions.f2.title')}</b>{' '}
                {t('content.functions.f2.desc')}
              </p>
            </div>
            <div className='flex gap-1 font-medium'>
              <span>3.</span>
              <p className='md:text-[16px] text-[14px]'>
                <b>{t('content.functions.f3.title')}</b>{' '}
                {t('content.functions.f3.desc')}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <img src='/about_img.png' alt='Image of peaple' className='w-full' />
          <p className='mt-10 font-medium'>{t('content.conclusion')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
