import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';
import { books } from '../data/books';
import { frameworks } from '../data/frameworks';
import { tools } from '../data/tools';
import { portfolioPieces } from '../data/portfolio';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => getFromStorage(STORAGE_KEYS.TASKS, {}));
  const [booksProgress, setBooksProgress] = useState(() => getFromStorage(STORAGE_KEYS.BOOKS, {}));
  const [frameworksLearned, setFrameworksLearned] = useState(() => getFromStorage(STORAGE_KEYS.FRAMEWORKS, {}));
  const [toolsStatus, setToolsStatus] = useState(() => getFromStorage(STORAGE_KEYS.TOOLS, {}));
  const [applications, setApplications] = useState(() => getFromStorage(STORAGE_KEYS.APPLICATIONS, []));
  const [notes, setNotes] = useState(() => getFromStorage(STORAGE_KEYS.NOTES, []));
  const [mentorSessions, setMentorSessions] = useState(() => getFromStorage(STORAGE_KEYS.MENTOR, {}));
  const [portfolio, setPortfolio] = useState(() => getFromStorage(STORAGE_KEYS.PORTFOLIO, {}));
  const [settings, setSettings] = useState(() => getFromStorage(STORAGE_KEYS.SETTINGS, {
    startDate: "2026-03-01",
    darkMode: false,
    name: ""
  }));
  const [streak, setStreak] = useState(() => getFromStorage(STORAGE_KEYS.STREAK, {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    activeDates: []
  }));
  const [calendarLogs, setCalendarLogs] = useState(() => getFromStorage(STORAGE_KEYS.CALENDAR, {}));

  // Sync with localStorage
  useEffect(() => saveToStorage(STORAGE_KEYS.TASKS, tasks), [tasks]);
  useEffect(() => saveToStorage(STORAGE_KEYS.BOOKS, booksProgress), [booksProgress]);
  useEffect(() => saveToStorage(STORAGE_KEYS.FRAMEWORKS, frameworksLearned), [frameworksLearned]);
  useEffect(() => saveToStorage(STORAGE_KEYS.TOOLS, toolsStatus), [toolsStatus]);
  useEffect(() => saveToStorage(STORAGE_KEYS.APPLICATIONS, applications), [applications]);
  useEffect(() => saveToStorage(STORAGE_KEYS.NOTES, notes), [notes]);
  useEffect(() => saveToStorage(STORAGE_KEYS.MENTOR, mentorSessions), [mentorSessions]);
  useEffect(() => saveToStorage(STORAGE_KEYS.PORTFOLIO, portfolio), [portfolio]);
  useEffect(() => saveToStorage(STORAGE_KEYS.SETTINGS, settings), [settings]);
  useEffect(() => saveToStorage(STORAGE_KEYS.STREAK, streak), [streak]);
  useEffect(() => saveToStorage(STORAGE_KEYS.CALENDAR, calendarLogs), [calendarLogs]);

  const toggleTask = (taskId) => {
    setTasks(prev => {
      const isCompleted = prev[taskId]?.completed;
      const newTasks = {
        ...prev,
        [taskId]: {
          completed: !isCompleted,
          completedAt: !isCompleted ? new Date().toISOString() : null
        }
      };
      
      // Update streak
      if (!isCompleted) {
        updateStreak();
      }
      
      return newTasks;
    });
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setStreak(prev => {
      if (prev.lastActiveDate === today) return prev;
      
      let newCurrentStreak = prev.currentStreak;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (prev.lastActiveDate === yesterdayStr) {
        newCurrentStreak += 1;
      } else {
        newCurrentStreak = 1;
      }
      
      return {
        ...prev,
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(newCurrentStreak, prev.longestStreak),
        lastActiveDate: today,
        activeDates: [...new Set([...prev.activeDates, today])]
      };
    });
  };

  const addCalendarLog = (date, log, completed = true) => {
    setCalendarLogs(prev => {
      const currentDayLogs = prev[date] || [];
      // Prevent duplicates
      if (currentDayLogs.some(l => l.text === log)) {
        return prev;
      }
      return {
        ...prev,
        [date]: [...currentDayLogs, { id: Date.now(), text: log, completed }]
      };
    });
  };

  const updateBookProgress = (bookId, update) => {
    setBooksProgress(prev => ({
      ...prev,
      [bookId]: { 
        ...prev[bookId], 
        ...(typeof update === 'object' ? update : { progress: update })
      }
    }));

    // Auto-log to calendar
    const book = books.find(b => b.id === bookId);
    if (book) {
      const today = new Date().toISOString().split('T')[0];
      addCalendarLog(today, `Read book: ${book.title}`);
    }
  };

  const toggleFramework = (frameworkId) => {
    setFrameworksLearned(prev => {
      const isLearned = !prev[frameworkId]?.learned;
      if (isLearned) {
        const framework = frameworks.find(f => f.id === frameworkId);
        if (framework) {
          const today = new Date().toISOString().split('T')[0];
          addCalendarLog(today, `Studied framework: ${framework.name}`);
        }
      }
      return {
        ...prev,
        [frameworkId]: { learned: isLearned, learnedAt: new Date().toISOString() }
      };
    });
  };

  const updateToolStatus = (toolId, status) => {
    setToolsStatus(prev => {
      const tool = tools.find(t => t.id === toolId);
      if (status !== 'Not Started' && tool) {
        const today = new Date().toISOString().split('T')[0];
        addCalendarLog(today, `Interacted with tool: ${tool.name}`);
      }
      return {
        ...prev,
        [toolId]: { status }
      };
    });
  };

  const togglePortfolioTask = (pieceId, taskId) => {
    setPortfolio(prev => {
      const current = prev[pieceId] || { checklist: {} };
      const isCompleted = !current.checklist[taskId];
      
      if (isCompleted) {
        const piece = portfolioPieces.find(p => p.id === pieceId);
        if (piece) {
          const today = new Date().toISOString().split('T')[0];
          addCalendarLog(today, `Worked on portfolio: ${piece.title}`);
        }
      }
      
      return {
        ...prev,
        [pieceId]: {
          ...current,
          checklist: {
            ...current.checklist,
            [taskId]: isCompleted
          }
        }
      };
    });
  };

  const updatePortfolioUrl = (pieceId, url) => {
    setPortfolio(prev => {
      const piece = portfolioPieces.find(p => p.id === pieceId);
      if (url && piece) {
        const today = new Date().toISOString().split('T')[0];
        addCalendarLog(today, `Updated portfolio: ${piece.title}`);
      }
      return {
        ...prev,
        [pieceId]: {
          ...(prev[pieceId] || { checklist: {} }),
          url
        }
      };
    });
  };

  const toggleCalendarLog = (date, logId) => {
    setCalendarLogs(prev => ({
      ...prev,
      [date]: prev[date].map(log => 
        log.id === logId ? { ...log, completed: !log.completed } : log
      )
    }));
  };

  const deleteCalendarLog = (date, logId) => {
    setCalendarLogs(prev => ({
      ...prev,
      [date]: prev[date].filter(log => log.id !== logId)
    }));
  };

  const value = {
    tasks,
    toggleTask,
    booksProgress,
    updateBookProgress,
    frameworksLearned,
    toggleFramework,
    toolsStatus,
    updateToolStatus,
    portfolio,
    togglePortfolioTask,
    updatePortfolioUrl,
    calendarLogs,
    addCalendarLog,
    toggleCalendarLog,
    deleteCalendarLog,
    applications,
    setApplications,
    notes,
    setNotes,
    mentorSessions,
    setMentorSessions,
    settings,
    setSettings,
    streak
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};