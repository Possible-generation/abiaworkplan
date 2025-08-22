// import { create } from "zustand";
// import axiosInstance from "../api/axiosInstance"; // Update with your actual path

// const useReportStore = create((set, get) => ({
//   // State
//   reports: [],
//   currentReport: null,
//   loading: false,
//   error: null,

//   // Actions
//   fetchReport: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axiosInstance.get("/api/staff/plan/report");

//       if (response.data.success) {
//         const reports = response.data.plans || [];
//         set({
//           reports,
//           currentReport: reports[0] || null, // Set first report as current
//           loading: false,
//         });
//         return response.data;
//       } else {
//         throw new Error("Failed to fetch report");
//       }
//     } catch (error) {
//       set({
//         error:
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to fetch report",
//         loading: false,
//       });
//       throw error;
//     }
//   },

//   setCurrentReport: (report) => {
//     set({ currentReport: report });
//   },

//   // Helper function to get tasks grouped by day
//   getTasksByDay: (report) => {
//     if (!report || !report.task) return [];

//     // Group tasks by day
//     const tasksByDay = report.task.reduce((acc, task) => {
//       const day = task.day;
//       if (!acc[day]) {
//         acc[day] = [];
//       }
//       acc[day].push(task);
//       return acc;
//     }, {});

//     // Convert to array format for table display
//     const daysOrder = [
//       "MONDAY",
//       "TUESDAY",
//       "WEDNESDAY",
//       "THURSDAY",
//       "FRIDAY",
//       "SATURDAY",
//       "SUNDAY",
//     ];

//     return daysOrder
//       .map((day) => {
//         const dayTasks = tasksByDay[day] || [];

//         // Get all tasks
//         const allTasks = dayTasks.map((task) => task.title);

//         // Get completed tasks (where completed === "YES")
//         const completedTasks = dayTasks
//           .filter((task) => task.completed === "YES")
//           .map((task) => task.title);

//         // Get pending tasks (where completed === "NO")
//         const pendingTasks = dayTasks
//           .filter((task) => task.completed === "NO")
//           .map((task) => task.title);

//         // Get reasons for pending tasks
//         const reasons = dayTasks
//           .filter((task) => task.completed === "NO" && task.reason)
//           .map((task) => task.reason)
//           .join("; ");

//         return {
//           day,
//           date: formatDayDate(day), // You'll need to implement this based on your week dates
//           allTasks,
//           completed: completedTasks,
//           pending: pendingTasks,
//           reasons: reasons || "",
//         };
//       })
//       .filter((dayData) => dayData.allTasks.length > 0); // Only include days with tasks
//   },

//   // Helper function to get report statistics
//   getReportStats: (report) => {
//     if (!report || !report.task) {
//       return {
//         totalTasks: 0,
//         completedTasks: 0,
//         pendingTasks: 0,
//       };
//     }

//     const totalTasks = report.task.length;
//     const completedTasks = report.task.filter(
//       (task) => task.completed === "YES"
//     ).length;
//     const pendingTasks = report.task.filter(
//       (task) => task.completed === "NO"
//     ).length;

//     return {
//       totalTasks,
//       completedTasks,
//       pendingTasks,
//     };
//   },

//   // Clear error
//   clearError: () => {
//     set({ error: null });
//   },

//   // Reset store
//   reset: () => {
//     set({
//       reports: [],
//       currentReport: null,
//       loading: false,
//       error: null,
//     });
//   },
// }));

// // Helper function to format day into readable date
// // You'll need to implement this based on your actual week calculation logic
// const formatDayDate = (day) => {
//   // This is a placeholder - you'll need to implement actual date formatting
//   // based on your week dates logic from the original component
//   const dayMap = {
//     MONDAY: "Monday, 04/08/2025",
//     TUESDAY: "Tuesday, 05/08/2025",
//     WEDNESDAY: "Wednesday, 06/08/2025",
//     THURSDAY: "Thursday, 07/08/2025",
//     FRIDAY: "Friday, 08/08/2025",
//     SATURDAY: "Saturday, 09/08/2025",
//     SUNDAY: "Sunday, 10/08/2025",
//   };

//   return dayMap[day] || day;
// };

// export default useReportStore;

import { create } from "zustand";
import axiosInstance from "../api/axiosInstance"; // Update with your actual path

const useReportStore = create((set, get) => ({
  // State
  reports: [],
  currentReport: null,
  loading: false,
  error: null,

  // Actions
  fetchReport: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/staff/plan/report");

      if (response.data.success) {
        const reports = response.data.plans || [];
        set({
          reports,
          currentReport: reports[0] || null, // Set first report as current
          loading: false,
        });
        return response.data;
      } else {
        throw new Error("Failed to fetch report");
      }
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch report",
        loading: false,
      });
      throw error;
    }
  },

  setCurrentReport: (report) => {
    set({ currentReport: report });
  },

  // Group tasks by day using API-provided dates
  getTasksByDay: (report) => {
    if (!report || !report.task) return [];

    // Group tasks by day
    const tasksByDay = report.task.reduce((acc, task) => {
      const day = task.day; // Should come from backend (e.g. "MONDAY")
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(task);
      return acc;
    }, {});

    // API already has day + date, so we just use them
    return Object.keys(tasksByDay).map((day) => {
      const dayTasks = tasksByDay[day] || [];

      return {
        day, // e.g. "MONDAY"
        date: dayTasks[0]?.date || "", // ✅ use backend `date` field if present
        allTasks: dayTasks.map((task) => task.title),
        completed: dayTasks
          .filter((task) => task.completed === "YES")
          .map((task) => task.title),
        pending: dayTasks
          .filter((task) => task.completed === "NO")
          .map((task) => task.title),
        reasons: dayTasks
          .filter((task) => task.completed === "NO" && task.reason)
          .map((task) => task.reason)
          .join("; "),
      };
    });
  },

  // Stats helper
  getReportStats: (report) => {
    if (!report || !report.task) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      };
    }

    const totalTasks = report.task.length;
    const completedTasks = report.task.filter(
      (task) => task.completed === "YES"
    ).length;
    const pendingTasks = report.task.filter(
      (task) => task.completed === "NO"
    ).length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
    };
  },

  clearError: () => set({ error: null }),

  reset: () => {
    set({
      reports: [],
      currentReport: null,
      loading: false,
      error: null,
    });
  },
}));

export default useReportStore;
