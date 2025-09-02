"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../../adminapi/hodapi/axiosInstance";

// ✅ Helpers
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB"); // e.g. 25/08/2025
};

const transformTasks = (tasks = []) =>
  tasks.map((task) => ({
    ...task,
    statusLabel:
      task.status === "COMPLETED"
        ? "Completed"
        : task.status === "IN_PROGRESS"
        ? "In progress"
        : "Pending",
    created_at: formatDate(task.created_at),
    updated_at: formatDate(task.updated_at),
  }));

const transformPlans = (plans = []) =>
  plans.map((plan) => ({
    ...plan,
    created_at: formatDate(plan.created_at),
    updated_at: formatDate(plan.updated_at),
    tasks: transformTasks(plan.task),
  }));

// ✅ Store with persistence
const usehodTask = create(
  persist(
    (set, get) => ({
      staff: null,
      plans: [],
      tasks: [],
      loading: false,
      error: null,
      lastFetchParams: null, // Track last successful fetch parameters

      // Fetch staff with plans & tasks
      fetchStaffTasks: async (staffId, unitId, month, week) => {
        set({ loading: true, error: null });
        try {
          const payload = {
            staff_id: String(staffId),
            unit_id: String(unitId),
            month: String(month),
            week: String(week),
            user: "",
          };
          const res = await axiosInstance.post(
            `/api/hod/dashboard/unit/staff`,
            payload
          );
          //log what is being sent
          console.log("Request payload:", {
            staff_id: staffId,
            unit_id: unitId,
            month: month,
            week: week,
            user: "", // ✅ empty user string
          });

          if (res.data.success) {
            const staff = res.data.data;
            console.log("Fetched staff data:", staff);

            const transformedPlans = transformPlans(staff.plans || []); // Handle null/undefined plans
            const allTasks = transformedPlans.flatMap((p) => p.task || []); // Handle null/undefined tasks

            set({
              staff,

              plans: transformedPlans,
              tasks: allTasks,
              loading: false,
              lastFetchParams: { staffId, month, week }, // Store successful params
            });

            console.log("Fetched data:", {
              staff,
              plans: transformedPlans,
              tasks: allTasks,
              params: { staffId, month, week },
            });
          } else {
            // Even if API says not successful, we should still clear tasks for this week
            set({
              staff: null,
              plans: [],
              tasks: [],
              error: res.data.message || "Failed to fetch staff tasks",
              loading: false,
              lastFetchParams: { staffId, month, week }, // Still track the params
            });
          }
        } catch (err) {
          // On error, clear the tasks but still track the attempted fetch
          set({
            staff: null,
            plans: [],
            tasks: [],
            error: err.response?.data?.message || "An error occurred",
            loading: false,
            lastFetchParams: { staffId, month, week }, // Track failed attempt too
          });
        }
      },

      // Check if data exists for current parameters
      hasDataForParams: (staffId, month, week) => {
        const { lastFetchParams, tasks } = get();
        return (
          lastFetchParams &&
          lastFetchParams.staffId === staffId &&
          lastFetchParams.month === month &&
          lastFetchParams.week === week &&
          tasks.length > 0
        );
      },

      reset: () =>
        set({
          staff: null,
          plans: [],
          tasks: [],
          error: null,
          lastFetchParams: null,
        }),
    }),
    {
      name: "task-store", // localStorage key
      // Only persist the data, not loading states
      partialize: (state) => ({
        staff: state.staff,
        plans: state.plans,
        tasks: state.tasks,
        lastFetchParams: state.lastFetchParams,
      }),
    }
  )
);

export default usehodTask;
