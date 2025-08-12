'use client';
import React from 'react';
import {useTranslation} from 'next-i18next';
import {FaArrowRightLong} from 'react-icons/fa6';
import Link from 'next/link';

const Opportunities = () => {
    const {t} = useTranslation('main');

    const opportunities = [
        {
            image: '/vozmojnosti.webp',
            title: t('advantages.item2.title'),
            desc: t('advantages.item2.text'),
        },
        {
            image: '/postoyannoye-razvitiye.webp',
            title: t('advantages.item3.title'),
            desc: t('advantages.item3.text'),
        },
        {
            image: '/mi-proizvoditeli.webp',
            title: t('advantages.item1.title'),
            desc: t('advantages.item1.text'),
        },
    ];

    return (
        <section className='pt-20 pb-7'>
            <div className='container'>
                <div className='text-center md:w-3/4 mx-auto'>
                    <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>
                        {t('advantages.title')}
                    </h2>
                    <p className='text-[16px] font-medium'>{t('advantages.subtitle')}</p>
                </div>

                {/*<div className='text-center md:w-3/4 mx-auto'>*/}
                {/*  <h2 className='text-[#2A3F87] text-[24px] font-semibold uppercase'>*/}
                {/*    {t('opportunities.title')}*/}
                {/*  </h2>*/}
                {/*  <p className='text-[16px] font-medium'>{t('opportunities.desc')}</p>*/}
                {/*</div>*/}

                <div className='flex flex-col items-center'>
                    {opportunities.map((op, index) => (
                        <div
                            key={index}
                            className='mt-8 flex items-center gap-6 md:flex-row flex-col md:w-full md:max-w-full max-w-[400px]'
                        >
                            <img
                                src={op.image}
                                alt='image'
                                className={`w-[466px] min-w-[466px] h-[311px] ${index === 1 ? 'md:order-2' : 'md:order-1'} overflow-hidden object-cover object-center`}
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
                      <FaArrowRightLong color='#000'/>
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
