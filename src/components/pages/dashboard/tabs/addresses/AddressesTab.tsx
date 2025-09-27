"use client";

import { Edit3, Trash2 } from 'lucide-react';
import { Address } from '../../shared/types';

interface AddressesTabProps {
  addresses: Address[];
  onAddressEdit: (address: Address) => void;
  onAddressDelete: (address: Address) => void;
  onAddNewAddress: () => void;
}

export default function AddressesTab({ 
  addresses, 
  onAddressEdit, 
  onAddressDelete, 
  onAddNewAddress 
}: AddressesTabProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#000000]">My Addresses</h2>
            <p className="text-[#4A4A4A] mt-1">Manage your delivery addresses</p>
          </div>
          <button 
            onClick={onAddNewAddress}
            className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Add New Address
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-xl p-6 relative">
              {address.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full font-medium">
                    Default
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-semibold text-[#000000] mb-2">{address.name}</h3>
                <div className="text-[#4A4A4A] space-y-1">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.province}</p>
                  <p>{address.postalCode}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => onAddressEdit(address)}
                  className="flex items-center space-x-2 text-[#C8102E] hover:text-[#A00E26] font-medium"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => onAddressDelete(address)}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
