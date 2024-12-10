import axios from "axios";
import toast from "react-hot-toast";
const local = "http://localhost:5000";
const production = "";
const api = axios.create({
  baseURL: `${local}/api`,
});

// to check the user is blocked or not in every request
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 403 &&
      error.response?.data?.message ===
        "Your account has been blocked by the admin"
    ) {
      // Logout user and redirect to login
      console.log("you are blocked");
      localStorage.removeItem("customerToken");
      toast.error("you are blocked by admin");
      window.location.href = `http://localhost:3000/login`;
    }
    return Promise.reject(error);
  }
);
// for attaching token in the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("customerToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default api;
