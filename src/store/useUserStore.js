// store/useUserStore.js
import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/api/staff/dashboard");
      if (res.data.success) {
        set({
          user: res.data.user,
          loading: false,
        });
      } else {
        set({
          error: res.data.message || "Failed to fetch user",
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
}));

export default useUserStore;
