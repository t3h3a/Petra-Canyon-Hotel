import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { apiRequest, setCsrfToken } from "@/lib/hotel-api";

type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  isAdmin?: boolean;
};

type AuthProfileInput = {
  fullName: string;
  email?: string;
  password?: string;
  phone?: string;
  country?: string;
};

type AuthResult = {
  ok: boolean;
  message?: string;
  user?: AuthUser | null;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<AuthResult>;
  register: (input: AuthProfileInput & { email: string; password: string }) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateProfile: (input: Omit<AuthProfileInput, "email" | "password">) => Promise<AuthResult>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const data = await apiRequest<{ ok: boolean; user: AuthUser | null; csrfToken?: string }>("/api/auth/me", {
          method: "GET",
        });

        if (!cancelled) {
          setUser(data.user);
          setCsrfToken(data.csrfToken);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: Boolean(user?.isAdmin),
      isLoading,
      login: async (identifier, password) => {
        try {
          const data = await apiRequest<{ ok: boolean; user: AuthUser }>("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ identifier, password }),
          });
          setUser(data.user);
          return { ok: true, user: data.user };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Unable to login." };
        }
      },
      register: async ({ fullName, email, password, phone = "", country = "" }) => {
        try {
          const data = await apiRequest<{ ok: boolean; user: AuthUser }>("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ fullName, email, password, phone, country }),
          });
          setUser(data.user);
          return { ok: true, user: data.user };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Unable to create account." };
        }
      },
      logout: async () => {
        try {
          await apiRequest<{ ok: boolean }>("/api/auth/logout", {
            method: "POST",
            body: JSON.stringify({}),
          });
        } finally {
          setUser(null);
        }
      },
      updateProfile: async ({ fullName = "", phone = "", country = "" }) => {
        try {
          const data = await apiRequest<{ ok: boolean; user: AuthUser }>("/api/auth/profile", {
            method: "PUT",
            body: JSON.stringify({ fullName, phone, country }),
          });
          setUser(data.user);
          return { ok: true, user: data.user };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Unable to update profile." };
        }
      },
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
