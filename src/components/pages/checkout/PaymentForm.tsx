"use client";

import { CreditCard } from 'lucide-react';
import { Checkbox } from '../../common/index';

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
        <label className="block text-sm font-medium text-[#000000] mb-3">Payment Gateway</label>
        <div className="border-2 border-[#C8102E] bg-gradient-to-br from-white to-red-50/30 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C8102E] to-[#A00E26] rounded-lg flex items-center justify-center shadow-md">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#000000]">PayGate</div>
                <div className="text-xs text-[#4A4A4A]">Secure Payment Processing</div>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
              Active
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-[#4A4A4A] mb-3">
              Your payment will be securely processed through PayGate, South Africa's leading payment gateway.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#4A4A4A]">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>256-bit SSL Encryption</span>
              <span className="text-gray-300">•</span>
              <span>PCI DSS Compliant</span>
              <span className="text-gray-300">•</span>
              <span>3D Secure</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-3 text-gray-400">
            <span className="text-xs font-medium">Accepted Payment Methods:</span>
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded px-2 py-1 text-xs font-bold border border-gray-200">VISA</div>
              <div className="bg-white rounded px-2 py-1 text-xs font-bold border border-gray-200">MC</div>
              <div className="bg-white rounded px-2 py-1 text-xs font-bold border border-gray-200">AMEX</div>
            </div>
          </div>
        </div>
      </div>

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
