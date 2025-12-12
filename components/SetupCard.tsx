import React, { useState } from 'react';
import { Settings, JobType, OsType, MessengerType } from '../types';
import { Settings as SettingsIcon, PlayCircle } from 'lucide-react';
import SalarySection from './setup/SalarySection';
import WorkConfigSection from './setup/WorkConfigSection';
import JobSettingsSection from './setup/JobSettingsSection';
import TimeSettingsSection from './setup/TimeSettingsSection';

interface SetupCardProps {
  onStart: (settings: Settings) => void;
  className?: string;
}

const SALARY_PRESETS = [30000, 35000, 38000, 40000, 45000, 50000, 60000, 80000];

const SetupCard: React.FC<SetupCardProps> = ({ onStart, className }) => {
  const [salary, setSalary] = useState<string>('');
  const [days, setDays] = useState<number>(22);
  const [hours, setHours] = useState<number>(8);
  
  // Initialize start time to current time
  const [startTime, setStartTime] = useState<string>(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  });
  
  // New State
  const [jobTitle, setJobTitle] = useState<JobType>('engineer');
  const [os, setOs] = useState<OsType>('windows');
  const [messenger, setMessenger] = useState<MessengerType>('teams');

  const setToNow = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    setStartTime(`${h}:${m}`);
  };

  const handleStart = () => {
    if (!salary || parseFloat(salary) <= 0) {
      alert("請輸入有效的月薪！");
      return;
    }
    onStart({
      salary: parseFloat(salary),
      days,
      hours,
      startTime: startTime,
      jobTitle,
      os,
      messenger
    });
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400";

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-800">
        <SettingsIcon className="text-blue-600" />
        設定你的身價
      </h2>

      <div className="space-y-5">
        <SalarySection 
          salary={salary} 
          setSalary={setSalary} 
          presets={SALARY_PRESETS} 
        />

        <WorkConfigSection 
          days={days} 
          setDays={setDays} 
          hours={hours} 
          setHours={setHours} 
          inputClass={inputClass} 
        />

        <JobSettingsSection 
          jobTitle={jobTitle} 
          setJobTitle={setJobTitle}
          os={os} 
          setOs={setOs}
          messenger={messenger} 
          setMessenger={setMessenger}
          inputClass={inputClass}
        />

        <TimeSettingsSection 
          startTime={startTime} 
          setStartTime={setStartTime} 
          setToNow={setToNow} 
        />

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-6 h-6" />
          開始上班 (賺錢!)
        </button>
      </div>
    </div>
  );
};

export default SetupCard;