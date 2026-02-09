export const STORAGE_KEYS = {
  TASKS: 'pm-tracker-tasks',
  BOOKS: 'pm-tracker-books',
  FRAMEWORKS: 'pm-tracker-frameworks',
  TOOLS: 'pm-tracker-tools',
  APPLICATIONS: 'pm-tracker-applications',
  NOTES: 'pm-tracker-notes',
  MENTOR: 'pm-tracker-mentor',
  PORTFOLIO: 'pm-tracker-portfolio',
  SETTINGS: 'pm-tracker-settings',
  STREAK: 'pm-tracker-streak',
};

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key, defaultValue = null) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const clearStorage = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};