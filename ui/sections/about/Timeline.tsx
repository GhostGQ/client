import {useRef, useEffect} from 'react';
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
} from 'framer-motion';
import {FaCircle} from 'react-icons/fa';
import {RefObject, createRef} from 'react';

const Timeline = () => {
  const timelineData = [
    {
      year: '2015',
      title: 'Запустили швейный цех',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
    {
      year: '2016',
      title: 'Швейный цех',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
    {
      year: '2017',
      title: 'Запустили швейный цех',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
    {
      year: '2018',
      title: 'Запуск цеха отделки ткани',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
    {
      year: '2019',
      title: 'Запустили ткацкий цех',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
    {
      year: '2020',
      title: 'Ткацкий цех',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
    {
      year: '2022',
      title: 'Компания сегодня',
      description:
        'Запуск швейного цеха может быть увлекательным и прибыльным бизнесом, если правильно подойти к организации процесса. Вот несколько ключевых аспектов',
    },
  ];

  // Create an array of refs, one for each timeline item
  const itemRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);
  if (itemRefs.current.length !== timelineData.length) {
    // Initialize refs only once
    itemRefs.current = Array(timelineData.length)
      .fill(null)
      .map(() => createRef<HTMLDivElement>());
  }

  return (
    <section className='md:py-20 py-8'>
      <h1 className='text-[#2A3F87] text-[40px] font-semibold text-center'>
        История производства
      </h1>
      <div className='w-full relative py-20 px-4 max-w-6xl mx-auto'>
        {/* Центральная линия */}
        <div className='absolute left-1/2 top-24 bottom-20 w-1 transform -translate-x-1/2 bg-linear-180 from-[#D04391] to-[#2A3F87]' />

        <div className='relative z-10'>
          {timelineData.map((item, index) => {
            const isInView = useInView(itemRefs.current[index], {
              once: true,
              amount: 0.4, // Начинаем анимацию, когда 40% элемента видно
            });

            return (
              <div
                key={index}
                ref={itemRefs.current[index]}
                className='flex mb-28 last:mb-0 md:gap-20 gap-6 justify-between'
              >
                {/* Левая часть - год */}
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
                    {item.year}
                  </motion.h3>
                  <motion.h4
                    className='md:text-[32px] text-[18px] font-medium mt-2 w-[150px] md:w-auto'
                    initial={{opacity: 0.3, y: 20, color: '#93C5FD'}}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            color: '#43A1D0',
                            transition: {duration: 0.6, delay: 0.1},
                          }
                        : {}
                    }
                  >
                    {item.title}
                  </motion.h4>
                </div>

                {/* Центральная точка */}
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

                {/* Правая часть - описание */}
                <div className='w-1/2 md:pl-10'>
                  <motion.div
                    className='text-left md:text-[20px] text-[14px] font-medium'
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
                    <p className='text-gray-600'>{item.description}</p>
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
