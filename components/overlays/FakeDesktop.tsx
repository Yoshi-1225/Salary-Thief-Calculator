
import React, { useState, useEffect } from 'react';
import ChatWindow from '../ui/ChatWindow';
import { JobType, OsType, MessengerType } from '../../types';
import DesktopWidget from './fake-desktop/DesktopWidget';
import DesktopIcons from './fake-desktop/DesktopIcons';
import Taskbar from './fake-desktop/Taskbar';

// --- Main Component ---

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

  // Window Resize Logic for "Poop Mode"
  useEffect(() => {
    // Attempt to resize the browser window to match the chat dialog size
    // Note: Modern browsers often block window.resizeTo() unless the window was created by script.
    // However, for installed PWAs or specific environments, this works.
    try {
      window.resizeTo(360, 520);
    } catch (e) {
      console.log("Could not resize window:", e);
    }
  }, []);

  const isMac = os === 'macos';
  const wallpaperClass = isMac 
    ? "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500" 
    : "desktop-bg"; // Default Windows-ish blue

  return (
    <div 
      onClick={onClick}
      className={`fixed inset-0 z-[150] ${wallpaperClass} cursor-pointer select-none overflow-hidden font-segoe flex items-center justify-center`}
    >
      <DesktopWidget money={money} duration={duration} />

      <div className={`absolute ${isMac ? 'top-10 right-6 items-end' : 'top-6 left-6 items-center'}`}>
        <DesktopIcons />
      </div>

      {/* 
         Centered ChatWindow to ensure it is visible even if the window shrinks to small size 
         We use relative positioning here because the container is flex-centered.
      */}
      <ChatWindow 
        jobTitle={jobTitle} 
        messenger={messenger} 
        className="relative shadow-2xl z-40"
      />

      <Taskbar os={os} messenger={messenger} time={time} />
    </div>
  );
};

export default FakeDesktop;