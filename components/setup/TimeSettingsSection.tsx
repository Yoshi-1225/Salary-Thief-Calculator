import React, { useRef } from 'react';
import { Clock, Info } from 'lucide-react';

interface TimeSettingsSectionProps {
  startTime: string;
  setStartTime: (time: string) => void;
  setToNow: () => void;
}

const TimeSettingsSection: React.FC<TimeSettingsSectionProps> = ({ startTime, setStartTime, setToNow }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      // Cast to any to prevent TypeScript from narrowing inputRef.current to never
      if ('showPicker' in (inputRef.current as any)) {
        // Modern browsers support showPicker
        try {
          (inputRef.current as any).showPicker();
        } catch (e) {
          inputRef.current.focus();
        }
      } else {
        // Fallback
        inputRef.current.focus();
        inputRef.current.click();
      }
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className="p-4 rounded-xl border bg-gray-50 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors group"
    >
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-bold flex items-center gap-2 text-gray-700 pointer-events-none">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>上班打卡時間</span>
        </label>
      </div>
      
      <div>
        <div className="flex gap-2 items-stretch h-12">
          <input
            ref={inputRef}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="flex-1 min-w-0 w-full px-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none text-base bg-white text-gray-900 font-mono cursor-pointer"
            style={{ colorScheme: 'light' }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Don't open picker when clicking 'Now'
              setToNow();
            }}
            className="px-4 rounded-lg border border-gray-300 bg-white text-sm font-bold text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95 whitespace-nowrap shadow-sm z-10"
          >
            現在
          </button>
        </div>
        <div className="mt-2 flex items-start gap-2 text-xs text-gray-500 px-1 pointer-events-none">
           <Info className="w-3 h-3 mt-0.5 shrink-0" />
           <span>設定為「過去」的時間將自動補算薪水 (如昨晚加班)。</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSettingsSection;