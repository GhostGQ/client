import {Button, TextInput} from '@mantine/core';
import {useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';
import {PiEnvelopeOpenLight} from 'react-icons/pi';

const EmailSubscribe = () => {
  const {t} = useTranslation('common');
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем размер экрана при монтировании и изменении
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='py-9 bg-[#2A3F87]'>
      <div className='container flex justify-between items-center lg:flex-row flex-col gap-4 lg:gap-0'>
        <div className='flex items-center gap-2'>
          <PiEnvelopeOpenLight size={60} color='#fff' />
          <div className=''>
            <h3 className='sm:text-[24px] text-[18px] font-semibold text-white'>
              {t('email.title')}
            </h3>
            <p className='text-14px text-[#DAE5DA] sm:block hidden'>
              Pellentesque eu nibh eget mauris congue mattis matti.
            </p>
          </div>
        </div>
        <div className='flex items-center sm:flex-row flex-col gap-3 sm:gap-0 w-full sm:w-auto'>
          <TextInput
            variant='unstyled'
            placeholder='Your email address'
            color='#fff'
            styles={{input: {color: '#fff'}}}
            className='bg-[#FFFFFF30] pl-6 p-[3px] sm:w-[300px] w-full text-white'
          />
          <Button
            variant='white'
            radius={'0'}
            color='#2A3F87'
            size='md'
            fullWidth={isMobile ? true : false}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscribe;
