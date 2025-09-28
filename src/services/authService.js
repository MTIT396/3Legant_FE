// authService.js
import { axiosClient } from "../utils/axios";

// Check if user is authenticated by calling a protected route
export const checkAuth = async () => {
  try {
    const res = await axiosClient.get("api/auth/protected");

    return {
      isAuthenticated: true,
      user: res.data.user || res.data.userId,
    };
  } catch (err) {
    // Optional: check for specific error messages
    if (err.response?.status === 401 || err.response?.status === 403) {
      return { isAuthenticated: false };
    }

    console.error("Auth check failed:", err);
    return { isAuthenticated: false };
  }
};
