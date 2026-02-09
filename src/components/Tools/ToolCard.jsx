import React from 'react';
import { ExternalLink, Play, CheckCircle2, Clock } from 'lucide-react';

const ToolCard = ({ tool, status, onUpdateStatus }) => {
  const statusOptions = ['Not Started', 'Learning', 'Comfortable'];
  
  const getStatusColor = (s) => {
    switch (s) {
      case 'Comfortable': return 'bg-success text-white';
      case 'Learning': return 'bg-primary text-white';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-400';
    }
  };

  return (
    <div className="card p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
          <span className="text-xl font-bold text-primary">{tool.name[0]}</span>
        </div>
        <select 
          value={status || 'Not Started'} 
          onChange={(e) => onUpdateStatus(tool.id, e.target.value)}
          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border-none outline-none cursor-pointer transition-colors ${getStatusColor(status)}`}
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white font-sans uppercase">
              {opt}
            </option>
          ))}
        </select>
      </div>
      
      <h3 className="text-lg font-bold dark:text-white mb-1">{tool.name}</h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{tool.category}</p>
      
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 flex-1">
        {tool.description}
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {tool.learningTime}
          </div>
          <div className="flex items-center gap-1">
            {tool.freeTier ? 'Free Tier Available' : tool.freeTier}
          </div>
        </div>
        
        <div className="flex gap-2">
          <a 
            href={tool.tutorialUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <Play className="w-4 h-4" />
            Tutorial
          </a>
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;