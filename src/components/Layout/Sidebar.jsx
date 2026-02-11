import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { getCurrentWeek } from '../../utils/dates';
import { 
  LayoutDashboard, 
  Calendar, 
  Library, 
  BookOpen, 
  Wrench, 
  Users, 
  Briefcase, 
  FileText, 
  PenTool,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { settings } = useProgress();
  const currentWeek = getCurrentWeek(settings.startDate);
  const weekPercentage = Math.round((currentWeek / 12) * 100);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Weeks', icon: Calendar, path: '/weeks' },
    { name: 'Library', icon: Library, path: '/library' },
    { name: 'Frameworks', icon: BookOpen, path: '/frameworks' },
    { name: 'Tools', icon: Wrench, path: '/tools' },
    { name: 'Mentor', icon: Users, path: '/mentor' },
    { name: 'Portfolio', icon: PenTool, path: '/portfolio' },
    { name: 'Job Search', icon: Briefcase, path: '/jobs' },
    { name: 'Notes', icon: FileText, path: '/notes' },
  ];

  return (
    <div className={`
      fixed inset-y-0 left-0 z-[60] w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen flex flex-col
      transition-transform duration-300 ease-in-out
      lg:sticky lg:top-0 lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="group"
          onClick={() => setIsOpen(false)}
        >
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 transition-transform group-hover:scale-110" />
            <span>PM Mission</span>
          </h1>
        </Link>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${isActive 
                ? 'bg-primary text-white' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Week {currentWeek} of 12</p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${weekPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;