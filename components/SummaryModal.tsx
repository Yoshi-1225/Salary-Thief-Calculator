import React from 'react';
import { AppState } from '../types';
import { formatMoney, formatTime } from '../utils/format';
import { Home } from 'lucide-react';
import { SUMMARY_COMMENTS } from '../data/constants';

interface SummaryModalProps {
  state: AppState;
  onRestart: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ state, onRestart }) => {
  const workEarned = state.sessionTotal - state.poopTotal - state.slackTotal;
  const totalDuration = Date.now() - state.startTime;
  const workTime = totalDuration - state.totalPoopTime - state.totalSlackTime;
  
  const randomComment = SUMMARY_COMMENTS[Math.floor(Math.random() * SUMMARY_COMMENTS.length)];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-float">
        <div className="bg-blue-600 p-6 text-center text-white relative">
          <h2 className="text-3xl font-black mb-1">下班打卡單</h2>
          <p className="text-blue-100 text-sm">{new Date().toLocaleDateString('zh-TW')}</p>
          <div className="absolute -bottom-3 left-0 w-full h-4 bg-white" style={{ clipPath: "polygon(0 50%, 5% 0, 10% 50%, 15% 0, 20% 50%, 25% 0, 30% 50%, 35% 0, 40% 50%, 45% 0, 50% 50%, 55% 0, 60% 50%, 65% 0, 70% 50%, 75% 0, 80% 50%, 85% 0, 90% 50%, 95% 0, 100% 50%, 100% 100%, 0 100%)" }}></div>
        </div>
        
        <div className="p-6 pt-8 space-y-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-bold uppercase">今日總收入</p>
            <p className="text-5xl font-black text-green-600 tracking-tight">NT${formatMoney(state.sessionTotal)}</p>
          </div>

          <div className="space-y-3 text-sm">
            {state.isRetroactive && (
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🕰️</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">補登上班</span>
                    <span className="text-xs text-gray-500">{state.retroStartTimeString} 起</span>
                  </div>
                </div>
                <span className="font-bold text-purple-600">已計入</span>
              </div>
            )}

            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-xl">💩</span>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700">帶薪拉屎</span>
                  <span className="text-xs text-gray-500">{formatTime(state.totalPoopTime)}</span>
                </div>
              </div>
              <span className="font-bold text-amber-600">+ NT${formatMoney(state.poopTotal)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-xl">🐟</span>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700">薪水小偷</span>
                  <span className="text-xs text-gray-500">{formatTime(state.totalSlackTime)}</span>
                </div>
              </div>
              <span className="font-bold text-cyan-600">+ NT${formatMoney(state.slackTotal)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2">
                <span className="text-xl">💼</span>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700">認真工作</span>
                  <span className="text-xs text-gray-500">{formatTime(workTime)}</span>
                </div>
              </div>
              <span className="font-bold text-gray-600">+ NT${formatMoney(workEarned)}</span>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-dashed border-gray-300">
            <p className="text-xs text-gray-400 italic">"{randomComment}"</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50">
          <button 
            onClick={onRestart}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            回家休息 (重置)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;