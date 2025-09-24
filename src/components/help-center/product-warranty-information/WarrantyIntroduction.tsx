"use client";

interface WarrantyIntroductionProps {
  title?: string;
  description?: string;
}

const WarrantyIntroduction: React.FC<WarrantyIntroductionProps> = ({
  title,
  description = "At eXobe, we stand behind the quality of our products. All items come with manufacturer warranties, and we provide additional protection to ensure your complete satisfaction."
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

export default WarrantyIntroduction;
