import { differenceInWeeks, startOfDay, parseISO } from 'date-fns';

/**
 * Calculates the current week number based on start date.
 * @param {string} startDate - ISO date string or YYYY-MM-DD
 * @returns {number} - Week number (1-12)
 */
export const getCurrentWeek = (startDate) => {
  try {
    const start = startOfDay(parseISO(startDate));
    const today = startOfDay(new Date());
    const diff = differenceInWeeks(today, start);
    
    // If today is before start date, return week 1
    if (diff < 0) return 1;
    
    // Return diff + 1 (since weeks are 1-indexed), max 12
    return Math.min(12, diff + 1);
  } catch (error) {
    console.error('Error calculating current week:', error);
    return 1;
  }
};
