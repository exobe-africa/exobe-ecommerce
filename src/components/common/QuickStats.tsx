"use client";

import React from 'react';

export interface StatItem {
  number: string;
  label: string;
}

export interface QuickStatsProps {
  stats: StatItem[];
  variant?: 'default' | 'hero' | 'card';
  columns?: 2 | 3 | 4;
  className?: string;
  numberClassName?: string;
  labelClassName?: string;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  stats,
  variant = 'default',
  columns = 4,
  className = '',
  numberClassName = '',
  labelClassName = ''
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-3';
      case 4:
        return 'grid-cols-2 md:grid-cols-4';
      default:
        return 'grid-cols-2 md:grid-cols-4';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'gap-6 max-w-4xl mx-auto',
          item: 'text-center',
          number: `text-2xl lg:text-3xl font-bold text-[#C8102E] mb-1 ${numberClassName}`,
          label: `text-sm text-gray-300 ${labelClassName}`
        };
      case 'card':
        return {
          container: 'gap-4 text-center',
          item: '',
          number: `text-2xl font-bold ${numberClassName}`,
          label: `text-red-100 text-sm ${labelClassName}`
        };
      default:
        return {
          container: 'gap-6 text-center',
          item: 'text-center',
          number: `text-2xl lg:text-3xl font-bold text-[#C8102E] mb-1 ${numberClassName}`,
          label: `text-sm text-[#4A4A4A] ${labelClassName}`
        };
    }
  };

  const styles = getVariantStyles();
  const containerClasses = `grid ${getGridCols()} ${styles.container} ${className}`;

  return (
    <div className={containerClasses}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.number}>{stat.number}</div>
          <div className={styles.label}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
