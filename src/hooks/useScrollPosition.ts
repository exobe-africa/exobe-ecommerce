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

  // Save scroll position before component unmounts
  useEffect(() => {
    const saveScrollPosition = () => {
      if (!isRestoringRef.current) {
        scrollPositions.set(scrollKey, {
          x: window.scrollX,
          y: window.scrollY,
        });
      }
    };

    // Save on beforeunload
    window.addEventListener('beforeunload', saveScrollPosition);

    // Save on visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
      document.removeEventListener('visibilitychange', saveScrollPosition);
    };
  }, [scrollKey]);

  // Restore scroll position when component mounts
  useEffect(() => {
    const savedPosition = scrollPositions.get(scrollKey);
    
    if (savedPosition) {
      isRestoringRef.current = true;
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(savedPosition.x, savedPosition.y);
        isRestoringRef.current = false;
      });
    }
  }, [scrollKey]);

  // Clear scroll position when navigating away from the page
  const clearScrollPosition = () => {
    scrollPositions.delete(scrollKey);
  };

  return { clearScrollPosition };
};
