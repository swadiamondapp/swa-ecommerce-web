"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useCart } from "@/providers/cart-provider";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("swaToken");
    if (token) {
      const userName = localStorage.getItem("userName");
      const userProfile = localStorage.getItem("userProfile");
      const phoneNumber = localStorage.getItem("phoneNumber");
      const userEmail = localStorage.getItem("UserEmail");
      setToken(token);
      setUser({ userName, userProfile, phoneNumber, userEmail });
    }
  }, []);

  const setAuth = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("swaToken", token);
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("userProfile", user.userProfile);
    localStorage.setItem("phoneNumber", user.phoneNumber);
    localStorage.setItem("UserEmail", user.userEmail);
  };

  const logout = () => {
    clearCart();
    localStorage.removeItem("swaToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("UserEmail");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
