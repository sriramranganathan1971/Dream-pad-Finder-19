import React, { createContext, useContext, useState, useEffect } from "react";

// Change this if your backend runs elsewhere (or use Vite env var VITE_API_URL)
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on app start (if token exists)
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch(`${API}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          logout();
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .catch((err) => {
        console.error("Profile fetch failed:", err);
        logout();
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ---- Auth Actions ----

  // Login with email + password
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { ok: false, error: data.message || "Login failed" };
      }

      localStorage.setItem("auth_token", data.token);
      setUser(data.user);
      setIsLoading(false);
      return { ok: true };
    } catch (err) {
      console.error("Login error:", err);
      setIsLoading(false);
      return { ok: false, error: err.message };
    }
  };

  // Signup with user details
  const signup = async (userData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { ok: false, error: data.message || "Signup failed" };
      }

      localStorage.setItem("auth_token", data.token);
      setUser(data.user);
      setIsLoading(false);
      return { ok: true };
    } catch (err) {
      console.error("Signup error:", err);
      setIsLoading(false);
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  // Helper to call protected APIs
// Helper to call protected APIs (robust: support absolute URLs or relative paths)
  const authFetch = async (pathOrUrl, options = {}) => {
  const token = localStorage.getItem("auth_token");
  const headers = options.headers ? { ...options.headers } : {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : `${API}${pathOrUrl}`;
  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }
  return res;
};

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
