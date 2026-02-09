import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { Briefcase, Building2, MapPin, Calendar, Plus, Search, ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { targetCompanies } from '../../data/companies';

const JobSearchPage = () => {
  const { applications, setApplications } = useProgress();
  const [showAdd, setShowAdd] = useState(false);
  const [newApp, setNewApp] = useState({ company: '', role: '', status: 'Applied', date: new Date().toISOString().split('T')[0] });

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-600',
    'Phone Screen': 'bg-purple-100 text-purple-600',
    'Interview': 'bg-orange-100 text-orange-600',
    'Offer': 'bg-green-100 text-green-600',
    'Rejected': 'bg-red-100 text-red-600',
  };

  const addApplication = () => {
    if (newApp.company && newApp.role) {
      setApplications(prev => [...prev, { ...newApp, id: Date.now() }]);
      setNewApp({ company: '', role: '', status: 'Applied', date: new Date().toISOString().split('T')[0] });
      setShowAdd(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">Job Search</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Track your applications and prepare for interviews.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Company</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Role</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Date</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {applications.length > 0 ? applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="font-bold dark:text-white">{app.company}</span>
                      </div>
                    </td>
                    <td className="p-4 dark:text-slate-300 text-sm">{app.role}</td>
                    <td className="p-4 dark:text-slate-400 text-sm">{app.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-slate-400 italic">No applications tracked yet. Start applying!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold dark:text-white">Target Companies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {targetCompanies.map(company => {
                const isApplied = applications.some(app => app.company.toLowerCase() === company.name.toLowerCase());
                return (
                  <div key={company.name} className="card p-5 hover:border-primary/50 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold dark:text-white">{company.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded uppercase font-bold tracking-wider">
                            {company.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{company.description}</p>
                      </div>
                      {isApplied ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-200 dark:text-slate-700 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        <span className="font-bold text-slate-400 not-italic mr-1">Why apply:</span>
                        {company.whyApply}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <span className="font-bold">Note:</span> Target is any IT company in Yerevan, not limited to fintech. Banking background is a bonus for fintech roles but PM skills apply everywhere.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 bg-primary text-white">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Where to look
            </h4>
            <div className="space-y-3">
              <a href="https://staff.am" target="_blank" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <span className="text-sm font-medium">staff.am</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://linkedin.com" target="_blank" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <span className="text-sm font-medium">LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://careercenter.am" target="_blank" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <span className="text-sm font-medium">CareerCenter</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6">
            <h3 className="text-2xl font-bold dark:text-white">Add Application</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Company</label>
                <input 
                  type="text" 
                  value={newApp.company}
                  onChange={(e) => setNewApp({...newApp, company: e.target.value})}
                  className="input-field w-full"
                  placeholder="e.g. PicsArt"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Role</label>
                <input 
                  type="text" 
                  value={newApp.role}
                  onChange={(e) => setNewApp({...newApp, role: e.target.value})}
                  className="input-field w-full"
                  placeholder="e.g. Associate PM"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</label>
                  <select 
                    value={newApp.status}
                    onChange={(e) => setNewApp({...newApp, status: e.target.value})}
                    className="input-field w-full"
                  >
                    {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newApp.date}
                    onChange={(e) => setNewApp({...newApp, date: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowAdd(false)}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={addApplication}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;