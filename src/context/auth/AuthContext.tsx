// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  login: (data:boolean) => void;
  logout: () => void;
  initializeAuth: () => void;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const login = (data:boolean) => {
    setIsAuthenticated(data);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    localStorage.removeItem('token');
  };

  const initializeAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        setIsAuthenticated(true);
        setUserRole(decodedPayload.role);
      } catch (error) {
        console.error('Failed to parse token', error);
      }
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, initializeAuth,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
