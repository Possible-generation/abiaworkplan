import { create } from "zustand";
import axiosInstance from "../../../adminapi/permsec/axiosInstance";

export const useIndividualAnalytics = create((set) => ({
  loading: false,
  error: null,
  completedWeekTasksPercents: [],
  completedMonthTasksPercents: [],

  fetchHouAnalytics: async ({ staff_id, month }) => {
    if (!staff_id) {
      set({ error: "staff_id is required" });
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/api/ps/analytics/staff", {
        staff_id,
        ...(month && { month }), // include month only if provided
      });

      const data = res.data;

      set({
        completedWeekTasksPercents: data?.completedWeekTasksPercents || [],
        completedMonthTasksPercents: data?.completedMonthTasksPercents || [],
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching analytics:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch analytics",
        loading: false,
      });
    }
  },
}));
