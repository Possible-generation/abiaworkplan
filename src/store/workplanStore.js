// store/useWorkplanStore.js

import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import { getCurrentMonth, getCurrentWeekOfMonth } from "../utils/dateHelpers";

const useWorkplanStore = create((set) => ({
  workplan: null,
  loading: false,
  error: null,

  createWorkplan: async (plans) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        month: getCurrentMonth(), // auto-detected month
        week: getCurrentWeekOfMonth(), // auto-detected week
        plans, // plans passed from UI
      };
      console.log(
        "Full payload being sent to API:",
        JSON.stringify(payload, null, 2)
      ); // ADD THIS LINE
      const response = await axiosInstance.post(
        "/api/staff/plan/create",
        payload
      );

      set({ workplan: response.data, loading: false });
      return response.data;
    } catch (error) {
      console.error("Workplan creation failed:", error);
      set({ error: error.response?.data || error.message, loading: false });
      throw error;
    }
  },
}));

export default useWorkplanStore;
