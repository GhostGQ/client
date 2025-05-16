'use client';

import {useEffect, useState} from 'react';
import {FaArrowRightLong, FaMinus, FaPlus} from 'react-icons/fa6';
import {motion, AnimatePresence} from 'framer-motion';
import {useTranslation} from 'next-i18next';

const AnimatedCards = () => {
  const {t} = useTranslation('main');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем размер экрана при монтировании и изменении
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    {
      id: 1,
      title: t('products.el1.title'),
      description: t('products.el1.description'),
      image: '/card1.png',
      gradient: {
        from: 'rgba(21, 38, 33, 0.2)',
        to: 'rgba(35, 51, 46, 1)',
      },
    },
    {
      id: 2,
      title: t('products.el2.title'),
      description: t('products.el2.description'),
      image: '/card2.png',
      gradient: {
        from: 'rgba(16, 46, 70, 0.2)',
        to: 'rgba(16, 43, 64, 1)',
      },
    },
    {
      id: 3,
      title: t('products.el3.title'),
      description: t('products.el3.description'),
      image: '/card3.png',
      gradient: {
        from: 'rgba(52, 7, 37, 0.2)',
        to: 'rgba(52, 7, 37, 1)',
      },
    },
  ];

  return (
    <div
      className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-5 ${
        isMobile ? 'h-auto' : 'h-[640px]'
      }`}
    >
      {categories.map((product, index) => (
        <motion.div
          key={product.id}
          className={`relative overflow-hidden ${
            activeIndex === index ? 'z-10' : 'z-0'
          }`}
          style={{
            flex: isMobile ? '' : 1,
            height: isMobile ? '240px' : 'auto',
          }}
          animate={{
            flex: !isMobile ? (activeIndex === index ? 2 : 1) : undefined,
            height: isMobile
              ? activeIndex === index
                ? '400px'
                : '240px'
              : 'auto',
          }}
          transition={{duration: 0.4, delay: 0.1}}
          onHoverStart={!isMobile ? () => setActiveIndex(index) : undefined}
          onHoverEnd={!isMobile ? () => setActiveIndex(null) : undefined}
          onClick={
            isMobile
              ? () => setActiveIndex(activeIndex === index ? null : index)
              : undefined
          }
        >
          <div
            className='absolute inset-0 w-full h-full'
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className='absolute inset-0 w-full h-full'
            style={{
              background: `linear-gradient(to bottom, ${product.gradient.from}, ${product.gradient.to})`,
            }}
          />

          {/* Контент */}
          <motion.div className='relative h-full flex flex-col justify-end p-6'>
            <motion.div
              className='sm:mb-3 mb-2'
              animate={{
                opacity: 1,
                scale: 1,
                y: activeIndex === index ? -20 : 0,
                transition: {
                  duration: 0.3,
                  delay: activeIndex === index ? 0.2 : 0,
                },
              }}
            >
              {activeIndex === index ? (
                <FaMinus size={30} className='text-white' />
              ) : (
                <FaPlus size={30} className='text-white' />
              )}
            </motion.div>
            <motion.h3
              className='text-2xl lg:text-[32px] font-semibold sm:mb-4 mb-2 text-white'
              animate={{
                y: activeIndex === index ? -20 : 0,
                transition: {duration: 0.3},
              }}
            >
              {product.title}
            </motion.h3>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{opacity: 0, height: 0}}
                  animate={{
                    opacity: 1,
                    height: isMobile ? 'auto' : '180px',
                    transition: {duration: 0.4},
                  }}
                  exit={{opacity: 0, height: 0, transition: {duration: 0.3}}}
                >
                  <p className='text-white text-[14px] sm:text-[16px] mb-4'>
                    {product.description}
                  </p>
                  <button className='flex gap-2 items-center'>
                    <span className='text-white text-[16px]'>
                      Посмотреть другие товары
                    </span>
                    <span className='bg-white py-2 px-5 rounded-full'>
                      <FaArrowRightLong color='#000' />
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedCards;
