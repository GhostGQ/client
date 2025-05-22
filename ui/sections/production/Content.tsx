'use client';
import {useTranslation} from 'next-i18next';

const Content = () => {
  const {t} = useTranslation('production');

  return (
    <section className='md:py-20 py-8'>
      <div className='container'>
        <h2 className='text-center text-[#2A3F87] text-[24px] font-medium uppercase'>
          {t('content.title')}
        </h2>
        <p className='text-[#081B24] text-[16px] font-medium mt-4'>
          {t('content.intro')}
        </p>

        <div className='flex lg:flex-row flex-col justify-center items-center gap-6 mt-10'>
          <div className='bg-[#F3F3F3] p-2.5 lg:w-auto w-full'>
            <img src='/KP-LS190.png' alt='' className='lg:max-w-[500px]' />
          </div>
          <div className='w-full'>
            <h3 className='text-[32px] text-[#2A3F87] font-semibold'>
              KP-LS190
            </h3>
            <span className='text-[#7C7C7C] text-[20px] font-medium'>
              {t('content.machine.type')}
            </span>
            <div className='my-4 flex flex-col gap-3'>
              <div className='flex justify-between gap-5 items-center'>
                <p className=' whitespace-nowrap'>
                  {t('content.machine.params.width')}
                </p>
                <div className='w-full h-px border-t border-dashed' />
                <p>2100</p>
              </div>
              <div className='flex justify-between gap-5 items-center'>
                <p className=' whitespace-nowrap'>
                  {t('content.machine.params.speed')}
                </p>
                <div className='w-full h-px border-t border-dashed' />
                <p>120</p>
              </div>
              <div className='flex justify-between gap-5 items-center'>
                <p className=' whitespace-nowrap'>
                  {t('content.machine.params.diameter')}
                </p>
                <div className='w-full h-px border-t border-dashed' />
                <p>80</p>
              </div>
            </div>
            <div>
              <span className='text-[#081B24] text-[20px] font-semibold'>
                {t('content.machine.descriptionTitle')}
              </span>
              <p className='text-[#7C7C7C] text-[16px] font-medium'>
                {t('content.machine.descriptionText')}
              </p>
            </div>
          </div>
        </div>
        <div className='flex lg:flex-row flex-col justify-center items-center gap-6 mt-10'>
          <div className='bg-[#F3F3F3] p-2.5 lg:w-auto w-full lg:order-2'>
            <img src='/MA-LS07.png' alt='' className='lg:max-w-[500px]' />
          </div>
          <div className='w-full lg:order-1'>
            <h3 className='text-[32px] text-[#2A3F87] font-semibold'>
              MA-LS07
            </h3>
            <span className='text-[#7C7C7C] text-[20px] font-medium'>
              {t('content.machine.type')}
            </span>
            <div className='my-4 flex flex-col gap-3'>
              <div className='flex justify-between gap-5 items-center'>
                <p className=' whitespace-nowrap'>
                  {t('content.machine.params.width')}
                </p>
                <div className='w-full h-px border-t border-dashed' />
                <p>2100</p>
              </div>
              <div className='flex justify-between gap-5 items-center'>
                <p className=' whitespace-nowrap'>
                  {t('content.machine.params.speed')}
                </p>
                <div className='w-full h-px border-t border-dashed' />
                <p>120</p>
              </div>
              <div className='flex justify-between gap-5 items-center'>
                <p className=' whitespace-nowrap'>
                  {t('content.machine.params.diameter')}
                </p>
                <div className='w-full h-px border-t border-dashed' />
                <p>80</p>
              </div>
            </div>
            <div>
              <span className='text-[#081B24] text-[20px] font-semibold'>
                {t('content.machine.descriptionTitle')}
              </span>
              <p className='text-[#7C7C7C] text-[16px] font-medium'>
                {t('content.machine.descriptionText')}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-[#F3F3F3] p-6 mt-10'>
          <h4 className='text-[#43A1D0] text-[16px] font-semibold'>
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
      </div>
    </section>
  );
};

export default Content;
