"use client";

import { ShoppingBag, Shield, Truck, Phone } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold?: number;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  freeShippingThreshold = 499,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
        <ShoppingBag className="h-5 w-5 mr-2 text-[#C8102E]" />
        Order Summary
      </h3>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">{item.image}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-[#000000] truncate">{item.name}</h4>
              <p className="text-sm text-[#4A4A4A]">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#C8102E]">R{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#4A4A4A]">Subtotal</span>
          <span className="text-[#000000]">R{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-[#4A4A4A]">Shipping</span>
          <span className={shipping === 0 ? 'text-green-600' : 'text-[#000000]'}>
            {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-[#4A4A4A]">VAT (15%)</span>
          <span className="text-[#000000]">R{tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-[#000000]">Total</span>
            <span className="text-[#C8102E]">R{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {shipping > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            Add R{(freeShippingThreshold - subtotal).toFixed(2)} more for FREE shipping!
          </p>
        </div>
      )}
      
      <div className="mt-6 space-y-2">
        <div className="flex items-center text-sm text-[#4A4A4A]">
          <Shield className="h-4 w-4 mr-2 text-green-600" />
          Secure 256-bit SSL encryption
        </div>
        <div className="flex items-center text-sm text-[#4A4A4A]">
          <Truck className="h-4 w-4 mr-2 text-blue-600" />
          Free returns within 30 days
        </div>
        <div className="flex items-center text-sm text-[#4A4A4A]">
          <Phone className="h-4 w-4 mr-2 text-purple-600" />
          24/7 customer support
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
