"use client";

const defaultExchangeRules = [
  'Same product category exchanges only',
  'Price differences will be charged or refunded',
  'Exchanges follow the same 30-day policy',
  'Free exchange shipping for defective items'
];

interface ExchangePolicyProps {
  title?: string;
  description?: string;
  exchangeRules?: string[];
}

const ExchangePolicy: React.FC<ExchangePolicyProps> = ({
  title = "Exchange Policy",
  description = "We offer exchanges for different sizes, colours, or styles of the same product, subject to availability.",
  exchangeRules = defaultExchangeRules
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="p-6 rounded-xl border border-gray-200">
        <p className="text-[#4A4A4A] mb-4">
          {description}
        </p>
        <ul className="space-y-2 text-[#4A4A4A]">
          {exchangeRules.map((rule, index) => (
            <li key={index}>• {rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExchangePolicy;
