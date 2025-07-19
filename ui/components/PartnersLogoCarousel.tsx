'use client';

import React, {useCallback, useEffect, useRef} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const PartnersLogoCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, dragFree: true});

  const partners = [
    {src: '/partners/9teens.png'},
    {src: '/partners/clever.png'},
    {src: '/partners/crb.png'},
    {src: '/partners/Eliz.png'},
    {src: '/partners/fancy.png'},
    {src: '/partners/fomi.png'},
    {src: '/partners/Grof.png'},
    {src: '/partners/lime.png'},
    {src: '/partners/Nico.png'},
    {src: '/partners/Orby.png'},
    {src: '/partners/sens.png'},
    {src: '/partners/Thomas.png'},
    {src: '/partners/zarina.png'},
  ];

  // Автопрокрутка
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    intervalRef.current = setInterval(scrollNext, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, scrollNext]);

  return (
    <div className='overflow-hidden mt-12' ref={emblaRef}>
      <div className='flex'>
        {partners.map((partner, index) => (
          <div
            key={index}
            className='flex-[0_0_auto] px-5'
            style={{width: 'auto'}}
          >
            <img src={partner.src} alt='logo' className='h-8 object-contain' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersLogoCarousel;
