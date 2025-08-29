import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../../adminapi/hodapi/axiosInstance";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,

      // set token & user
      setAuthToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      // Register user
      registerUser: async (userData) => {
        try {
          const response = await axiosInstance.post(
            "/api/hod/register",
            userData
          );

          const token = response.data?.message?.token;
          const user = response.data?.message?.user || null;

          set({ token, user });

          return {
            status: true,
            message: "Registration successful",
            token,
            user,
          };
        } catch (error) {
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
            "/api/hod/login",
            credentials
          );

          const token = response.data?.message?.token;
          const user = response.data?.message?.user || null;

          set({ token, user });

          return { status: true, message: "Login successful", token, user };
        } catch (error) {
          return {
            status: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },

      // Logout/reset store
      logoutUser: () => set({ token: null, user: null }),
    }),
    {
      name: "hod-auth-storage", // localStorage key
      onRehydrateStorage: () => (state, error) => {
        state.hasHydrated = true; // signal hydration complete
        if (error) console.error("Hydration error", error);
      },
    }
  )
);

export default useAuthStore;
