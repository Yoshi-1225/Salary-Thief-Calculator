import React from 'react';

interface WorkConfigSectionProps {
  days: number;
  setDays: (days: number) => void;
  hours: number;
  setHours: (hours: number) => void;
  inputClass: string;
}

const WorkConfigSection: React.FC<WorkConfigSectionProps> = ({ days, setDays, hours, setHours, inputClass }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">每月工作天數</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className={`${inputClass} text-center`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">每日工時</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className={`${inputClass} text-center`}
        />
      </div>
    </div>
  );
};

export default WorkConfigSection;