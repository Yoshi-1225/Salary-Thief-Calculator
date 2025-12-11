import React from 'react';
import { Folder, FileSpreadsheet, FileText } from 'lucide-react';

export const DesktopIcons: React.FC = React.memo(() => (
  <div className="flex flex-col gap-6 opacity-80">
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
));