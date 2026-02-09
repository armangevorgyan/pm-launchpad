import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newLog, setNewLog] = useState('');
  
  const { calendarLogs, addCalendarLog, toggleCalendarLog, deleteCalendarLog } = useProgress();

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold dark:text-white uppercase tracking-widest text-slate-400 text-sm">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 dark:text-slate-400" />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 dark:text-slate-400" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((d, i) => {
          const dateStr = format(d, 'yyyy-MM-dd');
          const hasLogs = calendarLogs[dateStr] && calendarLogs[dateStr].length > 0;
          const isSelected = isSameDay(d, selectedDate);
          const isCurrentMonth = isSameMonth(d, monthStart);
          const isToday = isSameDay(d, new Date());

          return (
            <div
              key={i}
              className={`
                aspect-square flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all relative
                ${!isCurrentMonth ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}
                ${isSelected ? 'bg-primary text-white !text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}
                ${isToday && !isSelected ? 'ring-2 ring-primary ring-offset-1 dark:ring-offset-slate-900' : ''}
              `}
              onClick={() => setSelectedDate(d)}
            >
              <span className="text-sm font-semibold">{format(d, 'd')}</span>
              {hasLogs && (
                <div className={`w-1 h-1 rounded-full absolute bottom-1 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.trim()) return;
    addCalendarLog(format(selectedDate, 'yyyy-MM-dd'), newLog);
    setNewLog('');
  };

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const currentLogs = calendarLogs[selectedDateStr] || [];

  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold dark:text-white mb-4 flex items-center justify-between">
            <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
            {isSameDay(selectedDate, new Date()) && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Today</span>
            )}
          </h4>

          <form onSubmit={handleAddLog} className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newLog}
              onChange={(e) => setNewLog(e.target.value)}
              placeholder="What did you do today?"
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:text-white"
            />
            <button 
              type="submit"
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="flex-1 overflow-y-auto max-h-[250px] space-y-2">
            {currentLogs.length === 0 ? (
              <p className="text-sm text-slate-400 italic text-center py-4">No logs for this day.</p>
            ) : (
              currentLogs.map(log => (
                <div key={log.id} className="group flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleCalendarLog(selectedDateStr, log.id)}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {log.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <span className={`text-sm dark:text-slate-300 ${log.completed ? 'line-through opacity-50' : ''}`}>
                      {log.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteCalendarLog(selectedDateStr, log.id)}
                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
