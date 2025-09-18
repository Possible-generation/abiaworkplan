import axios from "axios";
import useHosAuthStore from "../../store/useHosAuthStore";

const axiosInstance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://workplan-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useHosAuthStore.getState().token;
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
