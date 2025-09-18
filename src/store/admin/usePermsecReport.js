import { create } from "zustand";
import axiosInstance from "../../adminapi/permsec/axiosInstance";

const useReportStore = create((set, get) => ({
  // State
  reportData: null,
  user: null,
  plan: null,
  tasks: [],
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  },
  loading: false,
  error: null,

  fetchReport: async (staffId, departmentId, month, week) => {
    // Clear previous data immediately when starting new request
    set({
      loading: true,
      error: null,
      reportData: null,
      user: null,
      plan: null,
      tasks: [],
      stats: {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      },
    });
    try {
      const payload = {
        staff_id: String(staffId),
        department_id: String(departmentId),
        month: String(month),
        week: String(week),
      };
      const response = await axiosInstance.post(
        "/api/ps/dashboard/department/staff/report",
        payload
      );
      console.log("Performance report response:", response.data);

      if (response.data.success) {
        const reportData = response.data.data;

        set({
          reportData: reportData,
          user: reportData.user,
          plan: reportData.plan,
          tasks: reportData.plan?.tasks || [],
          stats: {
            totalTasks: reportData.totalTasks,
            completedTasks: reportData.completedTasks,
            pendingTasks: reportData.pendingTasks,
          },
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

  ApproveReport: async (departmentId, staffId, planId) => {
    try {
      const response = await axiosInstance.post(
        `/api/ps/dashboard/unit/staff/report/approve`,
        {
          staff_id: staffId,
          department_id: departmentId,
          plan_id: planId,
        }
      );
      console.log("Approve report response:", response.data);

      if (response.data.success) {
        // Handle successful approval
        set({ loading: false });
        return response.data;
      } else {
        throw new Error("Failed to approve report");
      }
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to approve report",
        loading: false,
      });
      throw error;
    }
  },

  // Group tasks by day using API-provided dates
  getTasksByDay: () => {
    const { tasks } = get();
    if (!tasks || tasks.length === 0) return [];

    // Group tasks by day
    const tasksByDay = tasks.reduce((acc, task) => {
      const day = task.day; // e.g. "MONDAY"
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(task);
      return acc;
    }, {});

    // Convert grouped data to array format
    return Object.keys(tasksByDay).map((day) => {
      const dayTasks = tasksByDay[day] || [];

      return {
        day, // e.g. "MONDAY"
        date: dayTasks[0]?.date || "", // use backend date field
        allTasks: dayTasks.map((task) => task.title),
        completed: dayTasks
          .filter((task) => task.completed === "YES")
          .map((task) => task.title),
        pending: dayTasks
          .filter((task) => task.completed === "NO" || task.completed === null)
          .map((task) => task.title),
        reasons: dayTasks
          .filter(
            (task) =>
              (task.completed === "NO" || task.completed === null) &&
              task.reason
          )
          .map((task) => task.reason)
          .join("; "),
        tasks: dayTasks, // Include full task objects for detailed access
      };
    });
  },

  // Get report statistics
  getReportStats: () => {
    const { stats } = get();
    return stats;
  },

  // Get user information
  getUserInfo: () => {
    const { user } = get();
    return user;
  },

  // Get plan information
  getPlanInfo: () => {
    const { plan } = get();
    return plan;
  },

  // Get tasks by status (using completed field)
  getTasksByStatus: (status) => {
    const { tasks } = get();
    if (!tasks) return [];

    if (status.toUpperCase() === "COMPLETED") {
      return tasks.filter((task) => task.completed === "YES");
    } else if (status.toUpperCase() === "PENDING") {
      return tasks.filter(
        (task) => task.completed === "NO" || task.completed === null
      );
    }

    return [];
  },

  // Get tasks by priority
  getTasksByPriority: (priority) => {
    const { tasks } = get();
    if (!tasks) return [];

    return tasks.filter(
      (task) => task.priority?.toUpperCase() === priority.toUpperCase()
    );
  },

  clearError: () => set({ error: null }),

  reset: () => {
    set({
      reportData: null,
      user: null,
      plan: null,
      tasks: [],
      stats: {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      },
      loading: false,
      error: null,
    });
  },
}));

export default useReportStore;
