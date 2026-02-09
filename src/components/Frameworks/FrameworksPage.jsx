import React, { useState } from 'react';
import { frameworks } from '../../data/frameworks';
import { useProgress } from '../../context/ProgressContext';
import FrameworkCard from './FrameworkCard';
import { Search, Filter } from 'lucide-react';

const FrameworksPage = () => {
  const { frameworksLearned, toggleFramework } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(frameworks.map(f => f.category))];

  const filteredFrameworks = frameworks.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         f.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">Framework Wiki</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Master these core PM methodologies.</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search frameworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm dark:text-white"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
              ${activeCategory === cat 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFrameworks.length > 0 ? (
          filteredFrameworks.map(framework => (
            <FrameworkCard 
              key={framework.id} 
              framework={framework}
              learned={frameworksLearned[framework.id]?.learned || false}
              onToggleLearned={toggleFramework}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No frameworks found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameworksPage;