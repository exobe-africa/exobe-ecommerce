"use client";

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? Check : X;

  return (
    <div className={`fixed top-4 right-4 z-[60] ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={handleClose}
        className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
