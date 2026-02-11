import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const FocusTimer = () => {
  const { addCalendarLog } = useProgress();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    const today = new Date().toISOString().split('T')[0];
    
    if (mode === 'focus') {
      addCalendarLog(today, 'Completed 25min Focus Session 🎯');
      alert('Focus session complete! Take a break.');
      setMode('break');
      setTimeLeft(5 * 60);
    } else {
      addCalendarLog(today, 'Completed Break ☕');
      alert('Break complete! Back to work.');
      setMode('focus');
      setTimeLeft(25 * 60);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card p-8 flex flex-col items-center justify-center space-y-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-none shadow-xl">
      <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl mb-4">
        <button 
          onClick={() => { setMode('focus'); setTimeLeft(25 * 60); setIsActive(false); }}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'focus' ? 'bg-white dark:bg-slate-600 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
        >
          Focus
        </button>
        <button 
          onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'break' ? 'bg-white dark:bg-slate-600 shadow-sm text-success' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
        >
          Break
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - timeLeft / (mode === 'focus' ? 25 * 60 : 5 * 60))}
            className={`transition-all duration-1000 ${mode === 'focus' ? 'text-primary' : 'text-success'}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black dark:text-white tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
            {mode === 'focus' ? 'Working' : 'Resting'}
          </span>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <button 
          onClick={resetTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button 
          onClick={toggleTimer}
          className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transform hover:scale-105 transition-all ${isActive ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white' : 'bg-primary text-white'}`}
        >
          {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400">
          {mode === 'focus' ? <Zap className="w-6 h-6" /> : <Coffee className="w-6 h-6" />}
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
