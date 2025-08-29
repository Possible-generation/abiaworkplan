import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../../adminapi/permsec/axiosInstance";

const usePermsecAuthStore = create(
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
            "/api/ps/register",
            userData
          );

          const token = response.data?.message?.token; // adjust if API is different
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
            "/api/ps/login",
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
      name: "permsec-auth-storage", // localStorage key
      onRehydrateStorage: () => (state, error) => {
        state.hasHydrated = true; // ✅ signal hydration complete
        if (error) console.error("Hydration error", error);
      },
    }
  )
);

export default usePermsecAuthStore;
