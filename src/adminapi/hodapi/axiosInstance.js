import axios from "axios";
import usehodAuthStore from "../../store/admin/usehodAuthStore";

const axiosInstance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://workplan-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = usehodAuthStore.getState().token;
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
