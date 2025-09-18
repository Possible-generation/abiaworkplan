// // store/useTaskFilterStore.js

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axiosInstance from "../api/axiosInstance";
// import { getCurrentMonth, getCurrentWeekOfMonth } from "../utils/dateHelpers";

// const useTaskFilterStore = create(
//   persist(
//     (set, get) => ({
//       tasks: [],
//       loading: false,
//       error: null,

//       // ✅ Default filters
//       filters: {
//         priorityFilter: "ALL",
//         statusFilter: "ALL",
//       },

//       // ✅ Default to current month & week
//       selectedWeek: getCurrentWeekOfMonth(),
//       selectedMonth: getCurrentMonth(),

//       // Fetch tasks
//       fetchTasks: async (filters = {}) => {
//         set({ loading: true, error: null });

//         try {
//           const state = get();

//           const payload = {
//             week: filters.week || state.selectedWeek,
//             month: filters.month || state.selectedMonth,
//             priorityFilter:
//               filters.priorityFilter || state.filters.priorityFilter,
//             statusFilter: filters.statusFilter || state.filters.statusFilter,
//           };

//           const response = await axiosInstance.post(
//             "/api/staff/plan/tasks",
//             payload
//           );
//           console.log("Fetched tasks:", response.data.tasks);
//           set({
//             tasks: response.data.tasks || [],
//             loading: false,
//             filters: {
//               priorityFilter: payload.priorityFilter,
//               statusFilter: payload.statusFilter,
//             },
//             selectedWeek: payload.week,
//             selectedMonth: payload.month,
//           });

//           return response.data;
//         } catch (error) {
//           console.error("Fetching tasks failed:", error);
//           set({
//             error: error.response?.data?.message || "Failed to fetch tasks",
//             loading: false,
//           });
//           throw error;
//         }
//       },

//       // ✅ Setters
//       setWeek: (week) => set({ selectedWeek: week }),
//       setMonth: (month) => set({ selectedMonth: month }),

//       resetFilters: () =>
//         set({
//           filters: {
//             priorityFilter: "ALL",
//             statusFilter: "ALL",
//           },
//           selectedWeek: getCurrentWeekOfMonth(),
//           selectedMonth: getCurrentMonth(),
//         }),
//     }),
//     {
//       name: "task-filter-storage", // persists in localStorage
//     }
//   )
// );

// export default useTaskFilterStore;

// import { create } from "zustand";
// import axiosInstance from "../api/axiosInstance";

// const useTaskFilterStore = create((set, get) => ({
//   // State
//   plans: [],
//   tasks: [],
//   loading: false,
//   error: null,
//   filters: {
//     statusFilter: "ALL",
//     priorityFilter: "ALL",
//   },
//   selectedWeek: "WEEK_1",
//   selectedMonth: "AUGUST",

//   // Actions
//   //   setWeek: (week) => set({ selectedWeek: week }),

//   setMonth: (month) => set({ selectedMonth: month }),

//   // setWeek should also repopulate tasks
//   setWeek: (week) => {
//     set({ selectedWeek: week });
//     get().populateTasksFromPlans(); // 🔑 repopulate for the new week
//   },

//   resetFilters: () =>
//     set({
//       filters: {
//         statusFilter: "ALL",
//         priorityFilter: "ALL",
//       },
//     }),

//   // Fetch all plans
//   fetchPlans: async () => {
//     set({ loading: true, error: null });
//     try {
//       const { data } = await axiosInstance.get("/api/staff/plan");

//       if (data.success) {
//         set({
//           plans: data.plans || [],
//           loading: false,
//         });

//         // Auto-populate tasks from current week/month
//         get().populateTasksFromPlans();
//       } else {
//         throw new Error(data.message || "Failed to fetch plans");
//       }
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       set({
//         error: error.response?.data?.message || error.message,
//         loading: false,
//       });
//     }
//   },

//   // Fetch filtered tasks
//   fetchTasks: async (filterOverrides = {}) => {
//     const state = get();
//     const filters = { ...state.filters, ...filterOverrides };

//     // Update filters in state
//     set({
//       filters,
//       loading: true,
//       error: null,
//       selectedWeek: filterOverrides.week || state.selectedWeek,
//       selectedMonth: filterOverrides.month || state.selectedMonth,
//     });

//     try {
//       const requestBody = {
//         month: filterOverrides.month || state.selectedMonth,
//       };

//       // Only add optional filters if they're not 'ALL'
//       if (filters.statusFilter && filters.statusFilter !== "ALL") {
//         requestBody.statusFilter = filters.statusFilter;
//       }
//       if (filters.priorityFilter && filters.priorityFilter !== "ALL") {
//         requestBody.priorityFilter = filters.priorityFilter;
//       }
//       if (filterOverrides.week || state.selectedWeek) {
//         requestBody.week = filterOverrides.week || state.selectedWeek;
//       }

//       const { data } = await axiosInstance.post(
//         "/api/staff/plan/tasks",
//         requestBody
//       );

//       if (data.success) {
//         // Transform response to expected structure
//         const transformedTasks =
//           data.plans?.flatMap(
//             (plan) =>
//               plan.task?.map((task) => ({
//                 ...task,
//                 name: task.title,
//                 description: task.notes,
//                 tool: task.tools,
//                 date: get().getDateFromDayAndWeek(
//                   task.day,
//                   plan.week,
//                   plan.month
//                 ),
//                 startTime: task.time,
//                 endTime: null, // No endTime in API
//                 plan_id: plan.id,
//                 week: plan.week,
//                 month: plan.month,
//                 approved: plan.approved,
//               })) || []
//           ) || [];

//         set({
//           tasks: transformedTasks,
//           loading: false,
//         });
//       } else {
//         throw new Error(data.message || "Failed to fetch tasks");
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       set({
//         error: error.response?.data?.message || error.message,
//         loading: false,
//       });
//     }
//   },

//   // Populate tasks locally from already-fetched plans
//   populateTasksFromPlans: () => {
//     const state = get();
//     const { plans, selectedWeek, selectedMonth, filters } = state;

//     const currentPlan = plans.find(
//       (plan) => plan.week === selectedWeek && plan.month === selectedMonth
//     );

//     if (currentPlan && currentPlan.task) {
//       let filteredTasks = currentPlan.task;

//       if (filters.statusFilter && filters.statusFilter !== "ALL") {
//         filteredTasks = filteredTasks.filter(
//           (task) => task.status === filters.statusFilter
//         );
//       }

//       if (filters.priorityFilter && filters.priorityFilter !== "ALL") {
//         filteredTasks = filteredTasks.filter(
//           (task) => task.priority === filters.priorityFilter
//         );
//       }

//       const transformedTasks = filteredTasks.map((task) => ({
//         ...task,
//         name: task.title,
//         description: task.notes,
//         tool: task.tools,
//         date: get().getDateFromDayAndWeek(
//           task.day,
//           currentPlan.week,
//           currentPlan.month
//         ),
//         startTime: task.time,
//         endTime: null,
//         plan_id: currentPlan.id,
//         week: currentPlan.week,
//         month: currentPlan.month,
//         approved: currentPlan.approved,
//       }));

//       set({ tasks: transformedTasks });
//     } else {
//       set({ tasks: [] });
//     }
//   },

//   // Convert (day, week, month) → readable date
//   getDateFromDayAndWeek: (day, week, month) => {
//     const weekNumber = parseInt(week.replace("WEEK_", ""));
//     const dayOrder = {
//       MONDAY: 1,
//       TUESDAY: 2,
//       WEDNESDAY: 3,
//       THURSDAY: 4,
//       FRIDAY: 5,
//       SATURDAY: 6,
//       SUNDAY: 7,
//     };

//     const monthNumber = {
//       JANUARY: 0,
//       FEBRUARY: 1,
//       MARCH: 2,
//       APRIL: 3,
//       MAY: 4,
//       JUNE: 5,
//       JULY: 6,
//       AUGUST: 7,
//       SEPTEMBER: 8,
//       OCTOBER: 9,
//       NOVEMBER: 10,
//       DECEMBER: 11,
//     };

//     try {
//       const year = 2025;
//       const monthNum = monthNumber[month];

//       const approxDate = new Date(
//         year,
//         monthNum,
//         (weekNumber - 1) * 7 + dayOrder[day]
//       );

//       return approxDate.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return "Not set";
//     }
//   },

//   // Update task status
//   updateTaskStatus: async (taskId, newStatus) => {
//     try {
//       set({ loading: true });

//       // Example PATCH request (adjust endpoint as needed)
//       await axiosInstance.patch(`/api/staff/plan/tasks/${taskId}`, {
//         status: newStatus,
//       });

//       await get().fetchTasks();
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || error.message,
//         loading: false,
//       });
//     }
//   },
// }));

// export default useTaskFilterStore;

/// accepted one ------------------------------------------------------------------------------------------

import { create } from "zustand";
import axiosInstance from "../../../adminapi/houapi/axiosInstance";

// Helper function to get current week of month
const getCurrentWeekOfMonth = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const currentDate = now.getDate();

  // Adjust for Monday as start of week (0 = Sunday, 1 = Monday, etc.)
  const adjustedFirstDay = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
  const weekNumber = Math.ceil((currentDate + adjustedFirstDay) / 7);

  return `WEEK_${Math.min(weekNumber, 4)}`; // Cap at WEEK_4
};

// Helper function to get current month
const getCurrentMonth = () => {
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
  return months[new Date().getMonth()];
};

const useTaskFilterStore = create((set, get) => ({
  // State - Initialize with current week and month
  plans: [],
  tasks: [],

  loading: false,
  error: null,
  filters: {
    statusFilter: "ALL",
    priorityFilter: "ALL",
  },
  selectedWeek: getCurrentWeekOfMonth(),
  selectedMonth: getCurrentMonth(),

  // Actions
  setMonth: (month) => set({ selectedMonth: month }),

  // setWeek should also repopulate tasks
  setWeek: (week) => {
    set({ selectedWeek: week });
    get().populateTasksFromPlans(); // 🔑 repopulate for the new week
  },

  resetFilters: () =>
    set({
      filters: {
        statusFilter: "ALL",
        priorityFilter: "ALL",
      },
    }),

  // Fetch all plans
  fetchPlans: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/api/hou/plan");

      if (data.success) {
        set({
          plans: data.plans || [],
          loading: false,
        });

        // Auto-populate tasks from current week/month
        get().populateTasksFromPlans();
      } else {
        throw new Error(data.message || "Failed to fetch plans");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Replace the fetchTasks function with this version that properly clears tasks on error:

  fetchTasks: async (filterOverrides = {}) => {
    const state = get();

    // ✅ Safety check
    if (!state.tasks) {
      set({ tasks: [] }); // Initialize if somehow undefined
    }

    const filters = { ...state.filters, ...filterOverrides };

    // Update filters in state
    set({
      filters,
      loading: true,
      error: null,
      tasks: [], // ✅ Clear tasks immediately when starting new fetch
      selectedWeek: filterOverrides.week || state.selectedWeek,
      selectedMonth: filterOverrides.month || state.selectedMonth,
    });

    try {
      const requestBody = {
        month: filterOverrides.month || state.selectedMonth,
      };

      // Only add optional filters if they're not 'ALL'
      if (filters.statusFilter && filters.statusFilter !== "ALL") {
        requestBody.statusFilter = filters.statusFilter;
      }
      if (filters.priorityFilter && filters.priorityFilter !== "ALL") {
        requestBody.priorityFilter = filters.priorityFilter;
      }
      if (filterOverrides.week || state.selectedWeek) {
        requestBody.week = filterOverrides.week || state.selectedWeek;
      }

      console.log("Fetching tasks with request body:", requestBody);

      const { data } = await axiosInstance.post(
        "/api/hou/plan/tasks",
        requestBody
      );

      console.log("API Response:", data);

      if (data.success) {
        let transformedTasks = [];

        if (data.plan && data.plan.task) {
          // Single plan response (current API structure)
          const plan = data.plan;
          transformedTasks = plan.task.map((task) => ({
            ...task,
            name: task.title,
            description: task.notes,
            tool: task.tools,
            date: task.date,
            startTime: task.time,
            endTime: null,
            plan_id: plan.id,
            week: plan.week,
            month: plan.month,
            approved: plan.approved,
          }));
        } else if (data.plans) {
          // Multiple plans response (fallback)
          transformedTasks = data.plans.flatMap(
            (plan) =>
              plan.task?.map((task) => ({
                ...task,
                name: task.title,
                description: task.notes,
                tool: task.tools,
                date: get().getDateFromDayAndWeek(
                  task.day,
                  plan.week,
                  plan.month
                ),
                startTime: task.time,
                endTime: null,
                plan_id: plan.id,
                week: plan.week,
                month: plan.month,
                approved: plan.approved,
              })) || []
          );
        }

        console.log("Transformed tasks:", transformedTasks);

        set({
          tasks: transformedTasks,
          loading: false,
          error: null, // ✅ Clear any previous errors
        });
      } else {
        // ✅ Handle API success:false case
        set({
          tasks: [], // Clear tasks
          loading: false,
          error: data.message || "Failed to fetch tasks",
        });
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);

      // ✅ Always clear tasks and show error when API fails
      set({
        tasks: [], // Clear tasks on error
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Populate tasks locally from already-fetched plans
  populateTasksFromPlans: () => {
    const state = get();
    const { plans, selectedWeek, selectedMonth, filters } = state;

    console.log("Populating tasks from plans:", {
      selectedWeek,
      selectedMonth,
      plansCount: plans.length,
      filters,
    }); // Debug log

    const currentPlan = plans.find(
      (plan) => plan.week === selectedWeek && plan.month === selectedMonth
    );

    console.log("Found current plan:", currentPlan); // Debug log

    if (currentPlan && currentPlan.task) {
      let filteredTasks = currentPlan.task;

      if (filters.statusFilter && filters.statusFilter !== "ALL") {
        filteredTasks = filteredTasks.filter(
          (task) => task.status === filters.statusFilter
        );
      }

      if (filters.priorityFilter && filters.priorityFilter !== "ALL") {
        filteredTasks = filteredTasks.filter(
          (task) => task.priority === filters.priorityFilter
        );
      }

      const transformedTasks = filteredTasks.map((task) => ({
        ...task,
        name: task.title,
        description: task.notes,
        tool: task.tools,
        date: get().getDateFromDayAndWeek(
          task.day,
          currentPlan.week,
          currentPlan.month
        ),
        startTime: task.time,
        endTime: null,
        plan_id: currentPlan.id,
        week: currentPlan.week,
        month: currentPlan.month,
        approved: currentPlan.approved,
      }));

      console.log("Setting transformed tasks:", transformedTasks); // Debug log
      set({ tasks: transformedTasks });
    } else {
      console.log("No plan found, setting empty tasks"); // Debug log
      set({ tasks: [] });
    }
  },

  // Convert (day, week, month) → readable date
  getDateFromDayAndWeek: (day, week, month) => {
    const weekNumber = parseInt(week.replace("WEEK_", ""));
    const dayOrder = {
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
      SUNDAY: 7,
    };

    const monthNumber = {
      JANUARY: 0,
      FEBRUARY: 1,
      MARCH: 2,
      APRIL: 3,
      MAY: 4,
      JUNE: 5,
      JULY: 6,
      AUGUST: 7,
      SEPTEMBER: 8,
      OCTOBER: 9,
      NOVEMBER: 10,
      DECEMBER: 11,
    };

    try {
      const year = 2025;
      const monthNum = monthNumber[month];

      const approxDate = new Date(
        year,
        monthNum,
        (weekNumber - 1) * 7 + dayOrder[day]
      );

      return approxDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Not set";
    }
  },

  updateTaskStatus: async (taskId, status) => {
    const state = get();
    set({ loading: true, error: null });

    try {
      // Find the task to get its plan_id
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) {
        throw new Error("Task not found in store");
      }

      const requestBody = {
        plan_id: task.plan_id,
        task_id: taskId,
        status,
      };

      console.log("Updating task status with:", requestBody);

      const { data } = await axiosInstance.patch(
        "/api/hou/plan/tasks",
        requestBody
      );

      if (data.success) {
        // Instead of only optimistic update, re-fetch to stay in sync
        await get().fetchTasks();

        set({ loading: false });
        return true;
      } else {
        throw new Error(data.message || "Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      return false;
    }
  },
  //   updateTaskReview: async (taskId, completed, reason) => {
  //     const state = get();
  //     set({ loading: true, error: null });

  //     try {
  //       // find the task so we can pick plan_id and status
  //       const task = state.tasks.find((t) => t.id === taskId);
  //       if (!task) {
  //         throw new Error("Task not found in store");
  //       }

  //       const requestBody = {
  //         plan_id: task.plan_id,
  //         task_id: taskId,
  //         status: task.status, // keep existing status
  //         completed, // new field from review page
  //         reason,
  //       };

  //       console.log("Sending review update:", requestBody);

  //       const { data } = await axiosInstance.patch(
  //         "/api/staff/plan/tasks",
  //         requestBody
  //       );

  //       if (data.success) {
  //         // refetch tasks to sync
  //         await get().fetchTasks();
  //         set({ loading: false });
  //         return true;
  //       } else {
  //         throw new Error(data.message || "Failed to update task review");
  //       }
  //     } catch (error) {
  //       console.error("Error updating task review:", error);
  //       set({
  //         error: error.response?.data?.message || error.message,
  //         loading: false,
  //       });
  //       return false;
  //     }
  //   },

  //   updateTaskReview: async (taskId, completed, reason) => {
  //     const state = get();
  //     set({ loading: true, error: null });

  //     try {
  //       // find the task so we can pick plan_id and status
  //       const task = state.tasks.find((t) => t.id === taskId);
  //       if (!task) {
  //         throw new Error("Task not found in store");
  //       }

  //       const requestBody = {
  //         plan_id: task.plan_id,
  //         task_id: taskId,
  //         status: task.status, // keep existing status
  //         completed: completed ? "YES" : "NO", // Convert boolean to string
  //         reason: completed ? "" : reason, // Only send reason if not completed
  //       };

  //       console.log("Sending review update:", requestBody);

  //       const { data } = await axiosInstance.patch(
  //         "/api/staff/plan/tasks",
  //         requestBody
  //       );

  //       if (data.success) {
  //         // refetch tasks to sync
  //         await get().fetchTasks();
  //         set({ loading: false });
  //         return true;
  //       } else {
  //         throw new Error(data.message || "Failed to update task review");
  //       }
  //     } catch (error) {
  //       console.error("Error updating task review:", error);
  //       set({
  //         error: error.response?.data?.message || error.message,
  //         loading: false,
  //       });
  //       return false;
  //     }
  //   },
  // UPDATED STORE METHOD - Add this to your useTaskFilterStore.js

  // In your store, update the completion status loading logic:
  updateTaskReview: async (taskId, completed, reason) => {
    const state = get();
    set({ loading: true, error: null });

    try {
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) {
        throw new Error("Task not found in store");
      }

      const requestBody = {
        plan_id: task.plan_id,
        task_id: taskId,
        status: task.status,
        completed: completed ? "YES" : "NO", // Convert boolean to string
        reason: completed ? "" : reason, // Only send reason if not completed
      };

      console.log("Sending review update:", requestBody);

      const { data } = await axiosInstance.patch(
        "/api/hou/plan/tasks",
        requestBody
      );

      if (data.success) {
        // Update the task in local state immediately for better UX
        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                completed: completed ? "YES" : "NO",
                reason: completed ? "" : reason,
              }
            : t
        );

        set({ tasks: updatedTasks, loading: false });
        return true;
      } else {
        throw new Error(data.message || "Failed to update task review");
      }
    } catch (error) {
      console.error("Error updating task review:", error);
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      return false;
    }
  },

  // ALSO ADD this helper method to your store to check if a task has been reviewed:
  isTaskReviewed: (task) => {
    // A task is considered "reviewed" if completed field is specifically "YES" or "NO"
    return task.completed === "YES" || task.completed === "NO";
  },

  // And this method to get the completion status for the review page:
  getTaskCompletionStatus: (task) => {
    if (!get().isTaskReviewed(task)) {
      return null; // Not reviewed yet
    }

    return {
      completed: task.completed === "YES",
      reason: task.reason || null,
    };
  },
}));

export default useTaskFilterStore;
