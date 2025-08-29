"use client";

import { create } from "zustand";
import axiosInstance from "../../adminapi/hodapi/axiosInstance";

const useAdminDashboardStore = create((set) => ({
  user: null,
  analytics: null,
  units: [],
  loading: false,
  error: null,

  // Fetch admin dashboard data
  fetchAdminDashboard: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get("/api/hod/dashboard");

      if (res.data.success) {
        set({
          user: res.data.user,
          analytics: res.data.analytics,
          units: res.data.units,
          loading: false,
        });
      } else {
        set({
          error: res.data.message || "Failed to fetch dashboard data",
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  },

  // Optional reset method
  reset: () => set({ user: null, analytics: null, units: [], error: null }),
}));

export default useAdminDashboardStore;
