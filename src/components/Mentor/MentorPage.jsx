import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { weeks } from '../../data/weeks';
import { CheckCircle2, MessageSquare} from 'lucide-react';

const MentorPage = () => {
  const { mentorSessions, setMentorSessions } = useProgress();

  const techConcepts = [
    { id: 'api', name: 'APIs', explanation: 'A way for different software components to talk to each other.', analogy: 'Like a waiter taking your order to the kitchen.', why: 'PMs need to know how data flows.' },
    { id: 'db', name: 'Databases', explanation: 'Where the application stores all its data permanently.', analogy: 'Like a giant, organized filing cabinet.', why: 'PMs need to understand data models.' },
    { id: 'frontend', name: 'Frontend vs Backend', explanation: 'Frontend is what you see; Backend is the logic and data.', analogy: 'Frontend is the stage; Backend is the backstage.', why: 'To communicate with different types of engineers.' },
    { id: 'git', name: 'Version Control (Git)', explanation: 'System to track changes in code and collaborate.', analogy: 'Like Google Docs suggestions, but for code.', why: 'To understand the development workflow.' },
  ];

  const toggleSession = (weekId) => {
    setMentorSessions(prev => ({
      ...prev,
      [weekId]: { ...prev[weekId], completed: !prev[weekId]?.completed }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">Mentor Sessions</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">How Arman can help you each week of your journey.</p>
        </div>
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 p-4 rounded-xl">
          <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-1">Tech Mentor</p>
          <p className="text-lg font-bold dark:text-white">Arman Gevorgyan</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold dark:text-white uppercase tracking-widest text-slate-400 text-sm">Weekly Topics</h3>
        {weeks.map(week => {
          const mentorTask = week.days.flatMap(d => d.tasks).find(t => t.type === 'mentor');
          if (!mentorTask) return null;
          
          const isCompleted = mentorSessions[week.id]?.completed;

          return (
            <div key={week.id} className={`card p-6 flex gap-6 ${isCompleted ? 'bg-slate-50 dark:bg-slate-900/50 opacity-60' : ''}`}>
              <div 
                className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors
                  ${isCompleted ? 'bg-success text-white' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-500 hover:bg-violet-200'}
                `}
                onClick={() => toggleSession(week.id)}
              >
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-400">WEEK {week.id}</span>
                  <h4 className="font-bold dark:text-white">{week.title}</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{mentorTask.text}</p>
                
                {isCompleted ? (
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Session Takeaways</p>
                    <p className="text-sm text-slate-500 italic">No notes added for this session.</p>
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleSession(week.id)}
                    className="text-sm font-bold text-violet-500 hover:text-violet-600"
                  >
                    Mark as completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold dark:text-white uppercase tracking-widest text-slate-400 text-sm">Tech Concepts to Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techConcepts.map(concept => (
            <div key={concept.id} className="card p-6 border-l-4 border-l-violet-500">
              <h4 className="text-lg font-bold dark:text-white mb-2">{concept.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{concept.explanation}</p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-xs">
                <p className="text-slate-400 mb-1 uppercase font-bold tracking-widest">Analogy</p>
                <p className="text-slate-600 dark:text-slate-400 italic">"{concept.analogy}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorPage;