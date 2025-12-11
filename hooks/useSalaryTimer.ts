import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, AppStatus, Settings } from '../types';
import { playSound } from '../utils/audio';

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

export function useSalaryTimer(showToast: (msg: string) => void) {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const animationFrameRef = useRef<number | null>(null);

  // Core update loop
  const updateMoney = useCallback((timestamp: number) => {
    setState(prevState => {
      if (prevState.status === AppStatus.IDLE) return prevState;

      const deltaTime = timestamp - prevState.lastFrameTime;
      // Protection against huge jumps if tab was inactive for a long time (optional, but good practice)
      // For now we trust timestamp to keep "earning" even in background if browser allows,
      // but typically requestAnimationFrame pauses in background.
      // Since this is a "thief" app, simple calculation is fine.
      
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
  }, []);

  // Manage Animation Frame lifecycle
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
  }, [state.status, updateMoney]);

  const handleStart = useCallback((settings: Settings) => {
    const secondsPerMonth = settings.days * settings.hours * 3600;
    const salaryPerSecond = settings.salary / secondsPerMonth;

    let startTime = Date.now();
    let sessionTotal = 0;
    let isRetroactive = false;
    let retroStartTimeString = "";

    const now = new Date();
    
    // Check if user provided a retroactive start time
    if (settings.startTime) {
      const [inputHours, inputMinutes] = settings.startTime.split(':').map(Number);
      
      if (!isNaN(inputHours) && !isNaN(inputMinutes)) {
        let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), inputHours, inputMinutes, 0);

        // Logic for "Yesterday": If the selected time is later than now (e.g. Now 01:00, Input 23:00),
        // assume the user means yesterday.
        if (startDate > now) {
          startDate.setDate(startDate.getDate() - 1);
        }

        if (startDate < now) {
          const diffSeconds = (now.getTime() - startDate.getTime()) / 1000;
          // Only allow retroactive up to 24 hours to prevent mistakes
          if (diffSeconds > 0 && diffSeconds < 86400) {
            const retroactiveEarnings = diffSeconds * salaryPerSecond;
            startTime = startDate.getTime();
            sessionTotal = retroactiveEarnings;
            isRetroactive = true;
            
            // Format string to include "Yesterday" if applicable
            const isYesterday = startDate.getDate() !== now.getDate();
            retroStartTimeString = isYesterday ? `昨天 ${settings.startTime}` : settings.startTime;
            
            showToast(`補登成功！已幫您計算累積的 NT$${retroactiveEarnings.toFixed(2)}`);
          }
        }
      }
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
  }, [showToast]);

  const changeStatus = useCallback((newStatus: AppStatus) => {
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
      // We need to check the *previous* status, but inside the callback we don't have it easily accessible 
      // without complexity. However, we can infer logic based on current requirement:
      // If we are calling changeStatus(WORKING), we were likely slacking or pooping.
      if (state.status === AppStatus.SLACKING) {
         showToast(`摸魚結束，賺了 NT$${state.slackTotal.toFixed(2)}`);
      } else if (state.status === AppStatus.POOPING) {
         showToast("回到工作崗位");
      } else {
         showToast("回到工作崗位");
      }
    }
  }, [state.status, state.slackTotal, showToast]);

  const handleStop = useCallback(() => {
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
  }, []);

  const handleRestart = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    handleStart,
    handleStop,
    changeStatus,
    handleRestart
  };
}