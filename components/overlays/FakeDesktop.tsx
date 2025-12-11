import React, { useState, useEffect } from 'react';
import ChatWindow from '../ui/ChatWindow.tsx';
import { formatMoney, formatTimer } from '../../utils/format.ts';
import { Folder, FileSpreadsheet, FileText, Wifi, Volume2, MessageSquare, Mail, Grip } from 'lucide-react';
import { JobType, OsType, MessengerType } from '../../types.ts';

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
      onClick={(e) => {
        onClick();
      }}
      className={`fixed inset-0 z-[150] ${wallpaperClass} cursor-pointer select-none overflow-hidden font-segoe`}
    >
      {/* Desktop Widget (Top Right - Stealthy) */}
      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md rounded-xl p-4 text-white text-right border border-white/10 shadow-lg group hover:opacity-100 transition-opacity opacity-0 duration-500 z-20">
        <div className="text-xs opacity-70 mb-1">帶薪拉屎中</div>
        <div className="text-3xl font-black digital-font text-amber-300">NT$ {formatMoney(money)}</div>
        <div className="text-sm font-mono opacity-80 mt-1">{formatTimer(duration)}</div>
        <div className="mt-2 text-[10px] bg-white/20 inline-block px-2 py-0.5 rounded text-white/90">點擊任意處回到工作</div>
      </div>

      {/* Fake Desktop Icons */}
      <div className={`absolute ${isMac ? 'top-10 right-6 items-end' : 'top-6 left-6 items-center'} flex flex-col gap-6 opacity-80`}>
        <div className="flex flex-col items-center gap-1 w-20 group">
          <div className="w-12 h-12 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white group-hover:bg-blue-400 transition-colors">
            <Folder className="w-8 h-8" />
          </div>
          <span className="text-white text-xs drop-shadow-md text-center bg-black/0 group-hover:bg-blue-600/50 px-1 rounded">專案資料</span>
        </div>
        <div className="flex flex-col items-center gap-1 w-20 group">
          <div className="w-12 h-12 bg-green-600 rounded-lg shadow-md flex items-center justify-center text-white group-hover:bg-green-500 transition-colors">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <span className="text-white text-xs drop-shadow-md text-center bg-black/0 group-hover:bg-blue-600/50 px-1 rounded">2024_Q1.xlsx</span>
        </div>
        <div className="flex flex-col items-center gap-1 w-20 group">
          <div className="w-12 h-12 bg-blue-400 rounded-lg shadow-md flex items-center justify-center text-white group-hover:bg-blue-300 transition-colors">
            <FileText className="w-8 h-8" />
          </div>
          <span className="text-white text-xs drop-shadow-md text-center bg-black/0 group-hover:bg-blue-600/50 px-1 rounded">待辦事項.txt</span>
        </div>
      </div>

      <ChatWindow jobTitle={jobTitle} messenger={messenger} />

      {/* Fake Taskbar / Dock */}
      {isMac ? (
        // MacOS Dock
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl h-16 px-4 flex items-center gap-4 shadow-2xl">
           <div className="w-10 h-10 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center text-2xl">😊</div>
           <div className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center"><Folder className="text-blue-500" /></div>
           <div className="w-10 h-10 bg-black rounded-lg shadow-lg flex items-center justify-center"><div className="w-full h-full bg-gray-800 rounded-lg"></div></div>
           <div className="w-[1px] h-10 bg-white/20"></div>
           <div className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center relative">
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">1</span>
               {messenger === 'line' ? <div className="text-green-500 font-bold">L</div> : <MessageSquare className="text-blue-500" />}
           </div>
        </div>
      ) : (
        // Windows Taskbar
        <div className="absolute bottom-0 w-full h-10 bg-[#f3f3f3]/95 backdrop-blur border-t border-white/50 flex items-center justify-between px-2 z-10">
            <div className="flex items-center gap-1">
            <div className="w-8 h-8 hover:bg-white/50 rounded flex items-center justify-center cursor-pointer transition-colors">
                <Grip className="w-5 h-5 text-blue-500" />
            </div>
            <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
            {/* Chat Icon Active */}
            <div className="w-8 h-8 bg-white/80 border-b-2 border-blue-500 rounded flex items-center justify-center cursor-pointer relative">
                <MessageSquare className="text-blue-600 w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-8 h-8 hover:bg-white/50 rounded flex items-center justify-center cursor-pointer">
                <Mail className="text-gray-600 w-5 h-5" />
            </div>
            </div>
            <div className="flex items-center gap-3 px-2 text-xs text-gray-700">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <div className="flex flex-col items-end leading-none gap-0.5">
                <span>{time.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                <span>{time.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default FakeDesktop;