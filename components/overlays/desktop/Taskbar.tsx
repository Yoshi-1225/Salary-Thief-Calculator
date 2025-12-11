import React from 'react';
import { Folder, MessageSquare, Mail, Grip, Wifi, Volume2 } from 'lucide-react';
import { OsType, MessengerType } from '../../../types';

interface TaskbarProps {
  os: OsType;
  messenger: MessengerType;
  time: Date;
}

export const Taskbar: React.FC<TaskbarProps> = React.memo(({ os, messenger, time }) => {
  const isMac = os === 'macos';
  
  if (isMac) {
    return (
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
    );
  }

  // Windows Taskbar
  return (
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
  );
});