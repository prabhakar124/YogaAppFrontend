"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

type AuthView = 
  | "signin" 
  | "signup" 
  | "verify-email" 
  | "forgot-password" 
  | "reset-password";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: AuthView;
};

export default function AuthModal({ isOpen, onClose, defaultView = "signin" }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const auth = useAuth();

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await auth.signin(email, password);
    
    if (result.ok) {
      resetForm();
      onClose();
    } else {
      setError(result.message || "Login failed");
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const result = await auth.signup(name, email, password);
    
    if (result.ok) {
      setSuccess("Registration successful! Please check your email for OTP.");
      setTimeout(() => {
        setView("verify-email");
        setSuccess("");
      }, 2000);
    } else {
      setError(result.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await auth.verifyEmail(email, otp);
    
    if (result.ok) {
      setSuccess("Email verified! Logging you in...");
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);
    } else {
      setError(result.message || "Verification failed");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setError("");
    setLoading(true);

    const result = await auth.resendVerificationOtp(email);
    
    if (result.ok) {
      setSuccess("OTP resent! Check your email.");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(result.message || "Failed to resend OTP");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await auth.forgotPassword(email);
    
    if (result.ok) {
      setSuccess("Reset OTP sent! Check your email.");
      setTimeout(() => {
        setView("reset-password");
        setSuccess("");
      }, 2000);
    } else {
      setError(result.message || "Failed to send reset email");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const result = await auth.resetPassword(email, otp, newPassword);
    
    if (result.ok) {
      setSuccess("Password reset successful! Please sign in.");
      setTimeout(() => {
        setView("signin");
        resetForm();
      }, 2000);
    } else {
      setError(result.message || "Password reset failed");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        {/* Close Button */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sitemark Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">Sitemark</span>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}

        {/* Sign In View */}
        {view === "signin" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Sign in</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setView("forgot-password");
                }}
                className="w-full text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">or</span>
            </div>

            <div className="mt-4 space-y-3">
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">SIGN IN WITH GOOGLE</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium">SIGN IN WITH FACEBOOK</span>
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => {
                  resetForm();
                  setView("signup");
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </div>
          </>
        )}

        {/* Sign Up View */}
        {view === "signup" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Sign up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Creating account..." : "SIGN UP"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => {
                  resetForm();
                  setView("signin");
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </>
        )}

        {/* Verify Email View */}
        {view === "verify-email" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Verify Email</h2>
            <p className="text-sm text-gray-600 mb-6">
              We've sent a 6-digit code to <strong>{email}</strong>
            </p>
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                  required
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Verifying..." : "VERIFY EMAIL"}
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full text-sm text-blue-600 hover:underline"
              >
                Didn't receive code? Resend
              </button>
            </form>
          </>
        )}

        {/* Forgot Password View */}
        {view === "forgot-password" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email to receive a password reset code
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Sending..." : "SEND RESET CODE"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setView("signin");
                }}
                className="w-full text-sm text-blue-600 hover:underline"
              >
                Back to sign in
              </button>
            </form>
          </>
        )}

        {/* Reset Password View */}
        {view === "reset-password" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter the code sent to <strong>{email}</strong> and your new password
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reset Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                  required
                  maxLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Resetting..." : "RESET PASSWORD"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}