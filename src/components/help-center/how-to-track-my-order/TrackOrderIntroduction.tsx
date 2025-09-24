"use client";

interface TrackOrderIntroductionProps {
  title?: string;
  description?: string;
}

const TrackOrderIntroduction: React.FC<TrackOrderIntroductionProps> = ({
  title,
  description = "Tracking your eXobe order is quick and easy. Once your order has been dispatched, you'll receive tracking information to monitor your package every step of the way to your door."
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

export default TrackOrderIntroduction;
