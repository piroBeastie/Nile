import { createContext, useEffect, useState } from "react";
import {
  login,
  register,
  logout,
  checkAuth,
} from "../api/auth.api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();       
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const loginUser = async (data) => {
    await login(data);       
    setIsAuthenticated(true);
  };

  const registerUser = async (data) => {
    await register(data);
  };

  const logoutUser = async () => {
    await logout();              
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}