"use client";

import { CreditCard, AlertTriangle } from 'lucide-react';

const defaultRefundMethods = [
  { method: 'Credit/Debit Cards', timeframe: '5-7 business days' },
  { method: 'EFT/Bank Transfer', timeframe: '2-3 business days' },
  { method: 'eXobe Store Credit', timeframe: 'Immediate' }
];

const defaultImportantNotes = [
  'Original shipping costs are non-refundable',
  'Return shipping is free for defective items',
  'Refunds are processed to the original payment method',
  'Store credit refunds never expire'
];

interface RefundMethod {
  method: string;
  timeframe: string;
}

interface RefundInformationProps {
  title?: string;
  processingTitle?: string;
  processingDescription?: string;
  refundMethods?: RefundMethod[];
  importantNotesTitle?: string;
  importantNotes?: string[];
  processingDays?: string;
}

const RefundInformation: React.FC<RefundInformationProps> = ({
  title = "Refund Information",
  processingTitle = "Refund Processing",
  processingDescription = "Once we receive and inspect your returned item, we'll process your refund within 5-7 business days.",
  refundMethods = defaultRefundMethods,
  importantNotesTitle = "Important Notes",
  importantNotes = defaultImportantNotes,
  processingDays = "5-7 business days"
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <CreditCard className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-blue-800">{processingTitle}</h3>
        </div>
        <p className="text-blue-700 mb-4">
          {processingDescription}
        </p>
        <ul className="space-y-2 text-blue-700">
          {refundMethods.map((refund, index) => (
            <li key={index}>• <strong>{refund.method}:</strong> {refund.timeframe}</li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <h3 className="text-xl font-semibold text-yellow-800">{importantNotesTitle}</h3>
        </div>
        <ul className="space-y-2 text-yellow-700">
          {importantNotes.map((note, index) => (
            <li key={index}>• {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RefundInformation;
