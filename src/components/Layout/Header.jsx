import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Search, Book, BookOpen, Wrench, Calendar, X, Menu } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { frameworks } from '../../data/frameworks';
import { books } from '../../data/books';
import { tools } from '../../data/tools';
import { weeks } from '../../data/weeks';

const Header = ({ toggleSidebar }) => {
  const { settings, setSettings } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      
      // Global shortcuts (only if not typing in an input/textarea)
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        if (e.key === 'n') {
          navigate('/notes');
        }
        if (e.key === 't') {
          navigate('/tools');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

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
    <header className="h-16 w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-1 sm:gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative" ref={searchRef}>
          <div className="flex items-center gap-1 sm:gap-4 bg-slate-50 dark:bg-slate-900 px-2 sm:px-4 py-2 rounded-lg w-28 sm:w-48 md:w-96">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-full dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
            />
            {!searchQuery && (
              <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-400">
                <span className="text-[12px]">⌘</span>
                <span>K</span>
              </div>
            )}
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
      </div>
      
      <div className="flex items-center gap-1 sm:gap-6">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          {settings.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="h-8 w-px bg-slate-200 dark:border-slate-700 hidden sm:block"></div>
        
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold dark:text-white">Greta Ghazaryan</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Product Manager</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
            GG
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;