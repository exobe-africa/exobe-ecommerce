"use client";

interface ErrorDetails {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'red' | 'orange';
  description: string;
}

interface FailedOrderHeaderProps {
  errorDetails: ErrorDetails;
}

const FailedOrderHeader: React.FC<FailedOrderHeaderProps> = ({ errorDetails }) => {
  const IconComponent = errorDetails.icon;

  return (
    <div className="text-center mb-12">
      <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r ${
        errorDetails.color === 'red' ? 'from-red-400 to-red-600' : 'from-orange-400 to-orange-600'
      } rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
        <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
        {errorDetails.title}
      </h1>
      <p className="text-lg text-[#4A4A4A] mb-2">
        {errorDetails.subtitle}
      </p>
      <p className="text-sm text-[#4A4A4A]">
        Don't worry - no payment has been charged to your account
      </p>
    </div>
  );
};

export default FailedOrderHeader;
