'use client';

import ContactForm from '@/components/contact-form/ContactForm';
import dynamic from 'next/dynamic';
import React from 'react';
import {useTranslation} from 'next-i18next';

const MapWithNoSSR = dynamic(() => import('@/ui/components/Map'), {
  ssr: false,
});

const Contacts = () => {
  const {t} = useTranslation('main');

  const socials = [
    {
      image: '/socials/phone.png',
      title: t('contactUs.cards.phone'),
      content: '+998 (91) 031 11 03',
      linkType: 'tel:+998910311103',
    },
    {
      image: '/socials/email.png',
      title: t('contactUs.cards.email'),
      content: 'info@setextile.uz',
      linkType: 'mailto:info@setextile.uz',
    },
    {
      image: '/socials/addres.png',
      title: t('contactUs.cards.addres'),
      content: t('contactUs.cards.addressText'),
      linkType: 'https://yandex.uz/maps/-/CHDlI8y2', // можно обновить на точную ссылку на карту
    },
    // {
    //   image: '/socials/tg.png',
    //   title: t('contactUs.cards.tg'),
    //   content: '@set.uz',
    //   linkType: 'https://t.me/set.uz',
    // },
    // {
    //   image: '/socials/inst.png',
    //   title: t('contactUs.cards.inst'),
    //   content: 'Set.uz',
    //   linkType: 'https://www.instagram.com/set.uz',
    // },
    // {
    //   image: '/socials/facebook.png',
    //   title: t('contactUs.cards.face'),
    //   content: 'Set.uz',
    //   linkType: 'https://www.facebook.com/set.uz',
    // },
  ];

  return (
    <section className='md:py-20 py-8 bg-[#F5F5F6]'>
      <div className='container flex md:flex-row flex-col gap-6'>
        <div className='md:hidden block text-center'>
          <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>
            {t('contactUs.title')}
          </h2>
        </div>
        <div className='md:w-2/3 md:order-1 order-2'>
          <div className='hidden md:block'>
            <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>
              {t('contactUs.title')}
            </h2>
          </div>
          <div className='flex flex-col gap-6 mt-6'>
            {socials.map((card, index) => (
              <a
                href={card.linkType}
                target='_blank'
                key={index}
                className='flex items-center gap-4 py-6 pl-6 bg-white border border-[#CBD6FF] cursor-pointer transition-shadow duration-300 shadow-[#CBD6FF] hover:shadow-md'
              >
                <img src={card.image} alt='icon' />
                <div>
                  <h5 className='text-[14px] font-medium'>{card.title}</h5>
                  <p className='text-[#081B24] font-bold text-[18px]'>
                    {card.content}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className='flex flex-col w-full gap-6 md:order-2 order-1'>
          <ContactForm />
          <div className='hidden md:block'>
            <MapWithNoSSR />
          </div>
        </div>
        <div className='md:hidden block order-3'>
          <MapWithNoSSR />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
