"use client";

import { X, MapPin, Plus, Check } from 'lucide-react';

interface Address {
  id: number;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddressId?: number;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
}

export default function AddressSelectionModal({ 
  isOpen, 
  onClose, 
  addresses, 
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress 
}: AddressSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#000000]">Select Shipping Address</h2>
              <p className="text-[#4A4A4A] mt-1">Choose from your saved addresses</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Add New Address Button */}
          <button
            onClick={() => {
              onAddNewAddress();
              onClose();
            }}
            className="w-full mb-4 p-4 border-2 border-dashed border-[#C8102E] rounded-xl text-[#C8102E] hover:bg-[#F6E2E0] transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New Address</span>
          </button>

          {/* Address List */}
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => {
                  onSelectAddress(address);
                  onClose();
                }}
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedAddressId === address.id
                    ? 'border-[#C8102E] bg-[#F6E2E0]'
                    : 'border-gray-200 hover:border-[#C8102E] hover:bg-gray-50'
                }`}
              >
                {/* Default Badge */}
                {address.isDefault && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-medium">
                      Default
                    </span>
                  </div>
                )}

                {/* Selected Check */}
                {selectedAddressId === address.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-[#C8102E] rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#4A4A4A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#000000] mb-1">{address.name}</h3>
                    <div className="text-[#4A4A4A] text-sm space-y-1">
                      <p>{address.street}</p>
                      <p>{address.city}, {address.province}</p>
                      <p>{address.postalCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {addresses.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#4A4A4A]" />
              </div>
              <h3 className="font-medium text-[#000000] mb-2">No Saved Addresses</h3>
              <p className="text-[#4A4A4A] text-sm mb-4">Add your first address to get started</p>
              <button
                onClick={() => {
                  onAddNewAddress();
                  onClose();
                }}
                className="bg-[#C8102E] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
              >
                Add Address
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
