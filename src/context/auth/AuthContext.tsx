import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  login: (token: string) => void;
  logout: () => void;
  validateToken: () => boolean; // Function to validate token
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const login = (token: string) => {
    // Store the token in localStorage
    localStorage.setItem("token", token);
    validateToken(); // Validate the token and set the auth state
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("token");
  };

  const validateToken = (): boolean => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string } = jwtDecode(token);

        // Check if the token has expired
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          logout(); // Token is expired
          setIsAuthenticated(false);

          return false;
        } else {
          setIsAuthenticated(true);
          setUserRole(decodedToken.role || "");
          return true;
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        logout();
        return false;
      }
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    validateToken(); // Validate on app load
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
