import React from 'react';
import { Link } from 'react-router-dom';
import { weeks } from '../../data/weeks';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const UpcomingTasks = () => {
  const { tasks, toggleTask } = useProgress();

  const allTasks = weeks.flatMap(w => 
    w.days.flatMap(d => 
      d.tasks.map(t => ({ ...t, weekId: w.id }))
    )
  );

  const upcoming = allTasks
    .filter(t => !tasks[t.id]?.completed)
    .slice(0, 5);

  return (
    <div className="card">
      <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <h4 className="font-bold dark:text-white text-lg">Upcoming Tasks</h4>
        <Link to="/weeks" className="text-sm text-primary hover:underline">View all</Link>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {upcoming.length > 0 ? upcoming.map(task => (
          <div key={task.id} className="p-4 flex gap-3 group">
            <button 
              onClick={() => toggleTask(task.id)}
              className="mt-1 w-5 h-5 rounded border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:border-primary transition-colors"
            >
              <div className="w-3 h-3 bg-primary rounded-sm scale-0 group-hover:scale-100 transition-transform"></div>
            </button>
            <Link to={`/weeks/${task.weekId}`} className="flex-1">
              <p className="text-sm dark:text-slate-200 line-clamp-2">{task.text}</p>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Week {task.weekId} • {task.type}</span>
            </Link>
            <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )) : (
          <div className="p-8 text-center text-slate-500">
            <p>All caught up! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;