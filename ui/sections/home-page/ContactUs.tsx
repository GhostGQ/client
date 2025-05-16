'use client';

import {useTranslation} from 'next-i18next';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/ui/components/Map'), {
  ssr: false,
});

const ContactUs = () => {
  const {t} = useTranslation('main');

  const socials = [
    {
      image: '/socials/phone.png',
      title: t('contactUs.cards.phone'),
      content: '+998 (71) 111 11 11',
      linkType: 'tel:+998711111111',
    },
    {
      image: '/socials/email.png',
      title: t('contactUs.cards.email'),
      content: 'set1112@gmail.com',
      linkType: 'mailto:set1112@gmail.com',
    },
    {
      image: '/socials/addres.png',
      title: t('contactUs.cards.addres'),
      content: 'г. Ташкент, Юнусабадский р.',
      linkType:
        'https://www.google.com/maps/search/г.+Ташкент,+Юнусабадский+р.', // можно обновить на точную ссылку на карту
    },
    {
      image: '/socials/tg.png',
      title: t('contactUs.cards.tg'),
      content: '@set.uz',
      linkType: 'https://t.me/set.uz',
    },
    {
      image: '/socials/inst.png',
      title: t('contactUs.cards.inst'),
      content: 'Set.uz',
      linkType: 'https://www.instagram.com/set.uz',
    },
    {
      image: '/socials/facebook.png',
      title: t('contactUs.cards.face'),
      content: 'Set.uz',
      linkType: 'https://www.facebook.com/set.uz',
    },
  ];

  return (
    <section className='bg-[#F5F5F6] py-20'>
      <div className='container'>
        <div className='text-center md:w-3/4 mx-auto'>
          <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>
            {t('contactUs.title')}
          </h2>
          <p className='text-[#081B24] text-[16px] font-medium'>
            {t('contactUs.desc')}
          </p>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6 mb-8'>
          {socials.map((card, index) => (
            <a
              href={card.linkType}
              target='_blank'
              key={index}
              className='flex gap-4 py-6 pl-6 bg-white border border-[#CBD6FF] cursor-pointer transition-shadow duration-300 shadow-[#CBD6FF] hover:shadow-md'
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
        <MapWithNoSSR />
      </div>
    </section>
  );
};

export default ContactUs;
