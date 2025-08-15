// store for authentication state management
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuthToken: ({ token }) =>
        set(() => {
          token;
        }),

      setUser: (user) => set({ user }),

      // Register user
      registerUser: async (userData) => {
        try {
          const response = await axiosInstance.post("/register", userData);
          console.log(response);

          set({
            token: response.data.token,
            user: response.data.user,
          });
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },

      // Login user
      loginUser: async (credentials) => {
        try {
          const response = await axiosInstance.post("/login", credentials);
          set({
            token: response.data.token,
            user: response.data.user,
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      // Logout/reset store
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      getStorage: () => localStorage, // use localStorage for persistence
    }
  )
);

export default useAuthStore;
