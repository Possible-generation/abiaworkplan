// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// export const useTaskStore = create(
//   persist(
//     (set, get) => ({
//       tasks: [],
//       weeklyTasks: {},
//       hasWeeklyPlan: false,
//       currentWeekId: null,
//       loading: false,
//       reviewData: {},

//       addTask: async (task) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         const newTask = {
//           id: Date.now(),
//           ...task,
//           createdAt: new Date().toISOString(),
//         };

//         set((state) => ({
//           tasks: [...state.tasks, newTask],
//           loading: false,
//         }));

//         return { success: true };
//       },

//       updateTask: async (id, updates) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         set((state) => ({
//           tasks: state.tasks.map((task) =>
//             task.id === id ? { ...task, ...updates } : task
//           ),
//           loading: false,
//         }));

//         return { success: true };
//       },

//       // Weekly Task Management
//       initializeWeeklyPlan: () => {
//         const weekId = Date.now();
//         const weekPlan = {};

//         WEEKDAYS.forEach((day) => {
//           weekPlan[day] = [];
//         });

//         set({
//           weeklyTasks: weekPlan,
//           currentWeekId: weekId,
//           hasWeeklyPlan: false,
//         });
//       },

//       addTaskToDay: (day, task) => {
//         set((state) => ({
//           weeklyTasks: {
//             ...state.weeklyTasks,
//             [day]: [
//               ...(state.weeklyTasks[day] || []),
//               {
//                 ...task,
//                 id: Date.now() + Math.random(),
//                 day,
//               },
//             ],
//           },
//         }));
//       },

//       removeTaskFromDay: (day, taskId) => {
//         set((state) => ({
//           weeklyTasks: {
//             ...state.weeklyTasks,
//             [day]: state.weeklyTasks[day].filter((task) => task.id !== taskId),
//           },
//         }));
//       },

//       submitWeeklyPlan: async () => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         set((state) => ({
//           hasWeeklyPlan: true,
//           loading: false,
//           tasks: [...state.tasks, ...Object.values(state.weeklyTasks).flat()],
//         }));

//         return { success: true };
//       },

//       updateWeeklyTask: async (day, taskId, updates) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         set((state) => ({
//           weeklyTasks: {
//             ...state.weeklyTasks,
//             [day]: state.weeklyTasks[day].map((task) =>
//               task.id === taskId ? { ...task, ...updates } : task
//             ),
//           },
//           loading: false,
//         }));

//         return { success: true };
//       },

//       // Review functionality
//       initializeReview: () => {
//         const state = get();
//         const reviewData = {};

//         WEEKDAYS.forEach((day) => {
//           reviewData[day] = (state.weeklyTasks[day] || []).map((task) => ({
//             taskId: task.id,
//             title: task.title,
//             completed: null,
//             reason: "",
//           }));
//         });

//         set({ reviewData });
//       },

//       updateReviewResponse: (day, taskId, completed, reason = "") => {
//         set((state) => ({
//           reviewData: {
//             ...state.reviewData,
//             [day]: state.reviewData[day].map((item) =>
//               item.taskId === taskId ? { ...item, completed, reason } : item
//             ),
//           },
//         }));
//       },

//       submitReview: async () => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         // Process review data and update task statuses
//         const state = get();
//         const updatedWeeklyTasks = { ...state.weeklyTasks };

//         Object.entries(state.reviewData).forEach(([day, reviews]) => {
//           reviews.forEach((review) => {
//             const taskIndex = updatedWeeklyTasks[day].findIndex(
//               (task) => task.id === review.taskId
//             );
//             if (taskIndex !== -1) {
//               updatedWeeklyTasks[day][taskIndex].status = review.completed
//                 ? "Completed"
//                 : "Pending";
//               if (!review.completed && review.reason) {
//                 updatedWeeklyTasks[day][taskIndex].failureReason =
//                   review.reason;
//               }
//             }
//           });
//         });

//         set({
//           weeklyTasks: updatedWeeklyTasks,
//           loading: false,
//         });

//         return { success: true };
//       },

//       resetWeeklyPlan: () => {
//         set({
//           weeklyTasks: {},
//           hasWeeklyPlan: false,
//           currentWeekId: null,
//           reviewData: {},
//         });
//       },
//       getFilteredTasks: (dateFilter, statusFilter, priorityFilter) => {
//         const state = get();

//         return Object.values(state.weeklyTasks)
//           .flat()
//           .filter((task) => {
//             let match = true;

//             // Date filtering based on selected date in a calandar

//             // Date filtering

//             if (dateFilter) {
//               const taskDate = new Date(task.date || task.createdAt); // fallback if task.date doesn't exist
//               const selectedDate = new Date(dateFilter);

//               // Normalize both dates (remove time for accurate day-level comparison)
//               taskDate.setHours(0, 0, 0, 0);
//               selectedDate.setHours(0, 0, 0, 0);

//               if (taskDate.getTime() !== selectedDate.getTime()) {
//                 match = false;
//               }
//             }

//             // Status filtering
//             if (statusFilter !== "all" && task.status !== statusFilter)
//               match = false;

//             // Priority filtering
//             if (priorityFilter !== "all" && task.priority !== priorityFilter)
//               match = false;

//             return match;
//           });
//       },
//       currentWeekCompleted: () => {
//         const state = get();
//         return state.hasWeeklyPlan;
//       },
//       getTasks: () => get().tasks,
//       getWeeklyTasks: () => get().weeklyTasks,
//       hasCompletedWeeklyPlan: () => get().hasWeeklyPlan,
//     }),
//     {
//       name: "task-storage",
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Helper function to get the start of the week (Monday)
const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
};

// Helper function to parse DD/MM/YYYY format correctly
const parseTaskDate = (dateString) => {
  if (!dateString) return new Date();

  // If it's already a valid date string (ISO format)
  if (dateString.includes("T") || dateString.includes("-")) {
    return new Date(dateString);
  }

  // Parse DD/MM/YYYY format
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  return new Date(dateString);
};

// Helper function to format date as DD/MM/YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Helper function to get dates for the current week
const getWeekDates = (weekStart) => {
  const dates = {};
  WEEKDAYS.forEach((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    dates[day] = formatDate(date);
  });
  return dates;
};

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      weeklyTasks: {},
      hasWeeklyPlan: false,
      currentWeekId: null,
      currentWeekStart: null,
      weekDates: {},
      loading: false,
      reviewData: {},

      addTask: async (task) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newTask = {
          id: Date.now(),
          ...task,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
          loading: false,
        }));

        return { success: true };
      },

      updateTask: async (id, updates) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
          loading: false,
        }));

        return { success: true };
      },

      // Weekly Task Management
      initializeWeeklyPlan: () => {
        const weekId = Date.now();
        const weekStart = getWeekStart();
        const weekPlan = {};
        const dates = getWeekDates(weekStart);

        WEEKDAYS.forEach((day) => {
          weekPlan[day] = [];
        });

        set({
          weeklyTasks: weekPlan,
          currentWeekId: weekId,
          currentWeekStart: weekStart.toISOString(),
          weekDates: dates,
          hasWeeklyPlan: false,
        });
      },

      addTaskToDay: (day, task) => {
        const state = get();
        const taskDate = state.weekDates[day];

        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [day]: [
              ...(state.weeklyTasks[day] || []),
              {
                ...task,
                id: Date.now() + Math.random(),
                day,
                date: taskDate,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        }));
      },

      removeTaskFromDay: (day, taskId) => {
        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [day]: state.weeklyTasks[day].filter((task) => task.id !== taskId),
          },
        }));
      },

      submitWeeklyPlan: async () => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        set((state) => {
          const weeklyTasksFlat = Object.values(state.weeklyTasks).flat();
          // Only add tasks that don't already exist in the main tasks array
          const newTasks = weeklyTasksFlat.filter(
            (weeklyTask) =>
              !state.tasks.some((task) => task.id === weeklyTask.id)
          );

          return {
            hasWeeklyPlan: true,
            loading: false,
            tasks: [...state.tasks, ...newTasks],
          };
        });

        return { success: true };
      },

      updateTaskInDay: (dayName, taskId, updatedTask) => {
        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [dayName]: state.weeklyTasks[dayName].map((task) =>
              task.id === taskId ? { ...task, ...updatedTask } : task
            ),
          },
        }));
      },
      updateWeeklyTask: async (day, taskId, updates) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));

        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [day]: state.weeklyTasks[day].map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            ),
          },
          loading: false,
        }));

        return { success: true };
      },

      // Review functionality
      initializeReview: () => {
        const state = get();
        const reviewData = {};

        WEEKDAYS.forEach((day) => {
          reviewData[day] = (state.weeklyTasks[day] || []).map((task) => ({
            taskId: task.id,
            title: task.title,
            completed: null,
            reason: "",
          }));
        });

        set({ reviewData });
      },

      updateReviewResponse: (day, taskId, completed, reason = "") => {
        set((state) => ({
          reviewData: {
            ...state.reviewData,
            [day]: state.reviewData[day].map((item) =>
              item.taskId === taskId ? { ...item, completed, reason } : item
            ),
          },
        }));
      },

      submitReview: async () => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const state = get();
        const updatedWeeklyTasks = { ...state.weeklyTasks };

        Object.entries(state.reviewData).forEach(([day, reviews]) => {
          reviews.forEach((review) => {
            const taskIndex = updatedWeeklyTasks[day].findIndex(
              (task) => task.id === review.taskId
            );
            if (taskIndex !== -1) {
              updatedWeeklyTasks[day][taskIndex].status = review.completed
                ? "completed"
                : "pending";
              if (!review.completed && review.reason) {
                updatedWeeklyTasks[day][taskIndex].failureReason =
                  review.reason;
              }
            }
          });
        });

        set({
          weeklyTasks: updatedWeeklyTasks,
          loading: false,
        });

        return { success: true };
      },

      resetWeeklyPlan: () => {
        set({
          weeklyTasks: {},
          hasWeeklyPlan: false,
          currentWeekId: null,
          currentWeekStart: null,
          weekDates: {},
          reviewData: {},
        });
      },

      // Updated filtering function to filter by month
      getFilteredTasks: (dateFilter, statusFilter, priorityFilter) => {
        const state = get();
        // Get all tasks from both sources but avoid duplicates
        const weeklyTasks = Object.values(state.weeklyTasks).flat();
        const mainTasks = state.tasks.filter(
          (task) => !weeklyTasks.some((wTask) => wTask.id === task.id)
        );
        let allTasks = [...mainTasks, ...weeklyTasks];

        return allTasks.filter((task) => {
          let match = true;

          // Month filtering
          if (dateFilter) {
            const taskDate = parseTaskDate(task.date || task.createdAt);
            const selectedDate = new Date(dateFilter);

            // Compare month and year
            if (
              taskDate.getMonth() !== selectedDate.getMonth() ||
              taskDate.getFullYear() !== selectedDate.getFullYear()
            ) {
              match = false;
            }
          }

          // Status filtering
          if (statusFilter !== "all" && task.status !== statusFilter)
            match = false;

          // Priority filtering
          if (priorityFilter !== "all" && task.priority !== priorityFilter)
            match = false;

          return match;
        });
      },

      // New function to get tasks for dashboard analytics
      getTasksForMonth: (month, year) => {
        const state = get();
        // Get all unique tasks (avoid duplicates)
        const weeklyTasks = Object.values(state.weeklyTasks).flat();
        const mainTasks = state.tasks.filter(
          (task) => !weeklyTasks.some((wTask) => wTask.id === task.id)
        );
        let allTasks = [...mainTasks, ...weeklyTasks];

        return allTasks.filter((task) => {
          const taskDate = parseTaskDate(task.date || task.createdAt);
          return (
            taskDate.getMonth() === month && taskDate.getFullYear() === year
          );
        });
      },

      // New function to get weekly breakdown for a month
      getWeeklyBreakdown: (month, year) => {
        const state = get();
        // Get all unique tasks (avoid duplicates)
        const weeklyTasks = Object.values(state.weeklyTasks).flat();
        const mainTasks = state.tasks.filter(
          (task) => !weeklyTasks.some((wTask) => wTask.id === task.id)
        );
        let allTasks = [...mainTasks, ...weeklyTasks];

        const monthTasks = allTasks.filter((task) => {
          const taskDate = parseTaskDate(task.date || task.createdAt);
          return (
            taskDate.getMonth() === month && taskDate.getFullYear() === year
          );
        });

        // Group tasks by week
        const weeks = {};
        monthTasks.forEach((task) => {
          const taskDate = parseTaskDate(task.date || task.createdAt);

          // Get the week number within the month (1-based)
          const firstDayOfMonth = new Date(year, month, 1);
          const dayOfMonth = taskDate.getDate();
          const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
          const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday; // Convert Sunday from 0 to 7

          // Calculate week number (1-based)
          const weekNumber = Math.ceil((dayOfMonth + adjustedFirstDay - 1) / 7);
          const weekKey = `Week ${weekNumber}`;

          if (!weeks[weekKey]) {
            weeks[weekKey] = [];
          }
          weeks[weekKey].push(task);
        });

        return weeks;
      },

      // New function to get tasks for a specific week of a month
      getTasksForWeek: (month, year, weekNumber) => {
        const state = get();
        const weeklyTasks = Object.values(state.weeklyTasks).flat();
        const mainTasks = state.tasks.filter(
          (task) => !weeklyTasks.some((wTask) => wTask.id === task.id)
        );
        let allTasks = [...mainTasks, ...weeklyTasks];

        return allTasks.filter((task) => {
          const taskDate = parseTaskDate(task.date || task.createdAt);

          // Check if task is in the correct month and year
          if (
            taskDate.getMonth() !== month ||
            taskDate.getFullYear() !== year
          ) {
            return false;
          }

          // Calculate which week of the month this task belongs to
          const firstDayOfMonth = new Date(year, month, 1);
          const dayOfMonth = taskDate.getDate();
          const firstDayWeekday = firstDayOfMonth.getDay();
          const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

          const taskWeekNumber = Math.ceil(
            (dayOfMonth + adjustedFirstDay - 1) / 7
          );

          return taskWeekNumber === weekNumber;
        });
      },

      // Get all weeks in a month that have tasks
      getWeeksInMonth: (month, year) => {
        const state = get();
        const weeklyTasks = Object.values(state.weeklyTasks).flat();
        const mainTasks = state.tasks.filter(
          (task) => !weeklyTasks.some((wTask) => wTask.id === task.id)
        );
        let allTasks = [...mainTasks, ...weeklyTasks];

        const monthTasks = allTasks.filter((task) => {
          const taskDate = parseTaskDate(task.date || task.createdAt);
          return (
            taskDate.getMonth() === month && taskDate.getFullYear() === year
          );
        });

        const weeks = new Set();
        monthTasks.forEach((task) => {
          const taskDate = parseTaskDate(task.date || task.createdAt);
          const firstDayOfMonth = new Date(year, month, 1);
          const dayOfMonth = taskDate.getDate();
          const firstDayWeekday = firstDayOfMonth.getDay();
          const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

          const weekNumber = Math.ceil((dayOfMonth + adjustedFirstDay - 1) / 7);
          weeks.add(weekNumber);
        });

        return Array.from(weeks).sort((a, b) => a - b);
      },

      currentWeekCompleted: () => {
        const state = get();
        return state.hasWeeklyPlan;
      },

      // Debug function to get all tasks
      getAllTasks: () => {
        const state = get();
        const weeklyTasks = Object.values(state.weeklyTasks).flat();
        const mainTasks = state.tasks.filter(
          (task) => !weeklyTasks.some((wTask) => wTask.id === task.id)
        );
        return [...mainTasks, ...weeklyTasks];
      },

      getTasks: () => get().tasks,
      getWeeklyTasks: () => get().weeklyTasks,
      getWeekDates: () => get().weekDates,
      hasCompletedWeeklyPlan: () => get().hasWeeklyPlan,
    }),
    {
      name: "task-storage",
    }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// // Helper function to get the start of the week (Monday)
// const getWeekStart = (date = new Date()) => {
//   const d = new Date(date);
//   const day = d.getDay();
//   const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
//   return new Date(d.setDate(diff));
// };

// // Helper function to parse DD/MM/YYYY format correctly
// const parseTaskDate = (dateString) => {
//   if (!dateString) return new Date();

//   // If it's already a valid date string (ISO format)
//   if (dateString.includes("T") || dateString.includes("-")) {
//     return new Date(dateString);
//   }

//   // Parse DD/MM/YYYY format
//   const parts = dateString.split("/");
//   if (parts.length === 3) {
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//     const year = parseInt(parts[2], 10);
//     return new Date(year, month, day);
//   }

//   return new Date(dateString);
// };

// // Helper function to format date as DD/MM/YYYY
// const formatDate = (date) => {
//   const d = new Date(date);
//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// // Helper function to get dates for a specific week in a month
// const getWeekDatesInMonth = (year, month, weekNumber) => {
//   const dates = {};
//   const firstDayOfMonth = new Date(year, month, 1);
//   const firstDayWeekday = firstDayOfMonth.getDay();
//   const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

//   // Calculate the start date of the specific week
//   const startOfWeek = new Date(
//     year,
//     month,
//     1 + (weekNumber - 1) * 7 - adjustedFirstDay + 1
//   );

//   WEEKDAYS.forEach((day, index) => {
//     const date = new Date(startOfWeek);
//     date.setDate(startOfWeek.getDate() + index);
//     dates[day] = formatDate(date);
//   });

//   return dates;
// };

// // Helper function to get current week number in month
// const getCurrentWeekOfMonth = (date = new Date()) => {
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const dayOfMonth = date.getDate();
//   const firstDayOfMonth = new Date(year, month, 1);
//   const firstDayWeekday = firstDayOfMonth.getDay();
//   const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

//   return Math.ceil((dayOfMonth + adjustedFirstDay - 1) / 7);
// };

// // Helper function to check if we can add tasks to a specific week
// const canAddToWeek = (year, month, weekNumber) => {
//   const today = new Date();
//   const currentYear = today.getFullYear();
//   const currentMonth = today.getMonth();
//   const currentWeek = getCurrentWeekOfMonth(today);

//   // Can only add to current week or future weeks in current month
//   if (year === currentYear && month === currentMonth) {
//     return weekNumber >= currentWeek;
//   }

//   // Can add to future months
//   if (year > currentYear || (year === currentYear && month > currentMonth)) {
//     return true;
//   }

//   // Cannot add to past months
//   return false;
// };

// export const useTaskStore = create(
//   persist(
//     (set, get) => ({
//       tasks: [],
//       monthlyWeeklyTasks: {}, // Structure: { "2024-1": { week1: {...}, week2: {...} } }
//       monthlyPlans: {}, // Structure: { "2024-1": { week1: true, week2: false } }
//       currentMonth: new Date().getMonth(),
//       currentYear: new Date().getFullYear(),
//       loading: false,
//       reviewData: {},

//       addTask: async (task) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         const newTask = {
//           id: Date.now(),
//           ...task,
//           createdAt: new Date().toISOString(),
//         };

//         set((state) => ({
//           tasks: [...state.tasks, newTask],
//           loading: false,
//         }));

//         return { success: true };
//       },

//       updateTask: async (id, updates) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         set((state) => ({
//           tasks: state.tasks.map((task) =>
//             task.id === id ? { ...task, ...updates } : task
//           ),
//           loading: false,
//         }));

//         return { success: true };
//       },

//       // Monthly Weekly Task Management
//       initializeMonthlyWeeklyPlan: (year, month) => {
//         const monthKey = `${year}-${month}`;
//         const state = get();

//         if (!state.monthlyWeeklyTasks[monthKey]) {
//           set((state) => ({
//             monthlyWeeklyTasks: {
//               ...state.monthlyWeeklyTasks,
//               [monthKey]: {
//                 week1: {},
//                 week2: {},
//                 week3: {},
//                 week4: {},
//               },
//             },
//             monthlyPlans: {
//               ...state.monthlyPlans,
//               [monthKey]: {
//                 week1: false,
//                 week2: false,
//                 week3: false,
//                 week4: false,
//               },
//             },
//           }));
//         }
//       },

//       // Initialize week plan
//       initializeWeekPlan: (year, month, weekNumber) => {
//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const weekPlan = {};

//         WEEKDAYS.forEach((day) => {
//           weekPlan[day] = [];
//         });

//         set((state) => ({
//           monthlyWeeklyTasks: {
//             ...state.monthlyWeeklyTasks,
//             [monthKey]: {
//               ...state.monthlyWeeklyTasks[monthKey],
//               [weekKey]: weekPlan,
//             },
//           },
//         }));
//       },

//       addTaskToWeekDay: (year, month, weekNumber, day, task) => {
//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const dates = getWeekDatesInMonth(year, month, weekNumber);
//         const taskDate = dates[day];

//         set((state) => ({
//           monthlyWeeklyTasks: {
//             ...state.monthlyWeeklyTasks,
//             [monthKey]: {
//               ...state.monthlyWeeklyTasks[monthKey],
//               [weekKey]: {
//                 ...state.monthlyWeeklyTasks[monthKey][weekKey],
//                 [day]: [
//                   ...(state.monthlyWeeklyTasks[monthKey][weekKey][day] || []),
//                   {
//                     ...task,
//                     id: Date.now() + Math.random(),
//                     day,
//                     date: taskDate,
//                     week: weekNumber,
//                     month,
//                     year,
//                     createdAt: new Date().toISOString(),
//                   },
//                 ],
//               },
//             },
//           },
//         }));
//       },

//       removeTaskFromWeekDay: (year, month, weekNumber, day, taskId) => {
//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;

//         set((state) => ({
//           monthlyWeeklyTasks: {
//             ...state.monthlyWeeklyTasks,
//             [monthKey]: {
//               ...state.monthlyWeeklyTasks[monthKey],
//               [weekKey]: {
//                 ...state.monthlyWeeklyTasks[monthKey][weekKey],
//                 [day]: state.monthlyWeeklyTasks[monthKey][weekKey][day].filter(
//                   (task) => task.id !== taskId
//                 ),
//               },
//             },
//           },
//         }));
//       },

//       submitWeeklyPlan: async (year, month, weekNumber) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const state = get();

//         const weekTasks = state.monthlyWeeklyTasks[monthKey]?.[weekKey] || {};
//         const weeklyTasksFlat = Object.values(weekTasks).flat();

//         set((state) => ({
//           monthlyPlans: {
//             ...state.monthlyPlans,
//             [monthKey]: {
//               ...state.monthlyPlans[monthKey],
//               [weekKey]: true,
//             },
//           },
//           tasks: [...state.tasks, ...weeklyTasksFlat],
//           loading: false,
//         }));

//         return { success: true };
//       },

//       updateWeeklyTask: async (
//         year,
//         month,
//         weekNumber,
//         day,
//         taskId,
//         updates
//       ) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;

//         set((state) => ({
//           monthlyWeeklyTasks: {
//             ...state.monthlyWeeklyTasks,
//             [monthKey]: {
//               ...state.monthlyWeeklyTasks[monthKey],
//               [weekKey]: {
//                 ...state.monthlyWeeklyTasks[monthKey][weekKey],
//                 [day]: state.monthlyWeeklyTasks[monthKey][weekKey][day].map(
//                   (task) =>
//                     task.id === taskId ? { ...task, ...updates } : task
//                 ),
//               },
//             },
//           },
//           loading: false,
//         }));

//         return { success: true };
//       },

//       // Review functionality for specific week
//       initializeReview: (year, month, weekNumber) => {
//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const state = get();
//         const reviewData = {};
//         const weekTasks = state.monthlyWeeklyTasks[monthKey]?.[weekKey] || {};

//         WEEKDAYS.forEach((day) => {
//           reviewData[day] = (weekTasks[day] || []).map((task) => ({
//             taskId: task.id,
//             title: task.title,
//             completed: null,
//             reason: "",
//           }));
//         });

//         set({ reviewData });
//       },

//       updateReviewResponse: (day, taskId, completed, reason = "") => {
//         set((state) => ({
//           reviewData: {
//             ...state.reviewData,
//             [day]: state.reviewData[day].map((item) =>
//               item.taskId === taskId ? { ...item, completed, reason } : item
//             ),
//           },
//         }));
//       },

//       submitReview: async (year, month, weekNumber) => {
//         set({ loading: true });
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const state = get();

//         const updatedWeeklyTasks = { ...state.monthlyWeeklyTasks };

//         Object.entries(state.reviewData).forEach(([day, reviews]) => {
//           reviews.forEach((review) => {
//             const taskIndex = updatedWeeklyTasks[monthKey][weekKey][
//               day
//             ].findIndex((task) => task.id === review.taskId);
//             if (taskIndex !== -1) {
//               updatedWeeklyTasks[monthKey][weekKey][day][taskIndex].status =
//                 review.completed ? "completed" : "pending";
//               if (!review.completed && review.reason) {
//                 updatedWeeklyTasks[monthKey][weekKey][day][
//                   taskIndex
//                 ].failureReason = review.reason;
//               }
//             }
//           });
//         });

//         set({
//           monthlyWeeklyTasks: updatedWeeklyTasks,
//           loading: false,
//         });

//         return { success: true };
//       },

//       // Get filtered tasks with month filtering
//       getFilteredTasks: (dateFilter, statusFilter, priorityFilter) => {
//         const state = get();
//         let allTasks = [...state.tasks];

//         // Add tasks from monthly weekly plans
//         Object.entries(state.monthlyWeeklyTasks).forEach(
//           ([monthKey, monthData]) => {
//             Object.values(monthData).forEach((weekData) => {
//               Object.values(weekData).forEach((dayTasks) => {
//                 if (Array.isArray(dayTasks)) {
//                   allTasks.push(...dayTasks);
//                 }
//               });
//             });
//           }
//         );

//         // Remove duplicates
//         const uniqueTasks = allTasks.filter(
//           (task, index, self) =>
//             index === self.findIndex((t) => t.id === task.id)
//         );

//         return uniqueTasks.filter((task) => {
//           let match = true;

//           // Month filtering
//           if (dateFilter) {
//             const taskDate = parseTaskDate(task.date || task.createdAt);
//             const selectedDate = new Date(dateFilter);

//             // Compare month and year
//             if (
//               taskDate.getMonth() !== selectedDate.getMonth() ||
//               taskDate.getFullYear() !== selectedDate.getFullYear()
//             ) {
//               match = false;
//             }
//           }

//           // Status filtering
//           if (statusFilter !== "all" && task.status !== statusFilter)
//             match = false;

//           // Priority filtering
//           if (priorityFilter !== "all" && task.priority !== priorityFilter)
//             match = false;

//           return match;
//         });
//       },

//       // Helper functions
//       canAddToWeek: (year, month, weekNumber) =>
//         canAddToWeek(year, month, weekNumber),

//       getCurrentWeekOfMonth: () => getCurrentWeekOfMonth(),

//       getWeekDatesInMonth: (year, month, weekNumber) =>
//         getWeekDatesInMonth(year, month, weekNumber),

//       isWeekCompleted: (year, month, weekNumber) => {
//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const state = get();
//         return state.monthlyPlans[monthKey]?.[weekKey] || false;
//       },

//       getWeekTasks: (year, month, weekNumber) => {
//         const monthKey = `${year}-${month}`;
//         const weekKey = `week${weekNumber}`;
//         const state = get();
//         return state.monthlyWeeklyTasks[monthKey]?.[weekKey] || {};
//       },

//       // Get all available weeks for a month (1-4 or 1-5 depending on month)
//       getAvailableWeeksInMonth: (year, month) => {
//         const daysInMonth = new Date(year, month + 1, 0).getDate();
//         const firstDayOfMonth = new Date(year, month, 1);
//         const firstDayWeekday = firstDayOfMonth.getDay();
//         const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

//         const totalWeeks = Math.ceil((daysInMonth + adjustedFirstDay - 1) / 7);
//         return Array.from({ length: totalWeeks }, (_, i) => i + 1);
//       },

//       // Debug function to get all tasks
//       getAllTasks: () => {
//         const state = get();
//         let allTasks = [...state.tasks];

//         // Add tasks from monthly weekly plans
//         Object.entries(state.monthlyWeeklyTasks).forEach(
//           ([monthKey, monthData]) => {
//             Object.values(monthData).forEach((weekData) => {
//               Object.values(weekData).forEach((dayTasks) => {
//                 if (Array.isArray(dayTasks)) {
//                   allTasks.push(...dayTasks);
//                 }
//               });
//             });
//           }
//         );

//         // Remove duplicates
//         return allTasks.filter(
//           (task, index, self) =>
//             index === self.findIndex((t) => t.id === task.id)
//         );
//       },

//       resetWeeklyPlan: () => {
//         set({
//           monthlyWeeklyTasks: {},
//           monthlyPlans: {},
//           reviewData: {},
//         });
//       },

//       getTasks: () => get().tasks,
//       setCurrentMonth: (month, year) =>
//         set({ currentMonth: month, currentYear: year }),
//     }),
//     {
//       name: "task-storage",
//     }
//   )
// );
