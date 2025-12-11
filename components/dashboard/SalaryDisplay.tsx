import React from 'react';
import { formatMoney } from '../../utils/format';
import { Coins } from 'lucide-react';

interface SalaryDisplayProps {
  sessionTotal: number;
  salaryPerSecond: number;
}

const SalaryDisplay: React.FC<SalaryDisplayProps> = ({ sessionTotal, salaryPerSecond }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 text-center border-4 border-yellow-400 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <Coins className="w-24 h-24" />
      </div>
      <p className="text-gray-500 font-bold mb-1 uppercase tracking-wider text-sm">今日累積薪資</p>
      <div className="flex justify-center items-baseline gap-1 text-green-600">
        <span className="text-3xl font-bold">NT$</span>
        <span className="text-6xl md:text-7xl font-black digital-font tracking-tighter">
          {formatMoney(sessionTotal)}
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-400 bg-gray-100 inline-block px-3 py-1 rounded-full">
        秒薪: NT$ <span>{salaryPerSecond.toFixed(4)}</span>
      </div>
    </div>
  );
};

export default SalaryDisplay;