export const getCurrentMonth = () => {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const now = new Date();
  return months[now.getMonth()];
};

// export const getCurrentWeekOfMonth = () => {
//   const now = new Date();
//   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//   const weekNumber = Math.ceil((now.getDate() + startOfMonth.getDay()) / 7);
//   return `WEEK_${weekNumber}`;
// };

export const getCurrentWeekOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // First and last day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Day of month
  const dayOfMonth = now.getDate();

  // Calculate raw week number (calendar style)
  const weekNumber = Math.ceil((dayOfMonth + firstDay.getDay()) / 7);

  // Force maximum 4 weeks
  if (weekNumber <= 1) return "WEEK_1";
  if (weekNumber === 2) return "WEEK_2";
  if (weekNumber === 3) return "WEEK_3";
  return "WEEK_4"; // any 4th or 5th week gets merged here
};

// utils/getWeekDates.js
export const getWeekDates = (start = new Date()) => {
  const monday = new Date(start);

  // Move backwards to Monday of the current week
  const day = monday.getDay(); // Sunday=0, Monday=1, ...
  const diff = (day === 0 ? -6 : 1) - day;
  monday.setDate(monday.getDate() + diff);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const weekDates = {};

  days.forEach((day, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    // Format as DD/MM/YYYY
    const formatted = date.toLocaleDateString("en-GB");
    weekDates[day.toUpperCase()] = formatted;
  });

  return weekDates;
};
