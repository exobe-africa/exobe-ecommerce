"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollToTopProps {
  excludePaths?: string[];
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  excludePaths = ['/category'] 
}) => {
  const pathname = usePathname();

  useEffect(() => {
    const shouldExclude = excludePaths.some(path => pathname.startsWith(path));
    
    if (!shouldExclude) {
      window.scrollTo(0, 0);
    }
  }, [pathname, excludePaths]);

  return null;
};

export default ScrollToTop;
