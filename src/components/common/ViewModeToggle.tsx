"use client";

import { Grid3X3, List, Grid } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

export interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  variant?: 'default' | 'search' | 'wishlist';
  className?: string;
  hideOnMobile?: boolean;
  gridIcon?: 'grid3x3' | 'grid';
}

const ViewModeToggle = ({
  viewMode,
  onViewModeChange,
  variant = 'default',
  className = '',
  hideOnMobile = false,
  gridIcon = 'grid3x3'
}: ViewModeToggleProps) => {
  
  const GridIconComponent = gridIcon === 'grid' ? Grid : Grid3X3;
  
  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'search':
        return {
          container: 'flex items-center space-x-1 bg-gray-100 rounded-lg p-1',
          button: 'p-2 rounded-md transition-colors',
          activeButton: 'bg-white text-[#C8102E] shadow-sm',
          inactiveButton: 'text-[#4A4A4A]'
        };
      case 'wishlist':
        return {
          container: 'flex bg-gray-100 rounded-lg p-1',
          button: 'p-2 rounded-md transition-colors',
          activeButton: 'bg-white text-[#C8102E] shadow-sm',
          inactiveButton: 'text-[#4A4A4A] hover:text-[#C8102E]'
        };
      default: // category page style
        return {
          container: 'flex items-center space-x-1 border border-gray-300 rounded-lg p-1 bg-white',
          button: 'p-2 rounded transition-colors touch-manipulation',
          activeButton: 'bg-[#C8102E] text-white',
          inactiveButton: 'text-[#4A4A4A] hover:bg-gray-100'
        };
    }
  };

  const styles = getVariantStyles();
  
  const containerClasses = `
    ${styles.container}
    ${hideOnMobile ? 'hidden sm:flex' : 'flex'}
    ${className}
  `.trim();

  const getButtonClasses = (mode: ViewMode) => `
    ${styles.button}
    ${viewMode === mode ? styles.activeButton : styles.inactiveButton}
  `.trim();

  return (
    <div className={containerClasses}>
      <button
        onClick={() => onViewModeChange('grid')}
        className={getButtonClasses('grid')}
        aria-label="Grid view"
        title="Grid view"
      >
        <GridIconComponent className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={getButtonClasses('list')}
        aria-label="List view"
        title="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ViewModeToggle;
