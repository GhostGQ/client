'use client';

import {motion, AnimatePresence} from 'framer-motion';
import {useEffect} from 'react';
import {useFilterDrawerStore} from './filterDrawerStore';
import {FilterAccordion} from '@/components/accordion/FilterAccordion';

export const MobileFilterDrawer = () => {
  const {isOpen, close} = useFilterDrawerStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={close}
          />

          {/* Bottom Drawer */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 h-[90vh] bg-[#F3F3F3] z-50 rounded-t-2xl shadow-lg overflow-auto'
            initial={{y: '100%'}}
            animate={{y: 0}}
            exit={{y: '100%'}}
            transition={{type: 'spring', stiffness: 300, damping: 30}}
            drag='y'
            dragConstraints={{top: 0, bottom: 0}}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) close();
            }}
          >
            <div className='h-1 w-24 bg-black rounded-full mx-auto my-4' />
            <FilterAccordion />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
