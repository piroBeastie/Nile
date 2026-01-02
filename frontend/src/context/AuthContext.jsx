import { createContext, useState } from "react";
import { login, register } from "../api/auth.api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = async (data) => {
    setLoading(true);
    try {
      await login(data); // cookie set by backend
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data) => {
    setLoading(true);
    try {
      await register(data);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    // no backend logout route exists
    // cookie will expire on browser close (or backend expiry)
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