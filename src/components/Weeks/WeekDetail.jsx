import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { weeks } from '../../data/weeks';
import { useProgress } from '../../context/ProgressContext';
import { ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, Filter } from 'lucide-react';

const WeekDetail = () => {
  const { weekId } = useParams();
  const { tasks, toggleTask } = useProgress();
  const [filterType, setFilterType] = useState('all');
  
  const weekIndex = weeks.findIndex(w => w.id === parseInt(weekId));
  const week = weeks[weekIndex];
  
  const allTaskTypes = useMemo(() => {
    if (!week) return [];
    const types = new Set();
    week.days.forEach(day => day.tasks.forEach(task => types.add(task.type)));
    return ['all', ...Array.from(types)];
  }, [week]);

  if (!week) return <div>Week not found</div>;

  const nextWeek = weeks[weekIndex + 1];
  const prevWeek = weeks[weekIndex - 1];

  const getTaskColor = (type) => {
    const colors = {
      reading: 'border-blue-500 text-blue-500',
      video: 'border-purple-500 text-purple-500',
      framework: 'border-teal-500 text-teal-500',
      practice: 'border-orange-500 text-orange-500',
      tool: 'border-slate-500 text-slate-500',
      portfolio: 'border-green-500 text-green-500',
      mentor: 'border-violet-500 text-violet-500 bg-violet-50 dark:bg-violet-900/10',
      setup: 'border-sky-500 text-sky-500',
      course: 'border-indigo-500 text-indigo-500',
      jobsearch: 'border-amber-500 text-amber-500',
      rest: 'border-slate-300 text-slate-300',
      note: 'border-yellow-500 text-yellow-500',
    };
    return colors[type] || 'border-slate-400';
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link to="/weeks" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to all weeks</span>
        </Link>
        
        <div className="flex gap-2">
          {prevWeek && (
            <Link to={`/weeks/${prevWeek.id}`} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          )}
          {nextWeek && (
            <Link to={`/weeks/${nextWeek.id}`} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider">Week {week.id}</span>
          <h2 className="text-4xl font-bold dark:text-white">{week.title}</h2>
        </div>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">{week.dateRange}</p>
        
        <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
          <h4 className="font-bold text-primary mb-1 uppercase text-xs tracking-widest">Goal for the week</h4>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{week.goal}</p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 text-slate-400 mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Filter by type:</span>
        </div>
        {allTaskTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`
              px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all border
              ${filterType === type 
                ? 'bg-primary border-primary text-white' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary/50'}
            `}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {week.days.map((day, dIdx) => {
          const filteredTasks = day.tasks.filter(t => filterType === 'all' || t.type === filterType);
          if (filteredTasks.length === 0 && filterType !== 'all') return null;

          return (
            <div key={dIdx}>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${day.label === 'Sunday' ? 'bg-slate-300' : 'bg-primary'}`}></span>
                {day.label}
              </h3>
              
              <div className="space-y-3">
                {filteredTasks.map((task) => {
                  const isCompleted = tasks[task.id]?.completed;
                  const isMentor = task.type === 'mentor';
                  
                  return (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`
                        card p-5 cursor-pointer flex gap-4 transition-all group
                        ${isCompleted ? 'opacity-60 grayscale-[0.5]' : 'hover:border-primary hover:shadow-md'}
                        ${isMentor ? 'border-violet-200 bg-violet-50/30 dark:bg-violet-900/5 dark:border-violet-900/30' : ''}
                      `}
                    >
                      <div className="mt-1">
                        <div className={`
                          w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                          ${isCompleted 
                            ? 'bg-success border-success text-white' 
                            : 'border-slate-300 dark:border-slate-600 group-hover:border-primary'}
                        `}>
                          {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getTaskColor(task.type)}`}>
                            {task.type}
                          </span>
                          {isMentor && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-violet-500 text-violet-500 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> With Arman
                          </span>}
                        </div>
                        <p className={`text-lg dark:text-slate-200 transition-all ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                          {task.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-10">
        <h4 className="text-xl font-bold dark:text-white mb-4">Notes for this week</h4>
        <textarea 
          placeholder="Reflections, blockers, or questions for Arman..."
          className="w-full h-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg dark:text-white"
        ></textarea>
      </div>
    </div>
  );
};

export default WeekDetail;