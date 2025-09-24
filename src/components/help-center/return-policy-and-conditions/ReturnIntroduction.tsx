"use client";

interface ReturnIntroductionProps {
  title?: string;
  description?: string;
}

const ReturnIntroduction: React.FC<ReturnIntroductionProps> = ({
  title,
  description = "At eXobe, we want you to be completely satisfied with your purchase. If you're not happy with an item, our return policy makes it easy to return or exchange products within the specified timeframe."
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

export default ReturnIntroduction;
