import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1` || "http://localhost:8787/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
