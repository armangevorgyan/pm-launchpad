import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, saveToStorage, getFromStorage } from '../utils/storage';

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

  const updateBookProgress = (bookId, update) => {
    setBooksProgress(prev => ({
      ...prev,
      [bookId]: { 
        ...prev[bookId], 
        ...(typeof update === 'object' ? update : { progress: update })
      }
    }));
  };

  const toggleFramework = (frameworkId) => {
    setFrameworksLearned(prev => ({
      ...prev,
      [frameworkId]: { learned: !prev[frameworkId]?.learned, learnedAt: new Date().toISOString() }
    }));
  };

  const updateToolStatus = (toolId, status) => {
    setToolsStatus(prev => ({
      ...prev,
      [toolId]: { status }
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
    applications,
    setApplications,
    notes,
    setNotes,
    mentorSessions,
    setMentorSessions,
    portfolio,
    setPortfolio,
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