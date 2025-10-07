"use client";

import { AlertTriangle, X } from 'lucide-react';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { Spinner } from '../../common/Spinner';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isLoading = false
}: DeleteConfirmationModalProps) {
  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">{title}</h3>
                <p className="text-sm text-[#4A4A4A]">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-[#4A4A4A] mb-3">{message}</p>
            {itemName && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-[#000000]">{itemName}</p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
              }}
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
