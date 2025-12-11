import React, { useState, useEffect } from 'react';
import SetupCard from './components/SetupCard';
import Dashboard from './components/Dashboard';
import FakeDesktop from './components/overlays/FakeDesktop';
import FakeUpdateScreen from './components/overlays/FakeUpdateScreen';
import SummaryModal from './components/SummaryModal';
import { AppStatus } from './types';
import { useSalaryTimer } from './hooks/useSalaryTimer';
import { Star } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Helper to show toast messages
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Logic extracted to custom hook
  const { state, handleStart, handleStop, changeStatus, handleRestart } = useSalaryTimer(showToast);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onStopClick = () => {
    handleStop();
    setShowSummary(true);
  };

  const onRestartClick = () => {
    setShowSummary(false);
    handleRestart();
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-800 relative">
      {/* Overlays - Hidden on mobile */}
      {!isMobile && state.status === AppStatus.POOPING && state.settings && (
        <FakeDesktop 
          money={state.poopTotal} 
          duration={Date.now() - state.poopStartTime} 
          onClick={() => changeStatus(AppStatus.WORKING)}
          jobTitle={state.settings.jobTitle}
          os={state.settings.os}
          messenger={state.settings.messenger}
        />
      )}
      
      {!isMobile && state.status === AppStatus.SLACKING && (
        <FakeUpdateScreen 
          percentage={Math.floor(state.slackTotal)} 
          moneyString={state.slackTotal.toFixed(2).replace('.', '')}
          onClick={() => changeStatus(AppStatus.WORKING)} 
        />
      )}

      {showSummary && (
        <SummaryModal state={state} onRestart={onRestartClick} />
      )}

      {/* Hero Section */}
      <header className="w-full header-bg shadow-md relative overflow-hidden group">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 text-center text-white">
          <h1 
            className="text-4xl md:text-6xl font-black mb-2 tracking-tight cursor-pointer hover:text-blue-200 transition-colors select-none drop-shadow-lg"
            onClick={() => showToast("現在已是網頁應用程式，無需下載！")}
          >
            上班跳錢機 💸
          </h1>
          <p className="text-xl font-bold opacity-90">每一秒鐘，都是金錢的聲音</p>
        </div>
      </header>

      <main className="w-full max-w-md md:max-w-2xl px-4 py-6 flex-grow flex flex-col gap-6 relative z-10">
        {state.status === AppStatus.IDLE ? (
          <SetupCard onStart={handleStart} />
        ) : (
          <Dashboard 
            state={state} 
            onStatusChange={changeStatus} 
            onStop={onStopClick} 
          />
        )}
      </main>

      {/* Toast */}
      <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl transition-opacity pointer-events-none z-[200] flex items-center gap-2 ${toastMessage ? 'opacity-100' : 'opacity-0'}`}>
        <Star className="text-yellow-400 w-5 h-5" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}