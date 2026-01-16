import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://hubspot-crm-p324.onrender.com/api";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.message = "Request timeout. Please check your connection and try again.";
    } else if (!error.response) {
      error.message = "Network error. Please check your connection.";
    }
    return Promise.reject(error);
  }
);

export default api;
