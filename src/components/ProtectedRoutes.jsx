// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../services/authService";
import SkeletonCard from "../components/ui/SkeletonCard";
import { showToast } from "../utils/toast";
const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await checkAuth();

      if (!result.isAuthenticated) {
        showToast("Phiên đăng nhập hết hạn", "error");
      }
      setAuth(result.isAuthenticated);
      setIsLoading(false);
    };
    verify();
  }, []);

  if (isLoading) return <SkeletonCard />;

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
