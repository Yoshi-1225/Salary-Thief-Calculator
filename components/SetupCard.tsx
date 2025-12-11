import React, { useState } from 'react';
import { Settings, JobType, OsType, MessengerType } from '../types';
import { Settings as SettingsIcon, History, PlayCircle, Monitor, MessageSquare, Briefcase, Info } from 'lucide-react';

interface SetupCardProps {
  onStart: (settings: Settings) => void;
  className?: string;
}

const SALARY_PRESETS = [30000, 35000, 38000, 40000, 45000, 50000, 60000, 80000];

const SetupCard: React.FC<SetupCardProps> = ({ onStart, className }) => {
  const [salary, setSalary] = useState<string>('');
  const [days, setDays] = useState<number>(22);
  const [hours, setHours] = useState<number>(8);
  
  // Retroactive Time State
  const [useRetroactive, setUseRetroactive] = useState(false);
  const [startTime, setStartTime] = useState<string>('09:00');
  
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
      startTime: useRetroactive ? startTime : '',
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">月薪 (NT$)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-xl font-bold text-center transition-colors bg-white text-gray-900"
            placeholder="例如: 45000"
          />
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {SALARY_PRESETS.map((amount) => (
              <button
                key={amount}
                onClick={() => setSalary(amount.toString())}
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full border border-gray-200 hover:border-blue-200 transition-all active:scale-95"
              >
                ${amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> 職業
            </label>
            <select 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value as JobType)}
              className={`${inputClass} text-sm py-1.5`}
            >
              <option value="engineer">工程師</option>
              <option value="designer">設計師</option>
              <option value="pm">PM (專案經理)</option>
              <option value="sales">業務/行銷</option>
              <option value="admin">行政/人資</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
               <Monitor className="w-3 h-3" /> 系統
            </label>
            <select 
              value={os} 
              onChange={(e) => setOs(e.target.value as OsType)}
              className={`${inputClass} text-sm py-1.5`}
            >
              <option value="windows">Windows</option>
              <option value="macos">macOS</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> 通訊
            </label>
            <select 
              value={messenger} 
              onChange={(e) => setMessenger(e.target.value as MessengerType)}
              className={`${inputClass} text-sm py-1.5`}
            >
              <option value="teams">Teams</option>
              <option value="line">LINE</option>
              <option value="slack">Slack</option>
            </select>
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${useRetroactive ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-bold flex items-center gap-2 cursor-pointer select-none ${useRetroactive ? 'text-blue-800' : 'text-gray-500'}`}>
              <input 
                type="checkbox" 
                checked={useRetroactive} 
                onChange={(e) => setUseRetroactive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="flex items-center gap-2">
                <History className="text-lg w-5 h-5" />
                補登上班時間
              </span>
            </label>
          </div>
          
          {useRetroactive && (
            <div className="mt-4">
              <div className="flex gap-2 items-stretch h-12">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="flex-1 min-w-0 w-full px-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none text-base bg-white text-gray-900 font-mono"
                  style={{ colorScheme: 'light' }}
                />
                <button
                  type="button"
                  onClick={setToNow}
                  className="px-4 rounded-lg border border-gray-300 bg-white text-sm font-bold text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95 whitespace-nowrap shadow-sm"
                >
                  現在
                </button>
              </div>
              <div className="mt-2 flex items-start gap-2 text-xs text-blue-800 bg-blue-100/50 p-2 rounded-lg">
                 <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                 <span>若時間晚於現在（如現在 10:00，填 23:00），將算作「昨天」。</span>
              </div>
            </div>
          )}
        </div>

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