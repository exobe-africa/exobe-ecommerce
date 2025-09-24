"use client";

import { CreditCard } from 'lucide-react';
import { Checkbox } from '../index';

interface PaymentFormData {
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddressSame: boolean;
}

interface PaymentFormProps {
  formData: PaymentFormData;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  onInputChange,
  onCheckboxChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
        <CreditCard className="h-6 w-6 mr-2 text-[#C8102E]" />
        Payment Information
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-3">Payment Method</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={onInputChange}
              className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-[#000000]">Credit Card</div>
              <div className="text-xs text-[#4A4A4A]">Visa, Mastercard</div>
            </div>
          </label>
          
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={onInputChange}
              className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-[#000000]">PayPal</div>
              <div className="text-xs text-[#4A4A4A]">Pay with PayPal</div>
            </div>
          </label>
          
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#C8102E] transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="eft"
              checked={formData.paymentMethod === 'eft'}
              onChange={onInputChange}
              className="w-4 h-4 text-[#C8102E] border-gray-300 focus:ring-[#C8102E]"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-[#000000]">Bank Transfer</div>
              <div className="text-xs text-[#4A4A4A]">EFT Payment</div>
            </div>
          </label>
        </div>
      </div>

      {formData.paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={onInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={onInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={onInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={onInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent bg-white text-[#000000] placeholder-gray-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      )}

      {formData.paymentMethod === 'paypal' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            After clicking "Place Order", you will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {formData.paymentMethod === 'eft' && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-800 mb-2">
            Bank transfer details will be provided after order confirmation.
          </p>
          <p className="text-xs text-orange-700">
            Your order will be processed once payment is received (usually within 24 hours).
          </p>
        </div>
      )}

      <div className="mt-6">
        <div className="mb-4">
          <Checkbox
            id="billingAddressSame"
            name="billingAddressSame"
            checked={formData.billingAddressSame}
            onChange={(checked) => onCheckboxChange('billingAddressSame', checked)}
            label="Billing address is the same as shipping address"
            size="sm"
            labelClassName="font-medium"
          />
        </div>

        {!formData.billingAddressSame && (
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-[#000000]">Billing Address</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
