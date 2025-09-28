"use client";

import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Package, 
  Calendar,
  Eye,
  ChevronDown,
  Filter,
  Search,
  ArrowUpDown
} from 'lucide-react';
import ReturnDetailsModal from '../../ReturnDetailsModal';
import CancelReturnModal from '../../CancelReturnModal';
import ReturnsMobileFiltersModal from './ReturnsMobileFiltersModal';

interface ReturnRequest {
  id: string;
  orderId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'pickup_scheduled' | 'completed' | 'cancelled';
  amount: number;
  reason: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  trackingNumber?: string;
  estimatedRefund?: string;
  notes?: string;
}

interface ReturnsTabProps {
  onViewReturn?: (returnRequest: ReturnRequest) => void;
}

const mockReturns: ReturnRequest[] = [
  {
    id: 'RTN-001',
    orderId: 'ORD-2024-001',
    requestDate: '2024-03-13',
    status: 'pending',
    amount: 1299.00,
    reason: 'Defective item',
    items: [
      { id: 1, name: 'iPhone 15 Pro', quantity: 1, price: 1299.00, imageUrl: '/images/iphone15pro.jpg' }
    ],
    notes: 'Screen has dead pixels'
  },
  {
    id: 'RTN-002',
    orderId: 'ORD-2024-003',
    requestDate: '2024-03-10',
    status: 'pickup_scheduled',
    amount: 899.00,
    reason: 'Changed mind',
    items: [
      { id: 2, name: 'Cotton T-Shirt', quantity: 2, price: 299.00, imageUrl: '/images/tshirt.jpg' },
      { id: 3, name: 'Jeans', quantity: 1, price: 599.00, imageUrl: '/images/jeans.jpg' }
    ],
    trackingNumber: 'RTN987654321',
    estimatedRefund: '3-5 business days'
  },
  {
    id: 'RTN-003',
    orderId: 'ORD-2024-002',
    requestDate: '2024-03-08',
    status: 'completed',
    amount: 599.00,
    reason: 'Wrong size',
    items: [
      { id: 4, name: 'Nike Air Max 270', quantity: 1, price: 599.00, imageUrl: '/images/nikeairmax.jpg' }
    ],
    estimatedRefund: 'Refunded to original payment method'
  },
  {
    id: 'RTN-004',
    orderId: 'ORD-2024-001',
    requestDate: '2024-03-05',
    status: 'rejected',
    amount: 299.00,
    reason: 'Damaged in shipping',
    items: [
      { id: 5, name: 'Wireless Headphones', quantity: 1, price: 299.00, imageUrl: '/images/headphones.jpg' }
    ],
    notes: 'Return window expired'
  }
];

type SortOption = 'newest' | 'oldest' | 'amount_high' | 'amount_low' | 'status';
type FilterOption = 'all' | 'pending' | 'approved' | 'rejected' | 'pickup_scheduled' | 'completed' | 'cancelled';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'amount_high', label: 'Highest Amount' },
  { value: 'amount_low', label: 'Lowest Amount' },
  { value: 'status', label: 'By Status' }
];

const filterOptions = [
  { value: 'all', label: 'All Returns', count: mockReturns.length },
  { value: 'pending', label: 'Under Review', count: mockReturns.filter(r => r.status === 'pending').length },
  { value: 'approved', label: 'Approved', count: mockReturns.filter(r => r.status === 'approved').length },
  { value: 'pickup_scheduled', label: 'Pickup Scheduled', count: mockReturns.filter(r => r.status === 'pickup_scheduled').length },
  { value: 'completed', label: 'Completed', count: mockReturns.filter(r => r.status === 'completed').length },
  { value: 'rejected', label: 'Rejected', count: mockReturns.filter(r => r.status === 'rejected').length }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'approved': return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'rejected': return 'text-red-700 bg-red-50 border-red-200';
    case 'pickup_scheduled': return 'text-purple-700 bg-purple-50 border-purple-200';
    case 'completed': return 'text-green-700 bg-green-50 border-green-200';
    case 'cancelled': return 'text-gray-700 bg-gray-50 border-gray-200';
    default: return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock className="h-4 w-4" />;
    case 'approved': return <CheckCircle className="h-4 w-4" />;
    case 'rejected': return <AlertTriangle className="h-4 w-4" />;
    case 'pickup_scheduled': return <Package className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    case 'cancelled': return <AlertTriangle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'Under Review';
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'pickup_scheduled': return 'Pickup Scheduled';
    case 'completed': return 'Completed';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

export default function ReturnsTab({ onViewReturn }: ReturnsTabProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReturnId, setCancelReturnId] = useState<string>('');
  const [cancelReturnAmount, setCancelReturnAmount] = useState<number>(0);

  // Filter and sort returns
  const filteredReturns = mockReturns.filter(returnRequest => {
    const matchesFilter = filterBy === 'all' || returnRequest.status === filterBy;
    const matchesSearch = searchQuery === '' || 
      returnRequest.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      returnRequest.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      returnRequest.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const sortedReturns = [...filteredReturns].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
      case 'oldest':
        return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime();
      case 'amount_high':
        return b.amount - a.amount;
      case 'amount_low':
        return a.amount - b.amount;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleViewReturn = (returnRequest: ReturnRequest) => {
    setSelectedReturn(returnRequest);
    setShowReturnModal(true);
    onViewReturn?.(returnRequest);
  };

  const handleCancelReturn = (returnRequest: ReturnRequest) => {
    setCancelReturnId(returnRequest.id);
    setCancelReturnAmount(returnRequest.amount);
    setShowCancelModal(true);
  };

  const confirmCancelReturn = () => {
    // Here you would typically make an API call to cancel the return
    console.log(`Cancelling return request: ${cancelReturnId}`);
    
    // For demo purposes, we'll just show a success message
    // In a real app, you'd update the return status or remove it from the list
    alert(`Return request ${cancelReturnId} has been cancelled successfully.`);
    
    // Reset the cancel modal state
    setCancelReturnId('');
    setCancelReturnAmount(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#000000]">Return Requests</h2>
            <p className="text-[#4A4A4A] mt-1">Manage your product returns and refunds</p>
          </div>
          
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search returns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-sm text-[#000000] placeholder-gray-500"
            />
          </div>
        </div>

        {/* Filters Toolbar - Wishlist Style */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-4">
          <div className="flex items-center space-x-4">
            <span className="text-[#4A4A4A] font-medium">
              Showing {sortedReturns.length} of {mockReturns.length} returns
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden bg-[#4A4A4A] text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Returns List */}
      <div className="p-6">
        {sortedReturns.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-8 w-8 text-[#4A4A4A]" />
            </div>
            <h3 className="font-medium text-[#000000] mb-2">No Returns Found</h3>
            <p className="text-[#4A4A4A] text-sm">
              {searchQuery ? 'Try adjusting your search or filters' : 'You haven\'t made any return requests yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedReturns.map((returnRequest) => (
              <div key={returnRequest.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-sm transition-shadow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(returnRequest.status)}`}>
                      {getStatusIcon(returnRequest.status)}
                      <span>{getStatusLabel(returnRequest.status)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#000000]">{returnRequest.id}</p>
                      <p className="text-sm text-[#4A4A4A]">Order {returnRequest.orderId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#000000]">R{returnRequest.amount.toFixed(2)}</p>
                    <p className="text-sm text-[#4A4A4A]">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {new Date(returnRequest.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#4A4A4A] mb-2">Items to return:</p>
                  <div className="space-y-2">
                    {returnRequest.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#000000] truncate">{item.name}</p>
                          <p className="text-sm text-[#4A4A4A]">Qty: {item.quantity} • R{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reason and Notes */}
                <div className="mb-4">
                  <p className="text-sm text-[#4A4A4A]">
                    <span className="font-medium">Reason:</span> {returnRequest.reason}
                  </p>
                  {returnRequest.notes && (
                    <p className="text-sm text-[#4A4A4A] mt-1">
                      <span className="font-medium">Notes:</span> {returnRequest.notes}
                    </p>
                  )}
                </div>

                {/* Tracking and Refund Info */}
                {(returnRequest.trackingNumber || returnRequest.estimatedRefund) && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    {returnRequest.trackingNumber && (
                      <p className="text-sm text-blue-700 mb-1">
                        <span className="font-medium">Tracking:</span> {returnRequest.trackingNumber}
                      </p>
                    )}
                    {returnRequest.estimatedRefund && (
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Refund:</span> {returnRequest.estimatedRefund}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleViewReturn(returnRequest)}
                    className="flex-1 bg-[#C8102E] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#A00E26] transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  {returnRequest.status === 'pickup_scheduled' && (
                    <button className="flex-1 border border-blue-500 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                      Track Pickup
                    </button>
                  )}
                  {returnRequest.status === 'pending' && (
                    <button 
                      onClick={() => handleCancelReturn(returnRequest)}
                      className="flex-1 border border-red-300 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-50 transition-colors"
                    >
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Return Details Modal */}
      <ReturnDetailsModal
        isOpen={showReturnModal}
        onClose={() => {
          setShowReturnModal(false);
          setSelectedReturn(null);
        }}
        returnRequest={selectedReturn}
        onCancelReturn={handleCancelReturn}
      />

      {/* Cancel Return Modal */}
      <CancelReturnModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setCancelReturnId('');
          setCancelReturnAmount(0);
        }}
        onConfirm={confirmCancelReturn}
        returnId={cancelReturnId}
        returnAmount={cancelReturnAmount}
      />

      {/* Mobile Filters Modal */}
      <ReturnsMobileFiltersModal
        isOpen={showMobileFilters}
        filterBy={filterBy}
        sortBy={sortBy}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        onClose={() => setShowMobileFilters(false)}
        onFilterChange={(value) => setFilterBy(value as FilterOption)}
        onSortChange={(value) => setSortBy(value as SortOption)}
      />
    </div>
  );
}
