"use client";

import { Check, Edit2, Shield } from 'lucide-react';

interface OrderReviewData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  cardNumber: string;
}

interface OrderReviewProps {
  formData: OrderReviewData;
  onEditShipping: () => void;
  onEditPayment: () => void;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  formData,
  onEditShipping,
  onEditPayment,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
        <Check className="h-6 w-6 mr-2 text-[#C8102E]" />
        Review Your Order
      </h2>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-[#000000]">Shipping Address</h3>
          <button 
            onClick={onEditShipping}
            className="text-[#C8102E] hover:text-[#A00E26] text-sm font-medium flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
        </div>
        <div className="text-sm text-[#4A4A4A]">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          {formData.apartment && <p>{formData.apartment}</p>}
          <p>{formData.city}, {formData.province} {formData.postalCode}</p>
          <p>{formData.country}</p>
          <p className="mt-2">{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-[#000000]">Payment Method</h3>
          <button 
            onClick={onEditPayment}
            className="text-[#C8102E] hover:text-[#A00E26] text-sm font-medium flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
        </div>
        <div className="text-sm text-[#4A4A4A]">
          {formData.paymentMethod === 'card' && (
            <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
          )}
          {formData.paymentMethod === 'paypal' && <p>PayPal</p>}
          {formData.paymentMethod === 'eft' && <p>Bank Transfer (EFT)</p>}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-green-800">Your payment is secure</p>
            <p className="text-xs text-green-600">We use industry-standard encryption to protect your information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
