"use client";

interface PaymentIntroductionProps {
  title?: string;
  description?: string;
}

const PaymentIntroduction: React.FC<PaymentIntroductionProps> = ({
  title,
  description = "eXobe accepts a variety of secure payment methods to make your shopping experience convenient and safe. All transactions are protected with industry-standard encryption."
}) => {
  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      )}
      <p className="text-lg text-[#4A4A4A] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default PaymentIntroduction;
