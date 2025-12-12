import React, { useState, useEffect, useRef } from 'react';
import SetupCard from './components/SetupCard';
import Dashboard from './components/Dashboard';
import FakeDesktop from './components/overlays/FakeDesktop';
import FakeUpdateScreen from './components/overlays/FakeUpdateScreen';
import SummaryModal from './components/SummaryModal';
import { AppState, AppStatus, Settings } from './types';
import { playSound } from './utils/audio';
import { Star } from 'lucide-react';

const INITIAL_STATE: AppState = {
  status: AppStatus.IDLE,
  salaryPerSecond: 0,
  startTime: 0,
  sessionTotal: 0,
  poopTotal: 0,
  slackTotal: 0,
  poopStartTime: 0,
  slackStartTime: 0,
  totalPoopTime: 0,
  totalSlackTime: 0,
  lastFrameTime: 0,
  isRetroactive: false,
  retroStartTimeString: "",
  settings: null
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [showSummary, setShowSummary] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide loader when App mounts
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStart = (settings: Settings) => {
    const secondsPerMonth = settings.days * settings.hours * 3600;
    const salaryPerSecond = settings.salary / secondsPerMonth;

    let startTime = Date.now();
    let sessionTotal = 0;
    let isRetroactive = false;
    let retroStartTimeString = "";

    const now = new Date();
    const [inputHours, inputMinutes] = settings.startTime.split(':').map(Number);
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), inputHours, inputMinutes, 0);

    if (startDate < now) {
      const diffSeconds = (now.getTime() - startDate.getTime()) / 1000;
      const retroactiveEarnings = diffSeconds * salaryPerSecond;
      startTime = startDate.getTime();
      sessionTotal = retroactiveEarnings;
      isRetroactive = true;
      retroStartTimeString = settings.startTime;
      showToast(`補登成功！已幫您計算累積的 NT$${retroactiveEarnings.toFixed(2)}`);
    }

    setState({
      ...INITIAL_STATE,
      status: AppStatus.WORKING,
      salaryPerSecond,
      startTime,
      sessionTotal,
      isRetroactive,
      retroStartTimeString,
      lastFrameTime: performance.now(),
      settings: settings
    });
    
    playSound('start');
  };

  const updateMoney = (timestamp: number) => {
    setState(prevState => {
      if (prevState.status === AppStatus.IDLE) return prevState;

      const deltaTime = timestamp - prevState.lastFrameTime;
      const earnedThisFrame = prevState.salaryPerSecond * (deltaTime / 1000);

      return {
        ...prevState,
        lastFrameTime: timestamp,
        sessionTotal: prevState.sessionTotal + earnedThisFrame,
        poopTotal: prevState.status === AppStatus.POOPING 
          ? prevState.poopTotal + earnedThisFrame 
          : prevState.poopTotal,
        slackTotal: prevState.status === AppStatus.SLACKING 
          ? prevState.slackTotal + earnedThisFrame 
          : prevState.slackTotal
      };
    });

    animationFrameRef.current = requestAnimationFrame(updateMoney);
  };

  useEffect(() => {
    if (state.status !== AppStatus.IDLE && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateMoney);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [state.status]);

  const changeStatus = (newStatus: AppStatus) => {
    // Accumulate time for the previous state before switching
    setState(prev => {
      let updates: Partial<AppState> = { status: newStatus };
      
      if (prev.status === AppStatus.POOPING) {
        updates.totalPoopTime = prev.totalPoopTime + (Date.now() - prev.poopStartTime);
      }
      if (prev.status === AppStatus.SLACKING) {
        updates.totalSlackTime = prev.totalSlackTime + (Date.now() - prev.slackStartTime);
      }

      if (newStatus === AppStatus.POOPING) {
        updates.poopStartTime = Date.now();
      } else if (newStatus === AppStatus.SLACKING) {
        updates.slackStartTime = Date.now();
      }

      return { ...prev, ...updates };
    });
    
    playSound('pop');
    
    if (newStatus === AppStatus.WORKING && state.status !== AppStatus.IDLE) {
      // Returning to work
      if (state.status === AppStatus.SLACKING) {
         showToast(`摸魚結束，賺了 NT$${state.slackTotal.toFixed(2)}`);
      } else {
         showToast("回到工作崗位");
      }
    }
  };

  const handleStop = () => {
    // Final accumulation
    setState(prev => {
        let updates: Partial<AppState> = { status: AppStatus.IDLE };
        if (prev.status === AppStatus.POOPING) {
          updates.totalPoopTime = prev.totalPoopTime + (Date.now() - prev.poopStartTime);
        }
        if (prev.status === AppStatus.SLACKING) {
          updates.totalSlackTime = prev.totalSlackTime + (Date.now() - prev.slackStartTime);
        }
        return { ...prev, ...updates };
    });

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    playSound('cash');
    setShowSummary(true);
  };

  const handleRestart = () => {
    setShowSummary(false);
    setState(INITIAL_STATE);
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
        <SummaryModal state={state} onRestart={handleRestart} />
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
            onStop={handleStop} 
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