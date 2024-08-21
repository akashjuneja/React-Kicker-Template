import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

export const PublicRoutes: React.FC = () => {
  const { validateToken } = useAuth();

  // Check token validity and role
  const isValid = validateToken();
  return isValid ? <Navigate to="/home" /> : <Outlet />;
};
