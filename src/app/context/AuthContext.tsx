"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = { 
  id: number; 
  email: string; 
  name?: string;
  role?: string;
  is_verified?: boolean;
} | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  signin: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; message?: string; email?: string }>;
  verifyEmail: (email: string, otp: string) => Promise<{ ok: boolean; message?: string }>;
  resendVerificationOtp: (email: string) => Promise<{ ok: boolean; message?: string }>;
  forgotPassword: (email: string) => Promise<{ ok: boolean; message?: string }>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<{ ok: boolean; message?: string }>;
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
      // Changed from /auth/session to /auth/me
      const r = await fetch(`${backend}/auth/me`, { credentials: "include" });
      if (!r.ok) {
        setUser(null);
        setLoading(false);
        return;
      }
      const json = await r.json();
      setUser(json.user ?? null);
    } catch (err) {
      console.error("Refresh error:", err);
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
      
      if (!r.ok) {
        return { ok: false, message: json.detail || json.message || "Login failed" };
      }
      
      // Cookie set by server; refresh user
      await refresh();
      return { ok: true };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      const r = await fetch(`${backend}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });
      const json = await r.json();
      
      if (!r.ok) {
        return { ok: false, message: json.detail || json.message || "Registration failed" };
      }
      
      return { ok: true, message: json.message, email: json.email };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function verifyEmail(email: string, otp: string) {
    try {
      const r = await fetch(`${backend}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      const json = await r.json();
      
      if (!r.ok) {
        return { ok: false, message: json.detail || json.message || "Verification failed" };
      }
      
      // User is now verified and logged in
      await refresh();
      return { ok: true, message: "Email verified successfully" };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function resendVerificationOtp(email: string) {
    try {
      const r = await fetch(`${backend}/auth/resend-verification-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const json = await r.json();
      
      if (!r.ok) {
        return { ok: false, message: json.detail || json.message || "Failed to resend OTP" };
      }
      
      return { ok: true, message: json.message };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function forgotPassword(email: string) {
    try {
      const r = await fetch(`${backend}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const json = await r.json();
      
      if (!r.ok) {
        return { ok: false, message: json.detail || json.message || "Failed to send reset email" };
      }
      
      return { ok: true, message: json.message };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function resetPassword(email: string, otp: string, newPassword: string) {
    try {
      const r = await fetch(`${backend}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
        credentials: "include",
      });
      const json = await r.json();
      
      if (!r.ok) {
        return { ok: false, message: json.detail || json.message || "Password reset failed" };
      }
      
      return { ok: true, message: json.message };
    } catch (err) {
      return { ok: false, message: String(err) };
    }
  }

  async function signout() {
    try {
      await fetch(`${backend}/auth/logout`, { 
        method: "POST", 
        credentials: "include" 
      });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signin, 
      signup,
      verifyEmail,
      resendVerificationOtp,
      forgotPassword,
      resetPassword,
      signout, 
      refresh 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}