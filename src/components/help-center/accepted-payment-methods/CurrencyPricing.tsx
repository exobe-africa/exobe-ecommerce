"use client";

const defaultPricingInfo = [
  'Prices include VAT where applicable',
  'International cards are accepted but may incur foreign exchange fees from your bank',
  'Exchange rates are determined by your card issuer',
  'Delivery fees are calculated at checkout'
];

interface CurrencyPricingProps {
  title?: string;
  currency?: string;
  currencyCode?: string;
  mainDescription?: string;
  pricingInfo?: string[];
}

const CurrencyPricing: React.FC<CurrencyPricingProps> = ({
  title = "Currency & Pricing",
  currency = "South African Rands",
  currencyCode = "ZAR",
  mainDescription,
  pricingInfo = defaultPricingInfo
}) => {
  const description = mainDescription || `All prices on eXobe are displayed in ${currency} (${currencyCode}).`;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="p-6 rounded-xl border border-gray-200">
        <p className="text-[#4A4A4A] mb-4">
          <strong>{description}</strong>
        </p>
        <ul className="space-y-2 text-[#4A4A4A]">
          {pricingInfo.map((info, index) => (
            <li key={index}>• {info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyPricing;
