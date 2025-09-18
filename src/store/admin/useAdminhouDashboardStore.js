"use client";

import { create } from "zustand";
import axiosInstance from "../../adminapi/houapi/axiosInstance";

// Helper: format date into "Aug 22, 2025"
const formatDate = (isoString) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short", // Aug
    day: "numeric", // 22
    year: "numeric", // 2025
  });
};

// Helper: transform plans (approved + formatted date)
const transformPlans = (plans = []) =>
  plans.map((plan) => {
    let approvalStatus = "Pending"; // default

    if (plan.approved === true) {
      approvalStatus = "Approved";
    } else if (plan.approved === false || plan.approved == null) {
      approvalStatus = "Pending";
    }

    return {
      ...plan,
      approved: approvalStatus,
      created_at: formatDate(plan.created_at),
    };
  });

const useAdminhouDashboardStore = create((set) => ({
  user: null,
  analytics: null,
  staff: [], // ✅ add staff list
  roles: [],
  loading: false,
  error: null,

  // Fetch admin dashboard data
  fetchAdminDashboard: async (
    filters = { status_filter: "", role_filter: "" }
  ) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/api/hou/dashboard", filters);
      console.log("Dashboard data fetched successfully:", res.data);

      if (res.data.success) {
        // ✅ Transform staff + plans
        const staffWithPlans = res.data.data.map((s) => ({
          ...s,
          plans: transformPlans(s.plans),
        }));

        set({
          analytics: res.data.analytics,
          staff: staffWithPlans, // ✅ store staff list
          roles: res.data.roles || [],
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
  reset: () =>
    set({
      user: null,
      analytics: null,
      staff: [],
      roles: [],
      error: null,
    }),
}));

export default useAdminhouDashboardStore;
