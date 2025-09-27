import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Get the current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Store the scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // Get the stored scroll position
      const scrollY = document.body.getAttribute('data-scroll-y');
      
      // Remove the scroll lock styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        document.body.removeAttribute('data-scroll-y');
      }
    }
    
    // Cleanup function to ensure scroll is unlocked when component unmounts
    return () => {
      if (isLocked) {
        const scrollY = document.body.getAttribute('data-scroll-y');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY, 10));
          document.body.removeAttribute('data-scroll-y');
        }
      }
    };
  }, [isLocked]);
};
