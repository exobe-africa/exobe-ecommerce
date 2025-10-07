"use client";

import { useState, useEffect } from 'react';

interface UseScrollDirectionOptions {
  threshold?: number;
  initialDirection?: 'up' | 'down';
}

export const useScrollDirection = (options: UseScrollDirectionOptions = {}) => {
  const { threshold = 10, initialDirection = 'up' } = options;
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>(initialDirection);
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > threshold) {
        setScrollDirection(direction);
        setIsVisible(direction === 'up' || scrollY < 50); // Always show when near top
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection, threshold, isClient]);

  // Always return visible during SSR and initial client render
  return { scrollDirection, isVisible: isClient ? isVisible : true };
};
