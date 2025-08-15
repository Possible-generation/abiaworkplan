import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://reqres.in/api", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
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
