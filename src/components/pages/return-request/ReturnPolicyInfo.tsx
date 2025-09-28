"use client";

export default function ReturnPolicyInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">Return Policy & Guidelines</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-[#000000] mb-4">Return Timeframe</h3>
          <ul className="space-y-2 text-[#4A4A4A]">
            <li>• 30 days from delivery date</li>
            <li>• Items must be in original condition</li>
            <li>• Original packaging required</li>
            <li>• Tags and labels must be attached</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#000000] mb-4">Return Process</h3>
          <ol className="space-y-2 text-[#4A4A4A]">
            <li>1. Submit return request online</li>
            <li>2. Print prepaid return label</li>
            <li>3. Package items securely</li>
            <li>4. Drop off at courier location</li>
          </ol>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#F6E2E0] rounded-xl border border-[#C8102E]/20">
        <h4 className="font-semibold text-[#000000] mb-2">Non-Returnable Items</h4>
        <p className="text-[#4A4A4A] mb-4">
          The following items cannot be returned for hygiene and safety reasons:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#4A4A4A]">
          <div>• Personal care items</div>
          <div>• Underwear and swimwear</div>
          <div>• Food and beverages</div>
          <div>• Custom/personalized items</div>
        </div>
      </div>
    </div>
  );
}
