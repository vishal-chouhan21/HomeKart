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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "http://localhost:3001/admin"; // Update this to your backend API base URL

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set("token", data.token, { expires: 7 }); // Set token cookie with 7-day expiration
        setUser(data.user);
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "An error occurred during login." };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
