import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

export const PrivateRoutes: React.FC = () => {
  const { validateToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate token each time the route changes or component renders
    const isValid = validateToken();

    // If the token is invalid or expired, log out the user
    if (!isValid) {
      navigate("/unauth");
    }
  }, [location]); // Re-run validation whenever the route changes

  const isValid = validateToken();

  // If the token is valid, render the child routes
  return isValid ? <Outlet /> : <Navigate to="/unauth" />;
};
