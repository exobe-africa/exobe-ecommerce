"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollPosition {
  x: number;
  y: number;
}

const scrollPositions = new Map<string, ScrollPosition>();

export const useScrollPosition = (key?: string) => {
  const pathname = usePathname();
  const scrollKey = key || pathname;
  const isRestoringRef = useRef(false);

  useEffect(() => {
    const saveScrollPosition = () => {
      if (!isRestoringRef.current) {
        scrollPositions.set(scrollKey, {
          x: window.scrollX,
          y: window.scrollY,
        });
      }
    };

    window.addEventListener('beforeunload', saveScrollPosition);

    document.addEventListener('visibilitychange', saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
      document.removeEventListener('visibilitychange', saveScrollPosition);
    };
  }, [scrollKey]);

  useEffect(() => {
    const savedPosition = scrollPositions.get(scrollKey);
    
    if (savedPosition) {
      isRestoringRef.current = true;
      
      requestAnimationFrame(() => {
        window.scrollTo(savedPosition.x, savedPosition.y);
        isRestoringRef.current = false;
      });
    }
  }, [scrollKey]);

  const clearScrollPosition = () => {
    scrollPositions.delete(scrollKey);
  };

  return { clearScrollPosition };
};
