import React, { createContext, useEffect, useState } from "react";
import api from "../services/api"; // Axios instance with baseURL
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional: verify token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/auth/verify", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        logout(); // invalid token
      });
  }, []);

  // Login function
  const login = async ({ identifier, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", { identifier, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      // Redirect based on role
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async ({ username, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", { username, email, password });
      // After registration, redirect to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
