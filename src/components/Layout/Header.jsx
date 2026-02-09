import React, { useState, useEffect, useRef } from 'react';
import { Bell, Moon, Sun, Search, User, Book, BookOpen, Wrench, Calendar, X } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { frameworks } from '../../data/frameworks';
import { books } from '../../data/books';
import { tools } from '../../data/tools';
import { weeks } from '../../data/weeks';

const Header = () => {
  const { settings, setSettings } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      
      const filteredFrameworks = frameworks
        .filter(f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))
        .map(f => ({ ...f, type: 'framework', icon: BookOpen, path: '/frameworks' }));
        
      const filteredBooks = books
        .filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
        .map(b => ({ ...b, name: b.title, type: 'book', icon: Book, path: '/library' }));
        
      const filteredTools = tools
        .filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
        .map(t => ({ ...t, type: 'tool', icon: Wrench, path: '/tools' }));
        
      const filteredWeeks = weeks
        .filter(w => w.title.toLowerCase().includes(q) || w.goal.toLowerCase().includes(q))
        .map(w => ({ ...w, name: `Week ${w.id}: ${w.title}`, type: 'week', icon: Calendar, path: `/weeks/${w.id}` }));

      setResults([...filteredFrameworks, ...filteredBooks, ...filteredTools, ...filteredWeeks].slice(0, 8));
      setIsSearchOpen(true);
    } else {
      setResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="relative" ref={searchRef}>
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg w-96">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for frameworks, books, or tools..." 
            className="bg-transparent border-none outline-none text-sm w-full dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {isSearchOpen && results.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[400px] overflow-y-auto">
            <div className="p-2">
              {results.map((result, idx) => (
                <button
                  key={`${result.type}-${result.id || idx}`}
                  onClick={() => handleResultClick(result.path)}
                  className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left"
                >
                  <div className={`p-2 rounded-lg ${
                    result.type === 'framework' ? 'bg-teal-50 text-teal-500 dark:bg-teal-900/20' :
                    result.type === 'book' ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/20' :
                    result.type === 'tool' ? 'bg-orange-50 text-orange-500 dark:bg-orange-900/20' :
                    'bg-purple-50 text-purple-500 dark:bg-purple-900/20'
                  }`}>
                    <result.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">{result.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{result.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isSearchOpen && results.length === 0 && searchQuery.trim().length > 1 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          {settings.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:border-slate-700"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold dark:text-white">Future PM</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Product Manager</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
            PM
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;