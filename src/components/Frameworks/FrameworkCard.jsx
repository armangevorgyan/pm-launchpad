import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, GraduationCap, Lightbulb } from 'lucide-react';

const FrameworkCard = ({ framework, learned, onToggleLearned }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`card transition-all ${isExpanded ? 'shadow-md ring-1 ring-primary/20' : 'hover:shadow-md'}`}>
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div 
            className={`w-10 h-10 rounded-lg flex items-center justify-center
              ${learned ? 'bg-success text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}
            `}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLearned(framework.id);
            }}
          >
            {learned ? <CheckCircle2 className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold dark:text-white">{framework.name}</h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded">
                {framework.category}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{framework.description}</p>
          </div>
        </div>
        
        {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-50 dark:border-slate-700 space-y-6 animate-in slide-in-from-top-2 duration-300">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">What is it?</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{framework.explanation}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
              <h5 className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold text-sm mb-2">
                <PenTool className="w-4 h-4" />
                How to Practice
              </h5>
              <p className="text-sm text-orange-800/80 dark:text-orange-300/80">{framework.practice}</p>
            </div>
            
            <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10">
              <h5 className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <Lightbulb className="w-4 h-4" />
                Interview Tip
              </h5>
              <p className="text-sm text-primary/80 dark:text-primary-300/80">{framework.interviewTip}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 font-medium italic">Referenced in Week {framework.week}</span>
            <button 
              onClick={() => onToggleLearned(framework.id)}
              className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${
                learned 
                  ? 'bg-success/10 text-success' 
                  : 'bg-primary text-white hover:bg-blue-700'
              }`}
            >
              {learned ? 'Mark as Unlearned' : 'I Understand This'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal imports needed for icons used in the card
import { PenTool } from 'lucide-react';

export default FrameworkCard;