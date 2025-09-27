"use client";

import { 
  Package, 
  CreditCard, 
  Star, 
  ChevronRight, 
  Eye, 
  CheckCircle, 
  Truck, 
  Clock, 
  AlertCircle,
  RotateCcw,
  Settings,
  MapPin
} from 'lucide-react';
import { User, Order } from '../../shared/types';
import { getStatusColor, formatCurrency, formatDate } from '../../shared/utils';

interface OverviewTabProps {
  user: User;
  orders: Order[];
  onOrderView: (order: Order) => void;
  onTabChange: (tabId: string) => void;
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

export default function OverviewTab({ user, orders, onOrderView, onTabChange }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#000000]">{user.totalOrders}</p>
              <p className="text-sm text-[#4A4A4A]">Total Orders</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#000000]">{formatCurrency(user.totalSpent)}</p>
              <p className="text-sm text-[#4A4A4A]">Total Spent</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#F6E2E0] rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-[#C8102E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#000000]">{user.loyaltyPoints}</p>
              <p className="text-sm text-[#4A4A4A]">Loyalty Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#000000]">Recent Orders</h2>
            <button 
              onClick={() => onTabChange('orders')}
              className="text-[#C8102E] hover:text-[#A00E26] font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#000000]">{order.id}</p>
                    <p className="text-sm text-[#4A4A4A]">{order.items.length} items • {formatDate(order.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#000000]">{formatCurrency(order.total)}</p>
                  <button 
                    onClick={() => onOrderView(order)}
                    className="text-sm text-[#C8102E] hover:text-[#A00E26] flex items-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#000000]">Active Returns</h2>
            <span className="text-sm text-[#4A4A4A]">2 pending</span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-[#000000]">Return Request #RTN-001</p>
                  <p className="text-sm text-[#4A4A4A]">Order ORD-2024-001 • Submitted 2 days ago</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Under Review
                </span>
                <p className="text-sm text-[#4A4A4A] mt-1">R1299.00</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-[#000000]">Return Request #RTN-002</p>
                  <p className="text-sm text-[#4A4A4A]">Order ORD-2024-003 • Approved</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Pickup Scheduled
                </span>
                <p className="text-sm text-[#4A4A4A] mt-1">R899.00</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-[#C8102E] hover:text-[#A00E26] font-medium text-sm flex items-center space-x-1">
              <span>View all returns</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-[#000000] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button 
            onClick={() => onTabChange('orders')}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
          >
            <Package className="h-8 w-8 text-[#C8102E] mb-2" />
            <span className="text-sm font-medium text-[#000000]">Track Orders</span>
          </button>
          <button 
            onClick={() => onTabChange('addresses')}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
          >
            <MapPin className="h-8 w-8 text-[#C8102E] mb-2" />
            <span className="text-sm font-medium text-[#000000]">Manage Addresses</span>
          </button>
          <button 
            onClick={() => onTabChange('reviews')}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
          >
            <Star className="h-8 w-8 text-[#C8102E] mb-2" />
            <span className="text-sm font-medium text-[#000000]">My Reviews</span>
          </button>
          <button 
            onClick={() => onTabChange('settings')}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-[#F6E2E0] transition-colors"
          >
            <Settings className="h-8 w-8 text-[#C8102E] mb-2" />
            <span className="text-sm font-medium text-[#000000]">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
