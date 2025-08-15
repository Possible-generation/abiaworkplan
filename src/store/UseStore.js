import { create } from "zustand";
import { persist } from "zustand/middleware";

import { api } from "./api";

const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Tasks state
      tasks: [],
      weeklyTasks: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      },
      isWeeklyTasksComplete: false,
      reviewData: {},

      // UI state
      currentStep: 0,
      error: null,

      // Auth actions with Axios
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(credentials);
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.register(userData);
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await api.logout();
          set({
            user: null,
            isAuthenticated: false,
            tasks: [],
            weeklyTasks: {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
            },
            isWeeklyTasksComplete: false,
            reviewData: {},
            currentStep: 0,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ isLoading: false, error: error.message });
        }
      },

      // Task actions with Axios
      fetchTasks: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.getTasks(filters);
          set({
            tasks: response.data || [],
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      addTask: async (task) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.createTask(task);
          const newTask = response.task;
          set((state) => ({
            tasks: [...state.tasks, newTask],
            isLoading: false,
          }));
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      updateTask: async (taskId, updates) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.updateTask(taskId, updates);
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            ),
            isLoading: false,
          }));
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      deleteTask: async (taskId) => {
        set({ isLoading: true, error: null });
        try {
          await api.deleteTask(taskId);
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Weekly task actions
      addWeeklyTask: (day, task) =>
        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [day]: [
              ...state.weeklyTasks[day],
              { ...task, id: Date.now().toString() + Math.random() },
            ],
          },
        })),

      removeWeeklyTask: (day, taskId) =>
        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [day]: state.weeklyTasks[day].filter((task) => task.id !== taskId),
          },
        })),

      updateWeeklyTask: (day, taskId, updates) =>
        set((state) => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [day]: state.weeklyTasks[day].map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            ),
          },
        })),

      submitWeeklyTasks: async () => {
        const { weeklyTasks } = get();
        set({ isLoading: true, error: null });
        try {
          const response = await api.saveWeeklyTasks(weeklyTasks);
          set({
            isWeeklyTasksComplete: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      fetchWeeklyTasks: async (weekId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.getWeeklyTasks(weekId);
          set({
            weeklyTasks: response.data,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Review actions
      setReviewData: (data) => set({ reviewData: data }),

      updateReviewTask: (day, taskId, completed, reason = "") =>
        set((state) => ({
          reviewData: {
            ...state.reviewData,
            [day]: {
              ...state.reviewData[day],
              [taskId]: { completed, reason },
            },
          },
        })),

      submitReview: async () => {
        const { reviewData } = get();
        set({ isLoading: true, error: null });
        try {
          const response = await api.submitTaskReview(reviewData);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Analytics actions
      fetchAnalytics: async (dateRange = {}) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.getAnalytics(dateRange);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // File operations
      uploadFile: async (file, onProgress) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.uploadFile(file, onProgress);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      exportTasks: async (format = "json") => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.exportTasks(format);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // UI actions
      setCurrentStep: (step) => set({ currentStep: step }),
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),

      // Reset actions
      resetWeeklyTasks: () =>
        set({
          weeklyTasks: {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
          },
          isWeeklyTasksComplete: false,
          reviewData: {},
          currentStep: 0,
        }),

      // Hydration check for SSR
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "workplan-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useStore;
