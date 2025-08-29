import axios from "axios";
import usehouAuthStore from "../../store/admin/usehouAuthStore";

const axiosInstance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://workplan-api.onrender.com", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = usehouAuthStore.getState().token;
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
