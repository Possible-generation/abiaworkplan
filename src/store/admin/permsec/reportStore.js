import { create } from "zustand";
import axiosInstance from "../../../adminapi/permsec/axiosInstance"; // Update with your actual path

const useReportStore = create((set, get) => ({
  // State
  reports: [],
  currentReport: null,
  loading: false,
  error: null,

  // Actions
  fetchReport: async (month, week) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/ps/plan/report", {
        month,
        week,
      });
      console.log("Report fetch response:", response.data);
      // Adjust based on actual response structure
      const reports = response.data.plans || []; // if backend adds tasks here later
      const currentReport = response.data || null;

      set({
        reports,
        currentReport,
        loading: false,
      });

      return response.data;
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
    if (!report || !report.plans) return [];

    // Group tasks by day
    const tasksByDay = report.plans.reduce((acc, task) => {
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
        date: dayTasks[0]?.date || "", //  use backend `date` field if present
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
    if (!report || !report.plans) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      };
    }

    const totalTasks = report.plans.length;
    const completedTasks = report.plans.filter(
      (task) => task.completed === "YES"
    ).length;
    const pendingTasks = report.plans.filter(
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
