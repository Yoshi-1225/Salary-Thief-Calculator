import React from 'react';
import { AppState, AppStatus } from '../types';
import { formatMoney, formatTimer } from '../utils/format';
import { Briefcase, Bath, Fish, LogOut, Coins } from 'lucide-react';

interface DashboardProps {
  state: AppState;
  onStatusChange: (status: AppStatus) => void;
  onStop: () => void;
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onStatusChange, onStop, className }) => {
  const isWorking = state.status === AppStatus.WORKING;
  const isPooping = state.status === AppStatus.POOPING;
  const isSlacking = state.status === AppStatus.SLACKING;

  const currentDuration = isPooping 
    ? Date.now() - state.poopStartTime 
    : isSlacking 
    ? Date.now() - state.slackStartTime 
    : 0;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Money Display */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 text-center border-4 border-yellow-400 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Coins className="w-24 h-24" />
        </div>
        <p className="text-gray-500 font-bold mb-1 uppercase tracking-wider text-sm">今日累積薪資</p>
        <div className="flex justify-center items-baseline gap-1 text-green-600">
          <span className="text-3xl font-bold">NT$</span>
          <span className="text-6xl md:text-7xl font-black digital-font tracking-tighter">
            {formatMoney(state.sessionTotal)}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-400 bg-gray-100 inline-block px-3 py-1 rounded-full">
          秒薪: NT$ <span>{state.salaryPerSecond.toFixed(4)}</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className={`px-4 py-2 rounded-lg font-bold text-center flex items-center justify-center gap-2 animate-pulse transition-colors duration-300 ${
        isPooping ? 'bg-amber-100 text-amber-800' :
        isSlacking ? 'bg-cyan-100 text-cyan-800' :
        'bg-green-100 text-green-800'
      }`}>
        {isPooping ? <Bath className="w-5 h-5"/> : isSlacking ? <Fish className="w-5 h-5"/> : <Briefcase className="w-5 h-5"/>}
        <span>
          {isPooping ? '帶薪大便中...' : isSlacking ? '薪水小偷摸魚中...' : '認真工作中 (賺錢中)'}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onStatusChange(isPooping ? AppStatus.WORKING : AppStatus.POOPING)}
          className={`group relative bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-amber-200 rounded-2xl p-4 flex flex-col items-center transition-all shadow-sm hover:shadow-md ${isPooping ? 'ring-4 ring-amber-400 bg-amber-100' : ''}`}
        >
          <div className="w-16 h-16 mb-2 rounded-full bg-amber-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            💩
          </div>
          <span className="font-bold text-amber-900">去大便</span>
          <span className="text-xs text-amber-600">製造不在場證明</span>
          {isPooping && (
            <div className="mt-2 font-mono text-amber-800 font-bold">{formatTimer(currentDuration)}</div>
          )}
        </button>

        <button
          onClick={() => onStatusChange(isSlacking ? AppStatus.WORKING : AppStatus.SLACKING)}
          className={`group relative bg-white hover:bg-cyan-50 active:bg-cyan-100 border-2 border-cyan-200 rounded-2xl p-4 flex flex-col items-center transition-all shadow-sm hover:shadow-md ${isSlacking ? 'ring-4 ring-cyan-400 bg-cyan-100' : ''}`}
        >
          <div className="w-16 h-16 mb-2 rounded-full bg-cyan-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            🐟
          </div>
          <span className="font-bold text-cyan-900">開始摸魚</span>
          <span className="text-xs text-cyan-600">假裝系統更新</span>
          {isSlacking && (
            <div className="mt-2 font-mono text-cyan-800 font-bold">{formatTimer(currentDuration)}</div>
          )}
        </button>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 text-8xl opacity-10 select-none">💩</div>
          <h3 className="text-amber-800 text-sm font-bold mb-1">大便賺得</h3>
          <p className="text-2xl font-black text-amber-600 digital-font">NT${formatMoney(state.poopTotal)}</p>
        </div>
        <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100 relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 text-8xl opacity-10 select-none">🐟</div>
          <h3 className="text-cyan-800 text-sm font-bold mb-1">摸魚賺得</h3>
          <p className="text-2xl font-black text-cyan-600 digital-font">NT${formatMoney(state.slackTotal)}</p>
        </div>
      </div>

      <button
        onClick={onStop}
        className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl border border-red-200 mt-4 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        下班 (結算)
      </button>
    </div>
  );
};

export default Dashboard;