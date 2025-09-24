"use client";

import { AlertTriangle, Package, CheckCircle } from 'lucide-react';

const defaultNotes = [
  {
    id: 'delivery-attempts',
    title: 'Delivery Attempts',
    icon: AlertTriangle,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    titleColor: 'text-yellow-800',
    iconColor: 'text-yellow-500',
    content: 'We make up to 3 delivery attempts. If unsuccessful, your package will be held at the nearest collection point for 7 days.'
  },
  {
    id: 'large-items',
    title: 'Large Items',
    icon: Package,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    titleColor: 'text-blue-800',
    iconColor: 'text-blue-500',
    content: 'Furniture and large appliances require special delivery arrangements. We\'ll contact you to schedule delivery within 5-10 business days.'
  },
  {
    id: 'signature-required',
    title: 'Signature Required',
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    titleColor: 'text-green-800',
    iconColor: 'text-green-500',
    content: 'All deliveries require a signature. Please ensure someone is available to receive your order during delivery hours.'
  }
];

interface ImportantNote {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  titleColor: string;
  iconColor: string;
  content: string;
}

interface DeliveryImportantNotesProps {
  title?: string;
  notes?: ImportantNote[];
}

const DeliveryImportantNotes: React.FC<DeliveryImportantNotesProps> = ({
  title = "Important Delivery Information",
  notes = defaultNotes
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-4">
        {notes.map((note) => {
          const IconComponent = note.icon;
          return (
            <div key={note.id} className={`p-4 rounded-lg border ${note.borderColor} ${note.bgColor}`}>
              <div className="flex items-center space-x-2 mb-2">
                <IconComponent className={`h-5 w-5 ${note.iconColor}`} />
                <h3 className={`font-semibold ${note.titleColor}`}>{note.title}</h3>
              </div>
              <p className={`${note.textColor} text-sm`}>
                {note.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryImportantNotes;
