import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1` || "http://localhost:8787/api/v1",
});

export default axiosInstance;
