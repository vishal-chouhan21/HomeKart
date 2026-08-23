"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: unknown;
}

interface AuthResponse {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "http://localhost:3001/api/user"; // Update this to your backend API base URL

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user profile on initial mount if token cookie exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // Token is expired or invalid
          Cookies.remove("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Login failed" };
      }

      Cookies.set("token", data.accessToken, { expires: 7, path: "/" });

      if (data.user) {
        setUser(data.user);
      } else {
        // Fallback: fetch profile if backend login only returns a token
        const userRes = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }
      }

      router.push("/");
      return { success: true, message: data.message || "Login successful" };
    } catch (error: unknown) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Network error. Please try again.",
      };
    }
  };

  const signup = async (
    email: string,
    password: string,
    name?: string,
  ): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Signup failed" };
      }

      if (data.accessToken) {
        Cookies.set("token", data.accessToken, { expires: 7, path: "/" });
        setUser(data.user || null);
      } else {
        const userRes = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }
      }

      return { success: true, message: data.message || "Signup successful" };
    } catch (error: unknown) {
      console.error("Signup error:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Network error. Please try again.",
      };
    }
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
