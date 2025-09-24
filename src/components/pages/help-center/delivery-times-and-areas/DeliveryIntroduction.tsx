"use client";

interface DeliveryIntroductionProps {
  title?: string;
  description?: string;
}

const DeliveryIntroduction: React.FC<DeliveryIntroductionProps> = ({
  title,
  description = "eXobe delivers nationwide across South Africa. We offer multiple delivery options to get your orders to you as quickly and conveniently as possible."
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

export default DeliveryIntroduction;
