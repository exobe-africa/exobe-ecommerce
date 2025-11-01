"use client";

import { CreditCard, Wallet, Building2 } from 'lucide-react';
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
  onPaymentGatewayChange: (gateway: string) => void;
  selectedGateway: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  onInputChange,
  onCheckboxChange,
  onPaymentGatewayChange,
  selectedGateway,
}) => {
  const gateways = [
    {
      id: 'paygate',
      name: 'PayGate',
      description: 'Secure Payment Processing',
      icon: CreditCard,
      badge: 'Recommended',
      badgeColor: 'bg-green-100 text-green-800',
      features: ['256-bit SSL', 'PCI DSS', '3D Secure'],
      methods: ['VISA', 'MC', 'AMEX'],
    },
    {
      id: 'payfast',
      name: 'PayFast',
      description: 'Instant EFT & Cards',
      icon: Wallet,
      badge: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-800',
      features: ['Instant EFT', 'Card Payments', 'Secure'],
      methods: ['VISA', 'MC', 'EFT'],
    },
    {
      id: 'ozow',
      name: 'Ozow',
      description: 'Instant EFT Payments',
      icon: Building2,
      badge: 'Fast',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: ['Real-time', 'All Banks', 'No Card'],
      methods: ['EFT'],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
        <CreditCard className="h-6 w-6 mr-2 text-[#C8102E]" />
        Payment Information
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-3">
          Select Payment Gateway
        </label>
        <div className="space-y-3">
          {gateways.map((gateway) => {
            const Icon = gateway.icon;
            const isSelected = selectedGateway === gateway.id;
            return (
              <button
                key={gateway.id}
                type="button"
                onClick={() => onPaymentGatewayChange(gateway.id)}
                className={`w-full border-2 rounded-xl p-4 transition-all ${
                  isSelected
                    ? 'border-[#C8102E] bg-gradient-to-br from-white to-red-50/30 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#C8102E] to-[#A00E26] shadow-md'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="text-base font-bold text-[#000000]">{gateway.name}</div>
                        <div className={`${gateway.badgeColor} px-2 py-0.5 rounded-full text-xs font-semibold`}>
                          {gateway.badge}
                        </div>
                      </div>
                      <div className="text-xs text-[#4A4A4A] mb-2">{gateway.description}</div>
                      <div className="flex items-center space-x-2 text-xs text-[#4A4A4A]">
                        {gateway.features.map((feat, idx) => (
                          <span key={idx} className="flex items-center">
                            {idx > 0 && <span className="text-gray-300 mx-1">•</span>}
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {gateway.methods.map((method, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded px-1.5 py-0.5 text-[10px] font-bold border border-gray-200"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
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
