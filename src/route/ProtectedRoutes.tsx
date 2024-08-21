import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
interface ProtectedRouteProps {
  role: string;
}
export const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { validateToken, userRole } = useAuth();

  // Check token validity and role
  const isValid = validateToken();

  // Only allow access if the token is valid and user has the required role
  return isValid && userRole === role ? <Outlet /> : <Navigate to="/home" />;
};
