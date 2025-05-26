import { useState, useEffect } from 'react';

export function useScreen(breakpoint = 768) {
  const [isWide, setIsWide] = useState(() => window.innerWidth > breakpoint);

  useEffect(() => {
    function onResize() {
      setIsWide(window.innerWidth > breakpoint);
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isWide;
}