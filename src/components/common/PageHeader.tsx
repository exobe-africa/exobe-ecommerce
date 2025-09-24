"use client";

import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  iconComponent?: LucideIcon;
  variant?: 'default' | 'gradient' | 'wishlist' | 'help-center' | 'centered';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  iconComponent: IconComponent,
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  actions,
}) => {
  const renderIcon = () => {
    if (!icon && !IconComponent) return null;

    const getIconStyles = () => {
      const baseStyles = "flex items-center justify-center";
      
      switch (variant) {
        case 'gradient':
          return {
            container: `w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C8102E] to-[#A00E26] rounded-xl sm:rounded-2xl ${baseStyles}`,
            iconClass: "text-xl sm:text-2xl text-white"
          };
        case 'wishlist':
          return {
            container: `w-12 h-12 bg-[#F6E2E0] rounded-xl ${baseStyles}`,
            iconClass: "h-6 w-6 text-[#C8102E]"
          };
        case 'help-center':
          return {
            container: `w-16 h-16 bg-[#F6E2E0] rounded-xl ${baseStyles}`,
            iconClass: "h-8 w-8 text-[#C8102E]"
          };
        case 'centered':
          return {
            container: `w-16 h-16 bg-[#C8102E] rounded-xl ${baseStyles}`,
            iconClass: "h-8 w-8 text-white"
          };
        default:
          return {
            container: `w-12 h-12 bg-[#F6E2E0] rounded-xl ${baseStyles}`,
            iconClass: "h-6 w-6 text-[#C8102E]"
          };
      }
    };

    const { container, iconClass } = getIconStyles();

    return (
      <div className={container}>
        {IconComponent ? (
          <IconComponent className={iconClass} />
        ) : (
          <span className={iconClass}>{icon}</span>
        )}
      </div>
    );
  };

  const getTitleStyles = () => {
    const baseStyles = "font-bold leading-tight";
    
    switch (size) {
      case 'small':
        return `text-xl sm:text-2xl ${baseStyles}`;
      case 'large':
        return `text-3xl lg:text-4xl ${baseStyles}`;
      default:
        return `text-xl sm:text-2xl lg:text-3xl ${baseStyles}`;
    }
  };

  const getDescriptionStyles = () => {
    switch (size) {
      case 'small':
        return "text-sm text-[#4A4A4A] mt-1";
      case 'large':
        return "text-lg text-[#4A4A4A] mt-2";
      default:
        return "text-sm sm:text-base text-[#4A4A4A] mt-1";
    }
  };

  const getContainerStyles = () => {
    const baseStyles = "flex items-center";
    
    switch (variant) {
      case 'centered':
        return `${baseStyles} justify-center space-x-4 mb-6`;
      case 'gradient':
        return `${baseStyles} space-x-3 sm:space-x-4 mb-6 sm:mb-8`;
      default:
        return `${baseStyles} space-x-4 mb-6`;
    }
  };

  const containerClasses = `${getContainerStyles()} ${className}`;
  const titleClasses = `${getTitleStyles()} ${variant === 'centered' ? 'text-white' : 'text-[#000000]'}`;

  if (variant === 'centered') {
    return (
      <div className={containerClasses}>
        {renderIcon()}
        <div className="text-center">
          <h1 className={titleClasses}>{title}</h1>
          {description && <p className={getDescriptionStyles()}>{description}</p>}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={actions ? "flex items-center justify-between" : containerClasses}>
      <div className={actions ? getContainerStyles() : "flex items-center space-x-4"}>
        {renderIcon()}
        <div className="flex-1">
          <h1 className={titleClasses}>{title}</h1>
          {description && <p className={getDescriptionStyles()}>{description}</p>}
        </div>
      </div>
      
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default PageHeader;
