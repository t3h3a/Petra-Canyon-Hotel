import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthUser = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  country: string;
};

type AuthProfileInput = {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (input: AuthProfileInput) => { ok: boolean; message?: string };
  logout: () => void;
  updateProfile: (input: Omit<AuthUser, "password" | "email"> & { email?: string }) => void;
};

const STORAGE_USERS_KEY = "petra-canyon-users";
const STORAGE_SESSION_KEY = "petra-canyon-session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AuthUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: AuthUser[]) {
  window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUsers = readUsers();
    setUsers(storedUsers);

    const sessionEmail = window.localStorage.getItem(STORAGE_SESSION_KEY);
    if (!sessionEmail) return;

    const currentUser = storedUsers.find((item) => item.email.toLowerCase() === sessionEmail.toLowerCase()) ?? null;
    setUser(currentUser);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (email, password) => {
        const existingUser = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
        if (!existingUser) {
          return { ok: false, message: "No account found for this email." };
        }

        if (existingUser.password !== password) {
          return { ok: false, message: "Incorrect password." };
        }

        setUser(existingUser);
        window.localStorage.setItem(STORAGE_SESSION_KEY, existingUser.email);
        return { ok: true };
      },
      register: ({ fullName, email, password, phone = "", country = "" }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const alreadyExists = users.some((item) => item.email.toLowerCase() === normalizedEmail);

        if (alreadyExists) {
          return { ok: false, message: "An account with this email already exists." };
        }

        const nextUser: AuthUser = {
          fullName: fullName.trim(),
          email: normalizedEmail,
          password,
          phone: phone.trim(),
          country: country.trim(),
        };

        const nextUsers = [...users, nextUser];
        setUsers(nextUsers);
        writeUsers(nextUsers);
        setUser(nextUser);
        window.localStorage.setItem(STORAGE_SESSION_KEY, nextUser.email);
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        window.localStorage.removeItem(STORAGE_SESSION_KEY);
      },
      updateProfile: ({ fullName, phone, country }) => {
        if (!user) return;

        const nextUser: AuthUser = {
          ...user,
          fullName: fullName.trim(),
          phone: phone.trim(),
          country: country.trim(),
        };

        const nextUsers = users.map((item) => (item.email === user.email ? nextUser : item));
        setUsers(nextUsers);
        writeUsers(nextUsers);
        setUser(nextUser);
      },
    }),
    [user, users],
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
