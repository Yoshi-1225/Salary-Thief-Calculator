import React from 'react';
import { JobType, OsType, MessengerType } from '../../types';
import { Briefcase, Monitor, MessageSquare } from 'lucide-react';

interface JobSettingsSectionProps {
  jobTitle: JobType;
  setJobTitle: (val: JobType) => void;
  os: OsType;
  setOs: (val: OsType) => void;
  messenger: MessengerType;
  setMessenger: (val: MessengerType) => void;
  inputClass: string;
}

const JobSettingsSection: React.FC<JobSettingsSectionProps> = ({
  jobTitle, setJobTitle,
  os, setOs,
  messenger, setMessenger,
  inputClass
}) => {
  return (
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
  );
};

export default JobSettingsSection;