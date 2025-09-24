"use client";

import { FileText } from 'lucide-react';

const defaultEssentialDocs = [
  'Original proof of purchase',
  'eXobe order confirmation',
  'Product serial number (if applicable)',
  'Photos of the defect/damage'
];

const defaultAdditionalInfo = [
  'Detailed description of the problem',
  'Date when issue first occurred',
  'Steps taken to resolve the issue',
  'Any error messages or codes'
];

interface WarrantyDocumentationProps {
  title?: string;
  subtitle?: string;
  essentialDocs?: string[];
  additionalInfo?: string[];
  essentialTitle?: string;
  additionalTitle?: string;
}

const WarrantyDocumentation: React.FC<WarrantyDocumentationProps> = ({
  title = "Required Documentation",
  subtitle = "What You'll Need",
  essentialDocs = defaultEssentialDocs,
  additionalInfo = defaultAdditionalInfo,
  essentialTitle = "Essential Documents:",
  additionalTitle = "Additional Information:"
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-blue-800">{subtitle}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">{essentialTitle}</h4>
            <ul className="space-y-1 text-sm">
              {essentialDocs.map((doc, index) => (
                <li key={index}>• {doc}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{additionalTitle}</h4>
            <ul className="space-y-1 text-sm">
              {additionalInfo.map((info, index) => (
                <li key={index}>• {info}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyDocumentation;
