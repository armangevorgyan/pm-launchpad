import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { portfolioPieces } from '../../data/portfolio';
import { CheckCircle2, Circle, AlertCircle, Link as LinkIcon, ExternalLink } from 'lucide-react';

const PortfolioPage = () => {
  const { portfolio, setPortfolio } = useProgress();

  const pieces = portfolioPieces;

  const toggleCheck = (pieceId, checkId) => {
    const current = portfolio[pieceId] || { checklist: {} };
    setPortfolio(prev => ({
      ...prev,
      [pieceId]: {
        ...current,
        checklist: {
          ...current.checklist,
          [checkId]: !current.checklist[checkId]
        }
      }
    }));
  };

  const setUrl = (pieceId, url) => {
    setPortfolio(prev => ({
      ...prev,
      [pieceId]: {
        ...(prev[pieceId] || { checklist: {} }),
        url
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Portfolio Builder</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Create these 3 pieces to prove your PM skills to recruiters.</p>
      </div>

      <div className="space-y-8">
        {pieces.map(piece => {
          const data = portfolio[piece.id] || { checklist: {} };
          const completedCount = piece.checklist.filter(c => data.checklist[c.id]).length;
          const pct = Math.round((completedCount / piece.checklist.length) * 100) || 0;

          return (
            <div key={piece.id} className="card overflow-hidden">
              <div className="p-8 border-b border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white mb-2">{piece.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{piece.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-primary">{pct}%</span>
                  </div>
                </div>
                
                {piece.warning && (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg text-sm mb-4">
                    <AlertCircle className="w-4 h-4" />
                    {piece.warning}
                  </div>
                )}

                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${pct === 100 ? 'bg-success' : 'bg-primary'}`} 
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="p-8 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Checklist</h4>
                  {piece.checklist.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => toggleCheck(piece.id, item.id)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      {data.checklist[item.id] ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                      )}
                      <span className={`text-sm ${data.checklist[item.id] ? 'text-slate-400 line-through' : 'dark:text-slate-300'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="p-8 bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 flex flex-col justify-center">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Project Link</h4>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
                    <LinkIcon className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="LinkedIn or Notion URL"
                      value={data.url || ''}
                      onChange={(e) => setUrl(piece.id, e.target.value)}
                      className="bg-transparent border-none outline-none text-sm w-full dark:text-white"
                    />
                  </div>
                  {data.url && (
                    <a 
                      href={data.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Published Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioPage;