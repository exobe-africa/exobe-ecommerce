"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  confirmButtonColor?: string;
  confirmButtonHoverColor?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon: Icon,
  iconColor = "text-red-600",
  iconBgColor = "bg-red-100",
  confirmButtonColor = "bg-red-500",
  confirmButtonHoverColor = "hover:bg-red-600"
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 cursor-pointer transition-all duration-300"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={handleBackdropClick}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
          <div className="text-center">
            {Icon && (
              <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`h-8 w-8 ${iconColor}`} />
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-[#000000] mb-2">
              {title}
            </h3>
            
            <p className="text-[#4A4A4A] mb-6">
              {message}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors touch-manipulation"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 ${confirmButtonColor} text-white py-3 rounded-lg font-medium ${confirmButtonHoverColor} transition-colors touch-manipulation`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
