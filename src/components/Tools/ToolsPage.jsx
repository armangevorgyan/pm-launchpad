import React from 'react';
import { tools } from '../../data/tools';
import { useProgress } from '../../context/ProgressContext';
import ToolCard from './ToolCard';

const ToolsPage = () => {
  const { toolsStatus, updateToolStatus } = useProgress();

  const mustKnow = tools.filter(t => t.category === 'Must-Know');
  const goodToKnow = tools.filter(t => t.category !== 'Must-Know');

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold dark:text-white">PM Toolstack</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">The industry-standard tools you need to master.</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold dark:text-white uppercase tracking-widest text-slate-400">Must-Know Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mustKnow.map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              status={toolsStatus[tool.id]?.status}
              onUpdateStatus={updateToolStatus}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold dark:text-white uppercase tracking-widest text-slate-400">Good to Understand</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goodToKnow.map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              status={toolsStatus[tool.id]?.status}
              onUpdateStatus={updateToolStatus}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;