"use client";

const defaultSchedules = [
  {
    id: 'standard',
    title: 'Standard Delivery Hours',
    schedule: [
      { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
      { day: 'Saturday', hours: '8:00 AM - 1:00 PM' },
      { day: 'Sunday', hours: 'No deliveries' },
      { day: 'Public Holidays', hours: 'No deliveries' }
    ]
  },
  {
    id: 'express',
    title: 'Express & Same Day',
    schedule: [
      { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '8:00 AM - 2:00 PM' },
      { day: 'Same Day Cutoff', hours: '12:00 PM' },
      { day: 'Express Cutoff', hours: '3:00 PM' }
    ]
  }
];

interface Schedule {
  day: string;
  hours: string;
}

interface ScheduleGroup {
  id: string;
  title: string;
  schedule: Schedule[];
}

interface DeliveryScheduleProps {
  title?: string;
  schedules?: ScheduleGroup[];
  columns?: number;
}

const DeliverySchedule: React.FC<DeliveryScheduleProps> = ({
  title = "Delivery Schedule",
  schedules = defaultSchedules,
  columns = 2
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-6`}>
        {schedules.map((scheduleGroup) => (
          <div key={scheduleGroup.id} className="p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-[#000000] mb-3">{scheduleGroup.title}</h3>
            <ul className="space-y-2 text-[#4A4A4A]">
              {scheduleGroup.schedule.map((item, index) => (
                <li key={index}>
                  <strong>{item.day}:</strong> {item.hours}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliverySchedule;
