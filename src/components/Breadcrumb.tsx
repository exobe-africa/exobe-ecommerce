"use client";

import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'dark' | 'centered';
  showBackButton?: boolean;
  backButtonText?: string;
  className?: string;
  separator?: 'slash' | 'chevron';
  containerClassName?: string;
}

const Breadcrumb = ({
  items,
  variant = 'default',
  showBackButton = false,
  backButtonText = 'Back',
  className = '',
  separator = 'slash',
  containerClassName = ''
}: BreadcrumbProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  // Styling variants
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          container: 'flex items-center justify-center space-x-2 text-sm text-gray-300',
          link: 'hover:text-white transition-colors',
          current: 'text-white',
          separator: 'text-gray-300'
        };
      case 'centered':
        return {
          container: 'flex items-center justify-center space-x-2 text-sm text-gray-300',
          link: 'hover:text-white transition-colors',
          current: 'text-white',
          separator: 'text-gray-300'
        };
      default:
        return {
          container: 'flex items-center space-x-2 text-sm text-[#4A4A4A]',
          link: 'hover:text-[#C8102E] transition-colors',
          current: 'text-[#000000] font-medium',
          separator: 'text-[#4A4A4A]'
        };
    }
  };

  const styles = getVariantStyles();
  
  const getSeparatorIcon = () => {
    if (separator === 'chevron') {
      return <ChevronRight className="h-4 w-4" />;
    }
    return <span>/</span>;
  };

  return (
    <div className={containerClassName}>
      <div className={`${styles.container} ${className}`}>
        {/* Back Button (for product pages) */}
        {showBackButton && (
          <>
            <button 
              onClick={handleBackClick} 
              className={`flex items-center ${styles.link}`}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {backButtonText}
            </button>
            {items.length > 0 && (
              <span className={styles.separator}>
                {getSeparatorIcon()}
              </span>
            )}
          </>
        )}

        {/* Regular Breadcrumb Items */}
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <span className={styles.separator}>
                {getSeparatorIcon()}
              </span>
            )}
            
            {item.href && !item.isCurrentPage ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={item.isCurrentPage ? styles.current : styles.link}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
