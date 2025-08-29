import axios from "axios";
import usePermsecAuthStore from "../../store/admin/usePermsecAuthStore";

const axiosInstance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://workplan-api.onrender.com", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = usePermsecAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
