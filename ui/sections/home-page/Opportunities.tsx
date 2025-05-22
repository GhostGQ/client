'use client';
import React from 'react';
import {useTranslation} from 'next-i18next';
import {FaArrowRightLong} from 'react-icons/fa6';
import Link from 'next/link';

const Opportunities = () => {
  const {t} = useTranslation('main');

  const opportunities = [
    {
      image: '/op1.png',
      title: t('opportunities.op1.title'),
      desc: t('opportunities.op1.desc'),
    },
    {
      image: '/op2.png',
      title: t('opportunities.op2.title'),
      desc: t('opportunities.op2.desc'),
    },
    {
      image: '/op3.png',
      title: t('opportunities.op3.title'),
      desc: t('opportunities.op3.desc'),
    },
  ];

  return (
    <section className='py-20'>
      <div className='container'>
        <div className='text-center md:w-3/4 mx-auto'>
          <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>
            {t('opportunities.title')}
          </h2>
          <p className='text-[16px] font-medium'>{t('opportunities.desc')}</p>
        </div>

        <div className='flex flex-col items-center'>
          {opportunities.map((op, index) => (
            <div
              key={index}
              className='mt-8 flex items-center gap-6 md:flex-row flex-col md:w-full md:max-w-full max-w-[400px]'
            >
              <img
                src={op.image}
                alt='image'
                className={`${index === 1 ? 'md:order-2' : 'md:order-1'}`}
              />
              <div className={`${index === 1 ? 'md:order-1' : 'md:order-2'}`}>
                <h3
                  className={`mb-4 text-[#2A3F87] text-[20px] font-semibold uppercase`}
                >
                  {op.title}
                </h3>
                <p className='mb-6 text-[16px] font-medium'>{op.desc}</p>
                <Link href='/products'>
                  <button className='flex gap-2 items-center mt-4 md:mt-8'>
                    <span className='text-[#2A3F87] text-[16px]'>
                      {t('opportunities.button')}
                    </span>
                    <span className='bg-[#F3F3F3] py-2 px-5 rounded-full'>
                      <FaArrowRightLong color='#000' />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
