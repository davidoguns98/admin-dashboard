// context/auth.tsx/auth.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createMockJWT, parseMockJWT, MockJWTPayload } from "@/utils/jwt";

type Role = "admin" | "editor" | null;

interface AuthContextProps {
  role: Role;
  login: (role: Exclude<Role, null>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      const data = parseMockJWT(token);
      const now = Math.floor(Date.now() / 1000);
      if (data && data.exp > now) {
        setRole(data.role);
      } else {
        Cookies.remove("jwt");
      }
    }
  }, []);

  const login = (newRole: Exclude<Role, null>) => {
    const token = createMockJWT({
      role: newRole,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expires in 7 days
    });
    Cookies.set("jwt", token, { expires: 7 });
    setRole(newRole);
  };

  const logout = () => {
    Cookies.remove("jwt");
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
