// Generates an array of calendar days for a specified month and year.
// Includes `null` values to represent empty slots before the first day of the month,
// ensuring proper alignment in a calendar grid.
// The array contains:
// `null` for days before the month's first day.
// Day numbers (1 through the total number of days in the month) for the rest.
export const generateCalendarDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
  
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };