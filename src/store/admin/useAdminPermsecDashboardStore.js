"use client";

import { create } from "zustand";
import axiosInstance from "../../adminapi/permsec/axiosInstance";

// Helper: format date into "Aug 22, 2025"
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short", // Aug
    day: "numeric", // 22
    year: "numeric", // 2025
  });
};

// Helper: transform plans (approved + formatted date)
const transformPlans = (plans = []) => {
  return plans.map((plan) => ({
    ...plan,
    approved: plan.approved ? "Approved" : "Pending", //  change bool to label
    created_at: formatDate(plan.created_at), //  formatted date
  }));
};

const useAdminPermsecDashboardStore = create((set) => ({
  user: null,
  analytics: null,
  departments: [],
  units: [],
  loading: false,
  error: null,
  staff: [],
  roles: null,
  unit: null,
  departmentName: null,

  // Fetch admin dashboard data
  fetchAdminDashboard: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get("/api/ps/dashboard");
      console.log("Permsec dashboard data fetched:", res.data);
      if (res.data.success) {
        set({
          user: res.data.user,
          analytics: res.data.analytics,
          units: res.data.units,
          departments: res.data.departments,
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

  // Post a selected departmentid
  postDepartment: async (departmentId) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/api/ps/dashboard/departments", {
        department_id: String(departmentId),
      });
      console.log("Post department response:", res.data);
      if (res.data.success) {
        // set({
        //   unit: Array.isArray(res.data.data) ? res.data.data : [],
        //   roles: res.data.roles || [],
        //   loading: false,
        // });
        set({
          user: res.data.user || null,
          unit: res.data.units || [], // ✅ fix: use `units` instead of `data`
          departmentName: res.data.Department || "",
          message: res.data.message || "",
          loading: false,
        });
      } else {
        set({
          error: res.data.message || "Failed to post department",

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

  /// Post a selected unit to backend
  postUnit: async (department_id, unit_id) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post(
        "/api/ps/dashboard/departments/unit",
        {
          unit_id: String(unit_id),
          department_id: String(department_id),
        }
      );
      if (res.data.success) {
        set({
          staff: Array.isArray(res.data.staff) ? res.data.staff : [],
          roles: res.data,
          loading: false,
        });
      } else {
        set({
          error: res.data.message || "Failed to post unit",
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

  // post selected staff to backend
  //   PostStaff: async (staffId, unitId) => {
  //     set({ loading: true, error: null });

  //     try {
  //       const res = await axiosInstance.post("/api/hod/dashboard/unit/staff", {
  //         staff_id: staffId,
  //         unit_id: unitId,
  //       });

  //       if (res.data.success) {
  //         set({
  //           staff: Array.isArray(res.data.data)
  //             ? res.data.data
  //             : res.data.data
  //             ? [res.data.data] // ✅ wrap single object
  //             : [],
  //           message: res.data.message || "",
  //           loading: false,
  //         });
  //       } else {
  //         set({
  //           error: res.data.message || "Failed to post staff",
  //           loading: false,
  //         });
  //       }
  //     } catch (err) {
  //       set({
  //         error: err.response?.data?.message || "An error occurred",
  //         loading: false,
  //       });
  //     }
  //   },

  // Optional reset method
  reset: () =>
    set({
      user: null,
      analytics: null,
      units: [],
      staff: [],
      roles: null,
      error: null,
    }),
}));

export default useAdminPermsecDashboardStore;
