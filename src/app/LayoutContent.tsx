"use client";

import { usePathname } from 'next/navigation';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const pathname = usePathname();
  
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
};

export default LayoutContent;
