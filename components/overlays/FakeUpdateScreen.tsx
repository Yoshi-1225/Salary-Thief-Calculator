import React, { useEffect } from 'react';

interface FakeUpdateScreenProps {
  percentage: number;
  moneyString: string;
  onClick: () => void;
}

const FakeUpdateScreen: React.FC<FakeUpdateScreenProps> = ({ percentage, moneyString, onClick }) => {
  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => console.log(err));
    }
    return () => {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch((err) => console.log(err));
      }
    };
  }, []);

  return (
    <div 
      onClick={onClick}
      className="fixed inset-0 z-[100] bg-[#0078D7] cursor-none flex flex-col items-center justify-center text-white font-segoe select-none"
    >
      <div className="loader-ring mb-8">
        <div></div><div></div><div></div><div></div>
      </div>
      <div className="text-2xl md:text-3xl font-light mb-2 text-center">
        正在設定 Windows 更新
      </div>
      <div className="text-2xl md:text-3xl font-light mb-8 text-center">
        <span>{percentage}</span>% 完成
      </div>
      <div className="text-lg font-light text-center opacity-80">
        請勿關閉電腦
      </div>
      <div className="absolute bottom-10 text-xs md:text-sm font-mono opacity-40 text-blue-200">
        Installing Security Intelligence Update - KB<span>{moneyString}</span>
      </div>
    </div>
  );
};

export default FakeUpdateScreen;