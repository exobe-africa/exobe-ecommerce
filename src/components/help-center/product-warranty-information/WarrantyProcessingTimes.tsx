"use client";

import { Clock, Wrench, CheckCircle } from 'lucide-react';

const defaultProcessingStages = [
  {
    id: 'initial-response',
    title: 'Initial Response',
    time: '24 hours',
    description: 'Acknowledgment and case number',
    icon: Clock
  },
  {
    id: 'assessment',
    title: 'Assessment',
    time: '2-5 days',
    description: 'Technical evaluation and decision',
    icon: Wrench
  },
  {
    id: 'resolution',
    title: 'Resolution',
    time: '5-10 days',
    description: 'Repair, replacement, or refund',
    icon: CheckCircle
  }
];

interface ProcessingStage {
  id: string;
  title: string;
  time: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface WarrantyProcessingTimesProps {
  title?: string;
  stages?: ProcessingStage[];
  columns?: number;
}

const WarrantyProcessingTimes: React.FC<WarrantyProcessingTimesProps> = ({
  title = "Warranty Claim Processing Times",
  stages = defaultProcessingStages,
  columns = 3
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[3]} gap-6`}>
        {stages.map((stage) => {
          const IconComponent = stage.icon;
          return (
            <div key={stage.id} className="p-6 rounded-xl border border-gray-200 text-center">
              <IconComponent className="h-8 w-8 text-[#C8102E] mx-auto mb-3" />
              <h3 className="font-semibold text-[#000000] mb-2">{stage.title}</h3>
              <p className="text-2xl font-bold text-[#C8102E] mb-1">{stage.time}</p>
              <p className="text-[#4A4A4A] text-sm">{stage.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WarrantyProcessingTimes;
