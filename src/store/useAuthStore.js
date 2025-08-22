// store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      // ✅ properly set token
      setAuthToken: (token) => set({ token }),

      // ✅ properly set user
      setUser: (user) => set({ user }),

      // Register user
      registerUser: async (userData) => {
        try {
          const response = await axiosInstance.post(
            "/api/auth/register",
            userData
          );

          const token = response.data?.message?.token;

          set({
            token,
            user: null,
          });

          return {
            status: true,
            message: "Registration successful",
            token,
          };
        } catch (error) {
          console.error("Registration failed:", error);

          return {
            status: false,
            message: error.response?.data?.message || "Registration failed",
          };
        }
      },

      // Login user
      loginUser: async (credentials) => {
        try {
          const response = await axiosInstance.post(
            "/api/auth/login",
            credentials
          );

          console.log("Login API response:", response.data); // 👀 debug

          const token = response.data?.message?.token;

          set({
            token,
            user: null, // or response.data.user if your API later adds it
          });

          return {
            status: true,
            message: "Login successful",
            token,
          };
        } catch (error) {
          console.error("Login failed:", error);

          return {
            status: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },

      // Logout/reset store
      logoutUser: () => {
        localStorage.removeItem("auth-storage"); // clear persisted storage
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      getStorage: () => localStorage, // use localStorage for persistence
    }
  )
);

export default useAuthStore;
