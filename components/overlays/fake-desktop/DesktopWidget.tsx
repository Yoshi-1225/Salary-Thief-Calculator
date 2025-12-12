import React from 'react';
import { formatMoney, formatTimer } from '../../../utils/format';

interface DesktopWidgetProps {
  money: number;
  duration: number;
}

const DesktopWidget: React.FC<DesktopWidgetProps> = React.memo(({ money, duration }) => (
  <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md rounded-xl p-4 text-white text-right border border-white/10 shadow-lg group hover:opacity-100 transition-opacity opacity-0 duration-500 z-20">
    <div className="text-xs opacity-70 mb-1">帶薪拉屎中</div>
    <div className="text-3xl font-black digital-font text-amber-300">NT$ {formatMoney(money)}</div>
    <div className="text-sm font-mono opacity-80 mt-1">{formatTimer(duration)}</div>
    <div className="mt-2 text-[10px] bg-white/20 inline-block px-2 py-0.5 rounded text-white/90">點擊任意處回到工作</div>
  </div>
));

export default DesktopWidget;