import React from 'react';
import { Flame } from 'lucide-react';

const StreakCounter = ({ count }) => {
  return (
    <div className="flex items-center gap-4 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
      <div className={`p-3 rounded-full ${count > 0 ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
        <Flame className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-2xl font-bold dark:text-white">{count} Day Streak</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">Keep up the momentum!</p>
      </div>
    </div>
  );
};

export default StreakCounter;