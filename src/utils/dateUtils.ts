import { format, isToday, isTomorrow, isPast, parseISO, differenceInMinutes } from 'date-fns';

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isPast(date)) return format(date, 'MMM d, yyyy');
    return format(date, 'MMM d, yyyy');
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string | null, timeString: string | null): string => {
  if (!dateString) return '';
  
  const datePart = formatDate(dateString);
  if (!timeString) return datePart;
  
  try {
    const [hours, minutes] = timeString.split(':');
    const time = `${hours}:${minutes}`;
    return `${datePart} at ${time}`;
  } catch {
    return datePart;
  }
};

export const isOverdue = (dateString: string | null): boolean => {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return isPast(date) && !isToday(date);
  } catch {
    return false;
  }
};

export const getTimeUntilDue = (dateString: string | null, timeString: string | null): number | null => {
  if (!dateString) return null;
  
  try {
    const date = parseISO(dateString);
    let dueDateTime = date;
    
    if (timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      dueDateTime = new Date(date);
      dueDateTime.setHours(hours, minutes, 0, 0);
    } else {
      // If no time, set to end of day
      dueDateTime = new Date(date);
      dueDateTime.setHours(23, 59, 59, 999);
    }
    
    const now = new Date();
    const diffMinutes = differenceInMinutes(dueDateTime, now);
    
    return diffMinutes;
  } catch {
    return null;
  }
};

export const isDueSoon = (dateString: string | null, timeString: string | null, thresholdMinutes: number = 60): boolean => {
  const timeUntil = getTimeUntilDue(dateString, timeString);
  if (timeUntil === null) return false;
  
  // Due soon if within threshold and not overdue
  return timeUntil > 0 && timeUntil <= thresholdMinutes;
};

export const isDueVerySoon = (dateString: string | null, timeString: string | null): boolean => {
  return isDueSoon(dateString, timeString, 30);
};
