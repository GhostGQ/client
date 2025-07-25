'use client'

import BgContainer from '@/ui/components/BgContainer';
import PartnersLogoCarousel from '@/ui/components/PartnersLogoCarousel';
import React from 'react';
import {useTranslation} from 'next-i18next';

const Partners = () => {
  const {t} = useTranslation('main');

  return (
    <BgContainer >
      <div className='container py-[74px]'>
        <div className='text-center md:w-3/4 mx-auto text-white'>
          <h2 className='text-[24px] font-semibold uppercase'>
            {t('partners.title')}
          </h2>
        </div>
        <PartnersLogoCarousel />
      </div>
    </BgContainer>
  );
};

export default Partners;
