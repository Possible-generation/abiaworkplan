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
//   const year = now.getFullYear();
//   const month = now.getMonth();

//   // First and last day of month
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);

//   // Day of month
//   const dayOfMonth = now.getDate();

//   // Calculate raw week number (calendar style)
//   const weekNumber = Math.ceil((dayOfMonth + firstDay.getDay()) / 7);

//   // Force maximum 4 weeks
//   if (weekNumber <= 1) return "WEEK_1";
//   if (weekNumber === 2) return "WEEK_2";
//   if (weekNumber === 3) return "WEEK_3";
//   return "WEEK_4"; // any 4th or 5th week gets merged here
// };

export const getCurrentWeekOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // First day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // Sunday=0, Monday=1, ...

  // Find the date (day number) of the first Monday of the month
  const firstMonday =
    firstDayOfWeek === 0 // if month starts on Sunday
      ? 2
      : firstDayOfWeek === 1 // if month starts on Monday
      ? 1
      : 9 - firstDayOfWeek; // else compute next Monday

  const currentDate = now.getDate();
  const diffDays = currentDate - firstMonday;

  // Week 1 includes all days before the first Monday too
  const weekNumber = diffDays < 0 ? 1 : Math.floor(diffDays / 7) + 1;

  // Clamp to 5 weeks max
  if (weekNumber <= 1) return "WEEK_1";
  if (weekNumber === 2) return "WEEK_2";
  if (weekNumber === 3) return "WEEK_3";
  if (weekNumber === 4) return "WEEK_4";
  return "WEEK_5";
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
