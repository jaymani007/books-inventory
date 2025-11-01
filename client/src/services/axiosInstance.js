import axios from "axios";

// Create Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g., "https://api.example.com"
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get JWT from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add optional response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Automatically logout on 401
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized — token may be invalid or expired");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
