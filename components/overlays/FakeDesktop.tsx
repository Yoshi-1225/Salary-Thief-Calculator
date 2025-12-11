import React, { useState, useEffect } from 'react';
import ChatWindow from '../ui/ChatWindow';
import { JobType, OsType, MessengerType } from '../../types';
import { DesktopWidget } from './desktop/DesktopWidget';
import { DesktopIcons } from './desktop/DesktopIcons';
import { Taskbar } from './desktop/Taskbar';

interface FakeDesktopProps {
  money: number;
  duration: number;
  onClick: () => void;
  jobTitle: JobType;
  os: OsType;
  messenger: MessengerType;
}

const FakeDesktop: React.FC<FakeDesktopProps> = ({ money, duration, onClick, jobTitle, os, messenger }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isMac = os === 'macos';
  const wallpaperClass = isMac 
    ? "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500" 
    : "desktop-bg"; // Default Windows-ish blue

  return (
    <div 
      onClick={onClick}
      className={`fixed inset-0 z-[150] ${wallpaperClass} cursor-pointer select-none overflow-hidden font-segoe`}
    >
      <DesktopWidget money={money} duration={duration} />

      <div className={`absolute ${isMac ? 'top-10 right-6 items-end' : 'top-6 left-6 items-center'}`}>
        <DesktopIcons />
      </div>

      <ChatWindow jobTitle={jobTitle} messenger={messenger} />

      <Taskbar os={os} messenger={messenger} time={time} />
    </div>
  );
};

export default FakeDesktop;