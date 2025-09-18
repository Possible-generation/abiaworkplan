"use client";

import { create } from "zustand";
import axiosInstance from "../../adminapi/hos/axiosInstance";
// import { minify } from "next/dist/build/swc/generated-native";

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

const useAdminHosDashboardStore = create((set) => ({
  user: null,
  analytics: null,
  departments: [],
  ministries: [],
  ministrydepartment: [],
  ministry: null,
  units: [],
  loading: false,
  error: null,
  staff: [],
  roles: null,
  hod: [],
  users: null,
  departmentName: null,
  departmentunitlist: [],

  // Fetch admin dashboard data
  fetchAdminDashboard: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get("/api/hos/dashboard");
      console.log("Hos dashboard data fetched:", res.data);
      if (res.data.success) {
        set({
          user: res.data.user,
          analytics: res.data.analytics,
          ministries: res.data.ministries,
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

  //Post a selected Ministry
  postMinistry: async (ministryId) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/api/hos/dashboard/ministry", {
        ministry_id: String(ministryId),
      });
      console.log("Post ministry head response:", res.data);
      if (res.data.success) {
        // set({
        //   unit: Array.isArray(res.data.data) ? res.data.data : [],
        //   roles: res.data.roles || [],
        //   loading: false,
        // });
        set({
          users: res.data.user || null, // singular user object
          ministrydepartment: Array.isArray(res.data.ministry.department)
            ? res.data.ministry.department
            : [res.data.ministry.department],
          ministry: res.data.ministry || "", // safe access with optional chaining
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

  // Post a selected departmentid
  postDepartment: async (ministry_id, department_id) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post(
        "/api/hos/dashboard/ministry/department",
        {
          department_id: String(department_id),
          ministry_id: String(ministry_id),
        }
      );
      console.log("Post department head response:", res.data);
      if (res.data.success) {
        // set({
        //   unit: Array.isArray(res.data.data) ? res.data.data : [],
        //   roles: res.data.roles || [],
        //   loading: false,
        // });
        set({
          users: res.data.user || null, // singular user object
          departmentunitlist: Array.isArray(res.data.department.unit)
            ? res.data.department.unit
            : [res.data.department.unit],
          departmentName: res.data.department || "", // safe access with optional chaining
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
  postUnit: async (ministry_id, department_id, unit_id) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post(
        "/api/hos/dashboard/ministry/department/unit",
        {
          ministry_id: String(ministry_id),
          department_id: String(department_id),
          unit_id: String(unit_id),
        }
      );
      console.log("Post unit head response:", res.data);
      if (res.data.success) {
        set({
          staff: Array.isArray(res.data.unit.user) ? res.data.unit.user : [],
          roles: res.data.unit,
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

  //   post selected staff to backend
  PostStaff: async (staffId, unitId) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/api/hod/dashboard/unit/staff", {
        staff_id: staffId,
        unit_id: unitId,
      });

      if (res.data.success) {
        set({
          staff: Array.isArray(res.data.data)
            ? res.data.data
            : res.data.data
            ? [res.data.data] // ✅ wrap single object
            : [],
          message: res.data.message || "",
          loading: false,
        });
      } else {
        set({
          error: res.data.message || "Failed to post staff",
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
      units: [],
      staff: [],
      roles: null,
      error: null,
    }),
}));

export default useAdminHosDashboardStore;
