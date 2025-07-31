import {useTranslation} from 'next-i18next';
import {useRef, RefObject, createRef} from 'react';
import {motion, useInView} from 'framer-motion';
import {FaCircle} from 'react-icons/fa';

const years = [
  '2014',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
];

const Timeline = () => {
  const {t} = useTranslation('about');
  const itemRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);

  if (itemRefs.current.length !== years.length) {
    itemRefs.current = Array(years.length)
      .fill(null)
      .map(() => createRef<HTMLDivElement | null>());
  }

  return (
    <section className='md:py-20 py-8'>
      <h1 className='text-[#2A3F87] text-[40px] font-semibold text-center'>
        {t('timeline.header')}
      </h1>
      <div className='w-full relative py-20 px-4 max-w-6xl mx-auto'>
        <div className='absolute left-1/2 top-24 bottom-20 w-1 transform -translate-x-1/2 bg-linear-180 from-[#D04391] to-[#2A3F87]' />

        <div className='relative z-10'>
          {years.map((year, index) => {
            const ref = itemRefs.current[index];
            const isInView = useInView(ref, {once: true, amount: 0.5});

            const title = t(`timeline.${year}.title`, {defaultValue: ''});
            const descriptionRaw = t(`timeline.${year}.desc`, {
              returnObjects: true,
            });

            const description: string[] = Array.isArray(descriptionRaw)
              ? descriptionRaw
              : [descriptionRaw];

            return (
              <div
                key={year}
                ref={ref}
                className='flex mb-28 last:mb-0 md:gap-20 gap-6 justify-between'
              >
                <div className='w-1/2 pr-8 text-left'>
                  <motion.h3
                    className='text-[40px] font-extrabold'
                    initial={{opacity: 0.3, y: 20, color: '#6B7280'}}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            color: '#081B24',
                            transition: {duration: 0.6},
                          }
                        : {}
                    }
                  >
                    {year}
                  </motion.h3>

                  {title && (
                    <motion.h4
                      className='md:text-[32px] text-[18px] font-medium mt-2 w-[150px] md:w-auto'
                      initial={{opacity: 0.3, y: 20, color: '#93C5FD'}}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              y: 0,
                              color: '#2BA8FC',
                              transition: {duration: 0.6, delay: 0.1},
                            }
                          : {}
                      }
                    >
                      {title}
                    </motion.h4>
                  )}
                </div>

                <motion.div
                  className='absolute left-1/2 transform -translate-x-1/2 mt-2'
                  initial={{opacity: 0.3, scale: 0.5}}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          transition: {duration: 0.4},
                        }
                      : {}
                  }
                >
                  <FaCircle className='text-[#D04391] text-lg' />
                </motion.div>

                <div className='w-1/2 md:pl-10'>
                  <motion.div
                    className='text-left md:text-[20px] text-[14px] font-medium space-y-2'
                    initial={{opacity: 0, y: 20}}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {duration: 0.6, delay: 0.1},
                          }
                        : {}
                    }
                  >
                    {description.map((text, i) => (
                      <p
                        key={i}
                        className='text-gray-600 flex items-start gap-1'
                      >
                        <span className='text-[#2BA8FC] text-sm md:mt-[6px] mr-1'>
                          ●
                        </span>
                        <span>{text}</span>
                      </p>
                    ))}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
