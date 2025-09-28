"use client";

interface ReturnIntroductionProps {
  title?: string;
  description?: string;
}

const ReturnIntroduction: React.FC<ReturnIntroductionProps> = ({
  title,
  description = "At eXobe, we want you to be completely satisfied with your purchase. Whether you're a registered customer or a guest, our comprehensive return policy makes it easy to return or exchange products within the specified timeframe. You can initiate returns through your account dashboard or use our convenient guest return system."
}) => {
  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      )}
      <p className="text-lg text-[#4A4A4A] leading-relaxed">
        {description}
      </p>
      
      {/* New Features Highlight */}
      <div className="mt-6 p-6 bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl border border-[#C8102E]/20">
        <h3 className="text-lg font-semibold text-[#000000] mb-3">✨ New Return Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#4A4A4A]">
          <div className="flex items-start space-x-2">
            <span className="text-[#C8102E] font-bold">•</span>
            <span><strong>Guest Returns:</strong> Return items without an account using your order number and email</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-[#C8102E] font-bold">•</span>
            <span><strong>Order Tracking:</strong> Track your return status in real-time</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-[#C8102E] font-bold">•</span>
            <span><strong>WhatsApp Support:</strong> Get instant help with returns via WhatsApp</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-[#C8102E] font-bold">•</span>
            <span><strong>Account Benefits:</strong> Faster processing and order history for registered users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnIntroduction;
