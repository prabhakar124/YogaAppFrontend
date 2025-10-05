"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: number; email: string; name?: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  signin: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const backend = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:4000/api";

  async function refresh() {
    setLoading(true);
    try {
      const r = await fetch(`${backend}/auth/session`, { credentials: "include" });
      if (!r.ok) {
        setUser(null);
        setLoading(false);
        return;
      }
      const json = await r.json();
      setUser(json.user ?? null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signin(email: string, password: string) {
    try {
      const r = await fetch(`${backend}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const json = await r.json();
      if (!r.ok) return { ok: false, message: json.message || "Login failed" };
      // cookie set by server; refresh user
      await refresh();
      return { ok: true };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function signout() {
    try {
      await fetch(`${backend}/auth/logout`, { method: "POST", credentials: "include" });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
