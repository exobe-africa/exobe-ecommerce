"use client";

import { useState, useEffect, useRef } from 'react';
import { Truck, CheckCircle, Clock, AlertCircle, ChevronDown } from 'lucide-react';
import { Order } from '../../shared/types';
import { getStatusColor, formatCurrency, formatDate } from '../../shared/utils';

interface OrdersTabProps {
  orders: Order[];
  onOrderView: (order: Order) => void;
  onLeaveReview: (order: Order) => void;
  onTrackPackage: (order: Order) => void;
  onReturnRequest: (order: Order) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return <CheckCircle className="h-4 w-4" />;
    case 'shipped': return <Truck className="h-4 w-4" />;
    case 'processing': return <Clock className="h-4 w-4" />;
    case 'cancelled': return <AlertCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'status';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'highest', label: 'Highest Amount' },
  { value: 'lowest', label: 'Lowest Amount' },
  { value: 'status', label: 'By Status' }
];

export default function OrdersTab({ 
  orders, 
  onOrderView, 
  onLeaveReview, 
  onTrackPackage, 
  onReturnRequest 
}: OrdersTabProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOrders = (orders: Order[], sortType: SortOption): Order[] => {
    const sortedOrders = [...orders];
    
    switch (sortType) {
      case 'newest':
        return sortedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sortedOrders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return sortedOrders.sort((a, b) => b.total - a.total);
      case 'lowest':
        return sortedOrders.sort((a, b) => a.total - b.total);
      case 'status':
        const statusOrder = { 'processing': 1, 'shipped': 2, 'delivered': 3, 'cancelled': 4 };
        return sortedOrders.sort((a, b) => (statusOrder[a.status as keyof typeof statusOrder] || 5) - (statusOrder[b.status as keyof typeof statusOrder] || 5));
      default:
        return sortedOrders;
    }
  };

  const sortedOrders = sortOrders(orders, sortBy);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#000000]">Order History</h2>
            <p className="text-[#4A4A4A] mt-1">Track and manage your orders</p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-[#4A4A4A] transition-colors"
            >
              <span>Sort by: {sortOptions.find(option => option.value === sortBy)?.label}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as SortOption);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        sortBy === option.value 
                          ? 'text-[#C8102E] bg-[#F6E2E0] font-medium' 
                          : 'text-[#4A4A4A]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Count and Sort Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-[#4A4A4A]">
          <span>{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</span>
          <span>Sorted by {sortOptions.find(option => option.value === sortBy)?.label.toLowerCase()}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000]">{order.id}</p>
                    <p className="text-sm text-[#4A4A4A]">Placed on {formatDate(order.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#000000]">{formatCurrency(order.total)}</p>
                  <p className="text-sm text-[#4A4A4A]">{order.items.length} items</p>
                </div>
              </div>
              
              {order.trackingNumber && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Tracking Number:</span>
                    <span className="font-mono text-blue-700">{order.trackingNumber}</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => onOrderView(order)}
                  className="flex-1 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors"
                >
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <>
                    <button 
                      onClick={() => onLeaveReview(order)}
                      className="flex-1 border border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-xl font-medium hover:bg-[#F6E2E0] transition-colors"
                    >
                      Leave Review
                    </button>
                    <button 
                      onClick={() => onReturnRequest(order)}
                      className="flex-1 border border-orange-500 text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
                    >
                      Return Item
                    </button>
                  </>
                )}
                {order.status === 'shipped' && (
                  <button 
                    onClick={() => onTrackPackage(order)}
                    className="flex-1 border border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                  >
                    Track Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
