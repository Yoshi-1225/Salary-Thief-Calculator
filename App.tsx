import React, { useState, useEffect } from 'react';
import SetupCard from './components/SetupCard';
import Dashboard from './components/Dashboard';
import FakeDesktop from './components/overlays/FakeDesktop';
import FakeUpdateScreen from './components/overlays/FakeUpdateScreen';
import SummaryModal from './components/SummaryModal';
import Header from './components/layout/Header';
import Toast from './components/ui/Toast';
import { AppStatus } from './types';
import { useSalaryTimer } from './hooks/useSalaryTimer';

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
      <Header onTitleClick={() => showToast("現在已是網頁應用程式，無需下載！")} />

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
      <Toast message={toastMessage} />
    </div>
  );
}