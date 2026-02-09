import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { weeks } from '../../data/weeks';
import { books } from '../../data/books';
import { frameworks } from '../../data/frameworks';
import { portfolioPieces } from '../../data/portfolio';
import { getCurrentWeek } from '../../utils/dates';
import ProgressRing from './ProgressRing';
import StreakCounter from './StreakCounter';
import UpcomingTasks from './UpcomingTasks';
import { Book, BookOpen, PenTool, Briefcase, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { tasks, streak, booksProgress, frameworksLearned, portfolio, applications, settings } = useProgress();

  const currentWeekNum = getCurrentWeek(settings.startDate);
  const currentWeek = weeks.find(w => w.id === currentWeekNum) || weeks[0];

  const allTasks = weeks.flatMap(w => w.days.flatMap(d => d.tasks));
  const totalTasks = allTasks.length;
  const completedTasksCount = allTasks.filter(t => tasks[t.id]?.completed).length;
  const overallPercentage = Math.round((completedTasksCount / totalTasks) * 100) || 0;

  // Real Stats
  const booksReadCount = books.filter(book => booksProgress[book.id]?.progress === 100).length;
  const frameworksCount = frameworks.filter(f => frameworksLearned[f.id]?.learned).length;
  
  const portfolioCompletedCount = portfolioPieces.filter(piece => {
    const data = portfolio[piece.id] || { checklist: {} };
    const completedChecklistCount = piece.checklist.filter(c => data.checklist[c.id]).length;
    return completedChecklistCount === piece.checklist.length;
  }).length;

  const applicationsCount = applications.length;

  const stats = [
    { label: 'Books Read', value: `${booksReadCount}/${books.length}`, icon: Book, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
    { label: 'Frameworks', value: `${frameworksCount}/${frameworks.length}`, icon: BookOpen, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/10' },
    { label: 'Portfolio', value: `${portfolioCompletedCount}/${portfolioPieces.length}`, icon: PenTool, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
    { label: 'Applications', value: applicationsCount.toString(), icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">Welcome back, Greta! 👋</h2>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Role</p>
          <p className="text-sm font-semibold text-primary">Product Manager</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="card p-8 flex flex-col items-center flex-1 w-full">
          <h3 className="text-xl font-bold dark:text-white mb-6 self-start uppercase tracking-widest text-slate-400 text-sm">Overall Progress</h3>
          <ProgressRing percentage={overallPercentage} />
        </div>
        
        <div className="flex flex-col gap-4 flex-1 w-full">
          <StreakCounter count={streak.currentStreak} />
          <div className="card p-6 flex-1 bg-primary text-white relative overflow-hidden">
            <Zap className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10" />
            <div className="relative z-10">
              <p className="text-primary-100 uppercase tracking-widest text-xs font-bold mb-1">Current Focus</p>
              <h4 className="text-2xl font-bold mb-4">Week {currentWeek.id}: {currentWeek.title}</h4>
              <p className="text-primary-50 line-clamp-2">{currentWeek.goal}</p>
              <Link 
                to={`/weeks/${currentWeek.id}`}
                className="inline-block mt-6 px-4 py-2 bg-white text-primary rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h4 className="text-xl font-bold dark:text-white uppercase tracking-widest text-slate-400 text-sm">Weekly Overview</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {weeks.map(week => {
              const weekTasks = week.days.flatMap(d => d.tasks);
              const done = weekTasks.filter(t => tasks[t.id]?.completed).length;
              const pct = Math.round((done / weekTasks.length) * 100) || 0;
              const isCurrent = week.id === currentWeekNum;
              
              return (
                <Link 
                  key={week.id} 
                  to={`/weeks/${week.id}`}
                  className={`
                    card p-4 flex flex-col gap-3 transition-all cursor-pointer hover:border-primary
                    ${isCurrent ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : ''}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400">W{week.id}</span>
                    {pct === 100 && <Zap className="w-3 h-3 text-success fill-success" />}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1 rounded-full overflow-hidden mt-auto">
                      <div 
                        className={`h-full transition-all ${pct === 100 ? 'bg-success' : 'bg-primary'}`} 
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div>
          <UpcomingTasks />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;