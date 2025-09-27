"use client";

import { useState, useEffect } from 'react';
import { X, Truck, MapPin, Clock, CheckCircle, Package, AlertCircle } from 'lucide-react';

interface TrackingEvent {
  id: number;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface TrackPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingNumber: string;
  orderId: string;
  orderDate: string;
}

export default function TrackPackageModal({ 
  isOpen, 
  onClose, 
  trackingNumber, 
  orderId, 
  orderDate 
}: TrackPackageModalProps) {
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');

  // Mock tracking data - in a real app, this would come from an API
  const generateTrackingEvents = (trackingNum: string): TrackingEvent[] => {
    const baseEvents = [
      {
        id: 1,
        status: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared for shipment',
        location: 'eXobe Fulfillment Center, Johannesburg',
        timestamp: orderDate,
        isCompleted: true
      },
      {
        id: 2,
        status: 'Package Prepared',
        description: 'Your package has been prepared and labeled for shipping',
        location: 'eXobe Fulfillment Center, Johannesburg',
        timestamp: new Date(new Date(orderDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isCompleted: true
      },
      {
        id: 3,
        status: 'In Transit',
        description: 'Package is on its way to the destination',
        location: 'Courier Hub, Pretoria',
        timestamp: new Date(new Date(orderDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isCompleted: true
      },
      {
        id: 4,
        status: 'Out for Delivery',
        description: 'Package is out for delivery and will arrive today',
        location: 'Local Delivery Hub',
        timestamp: new Date(new Date(orderDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isCompleted: false
      },
      {
        id: 5,
        status: 'Delivered',
        description: 'Package has been delivered successfully',
        location: 'Delivery Address',
        timestamp: new Date(new Date(orderDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isCompleted: false
      }
    ];

    // Set current status based on the last completed event
    const lastCompleted = baseEvents.filter(event => event.isCompleted).pop();
    return baseEvents;
  };

  useEffect(() => {
    if (isOpen && trackingNumber) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const events = generateTrackingEvents(trackingNumber);
        setTrackingEvents(events);
        const lastCompleted = events.filter(event => event.isCompleted).pop();
        setCurrentStatus(lastCompleted?.status || 'Order Confirmed');
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, trackingNumber, orderDate]);

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    switch (status) {
      case 'Order Confirmed':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'Package Prepared':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'In Transit':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'Out for Delivery':
        return <Truck className="h-5 w-5 text-orange-600" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return 'border-green-500 bg-green-50';
    }
    
    switch (status) {
      case 'Out for Delivery':
        return 'border-orange-500 bg-orange-50';
      case 'Delivered':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">Track Package</h3>
                <p className="text-sm text-[#4A4A4A]">Order {orderId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tracking Number */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Tracking Number</p>
                <p className="font-mono text-blue-700 text-lg">{trackingNumber}</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          {!isLoading && currentStatus && (
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <Truck className="h-6 w-6 text-[#C8102E]" />
                <h4 className="text-lg font-semibold text-[#000000]">Current Status</h4>
              </div>
              <div className="bg-[#F6E2E0] rounded-xl p-4">
                <p className="font-medium text-[#C8102E] text-lg">{currentStatus}</p>
                <p className="text-[#4A4A4A] text-sm mt-1">
                  Last updated: {formatDate(trackingEvents.filter(e => e.isCompleted).pop()?.timestamp || orderDate)}
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8102E]"></div>
              <span className="ml-3 text-[#4A4A4A]">Loading tracking information...</span>
            </div>
          )}

          {/* Tracking Timeline */}
          {!isLoading && trackingEvents.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-[#C8102E]" />
                <h4 className="text-lg font-semibold text-[#000000]">Tracking Timeline</h4>
              </div>
              
              <div className="space-y-4">
                {trackingEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(event.status, event.isCompleted)}`}>
                        {getStatusIcon(event.status, event.isCompleted)}
                      </div>
                      {index < trackingEvents.length - 1 && (
                        <div className={`w-0.5 h-16 mt-2 ${event.isCompleted ? 'bg-green-300' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className={`font-semibold ${event.isCompleted ? 'text-[#000000]' : 'text-gray-500'}`}>
                          {event.status}
                        </h5>
                        <span className={`text-sm ${event.isCompleted ? 'text-[#4A4A4A]' : 'text-gray-400'}`}>
                          {event.isCompleted ? formatDate(event.timestamp) : 'Pending'}
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${event.isCompleted ? 'text-[#4A4A4A]' : 'text-gray-400'}`}>
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <MapPin className={`h-4 w-4 ${event.isCompleted ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                        <span className={`text-sm ${event.isCompleted ? 'text-[#4A4A4A]' : 'text-gray-400'}`}>
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Information */}
          {!isLoading && (
            <div className="mt-8 bg-gray-50 rounded-xl p-4">
              <h5 className="font-semibold text-[#000000] mb-3">Delivery Information</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Estimated Delivery:</span>
                  <span className="font-medium text-[#000000]">
                    {new Date(new Date(orderDate).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-ZA', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Delivery Method:</span>
                  <span className="font-medium text-[#000000]">Standard Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Courier:</span>
                  <span className="font-medium text-[#000000]">eXobe Express</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="flex-1 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
