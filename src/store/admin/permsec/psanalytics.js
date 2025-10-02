import { create } from "zustand";
import axiosInstance from "../../../adminapi/permsec/axiosInstance";

export const useAnalyticsStore = create((set) => ({
  loading: false,
  error: null,
  user: null,
  analytics: null,
  staff: [],
  message: null,

  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/api/ps/analytics");
      set({
        user: res.data.user,
        analytics: res.data.analytics,
        staff: res.data.data,
        message: res.data.message,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Failed to fetch analytics",
        loading: false,
      });
    }
  },
}));
