import React from 'react';
import { Link } from 'react-router-dom';
import { weeks } from '../../data/weeks';
import { useProgress } from '../../context/ProgressContext';
import { getCurrentWeek } from '../../utils/dates';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const WeeksPage = () => {
  const { tasks, settings } = useProgress();
  const currentWeekNum = getCurrentWeek(settings.startDate);

  const getWeekProgress = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return 0;
    
    const allTasks = week.days.flatMap(d => d.tasks);
    const completedTasks = allTasks.filter(t => tasks[t.id]?.completed);
    
    return {
      percentage: Math.round((completedTasks.length / allTasks.length) * 100) || 0,
      done: completedTasks.length,
      total: allTasks.length
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Learning Journey</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">12 weeks to transition from Banking PM to IT Product Manager.</p>
      </div>

      <div className="space-y-4">
        {weeks.map((week) => {
          const progress = getWeekProgress(week.id);
          const isCompleted = progress.percentage === 100;
          const isCurrent = week.id === currentWeekNum;
          
          return (
            <Link 
              key={week.id} 
              to={`/weeks/${week.id}`}
              className={`
                block card hover:border-primary transition-all p-6 
                ${isCompleted ? 'bg-green-50/50 dark:bg-green-900/10' : ''}
                ${isCurrent ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${isCompleted ? 'bg-success text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
                  `}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : week.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">{week.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{week.dateRange}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium dark:text-white">{progress.done}/{progress.total} tasks</span>
                    <span className="text-xs text-slate-400 font-normal">({progress.percentage}%)</span>
                  </div>
                  <div className="w-48 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-success' : 'bg-primary'}`}
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <ArrowRight className="w-5 h-5 text-slate-300 ml-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WeeksPage;