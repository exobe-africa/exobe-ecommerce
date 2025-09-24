"use client";

const NextStepsCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-[#000000] mb-6">What happens next?</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-[#C8102E] text-white rounded-full flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <p className="font-semibold text-[#000000]">Order Processing</p>
            <p className="text-sm text-[#4A4A4A]">We're preparing your items for shipment (1-2 business days)</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <p className="font-semibold text-[#000000]">Shipping</p>
            <p className="text-sm text-[#4A4A4A]">Your order will be dispatched and tracking info sent</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <p className="font-semibold text-[#000000]">Delivery</p>
            <p className="text-sm text-[#4A4A4A]">Enjoy your new items from eXobe!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextStepsCard;
