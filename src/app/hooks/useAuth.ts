import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  signin as signinAction,
  signup as signupAction,
  signout as signoutAction,
  verifyEmail as verifyEmailAction,
  resendVerificationOtp as resendOtpAction,
  forgotPassword as forgotPasswordAction,
  resetPassword as resetPasswordAction,
  checkSession,
  clearError,
} from '../store/slices/authSlice';

// Custom hook that mimics your old useAuth API
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error, isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth
  );

  // Wrapper functions to maintain backward compatibility
  const signin = async (email: string, password: string) => {
    const result = await dispatch(signinAction({ email, password }));
    if (signinAction.fulfilled.match(result)) {
      return { ok: true };
    } else {
      return { ok: false, message: result.payload as string };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const result = await dispatch(signupAction({ name, email, password }));
    if (signupAction.fulfilled.match(result)) {
      return { ok: true, message: result.payload.message, email: result.payload.email };
    } else {
      return { ok: false, message: result.payload as string };
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    const result = await dispatch(verifyEmailAction({ email, otp }));
    if (verifyEmailAction.fulfilled.match(result)) {
      return { ok: true };
    } else {
      return { ok: false, message: result.payload as string };
    }
  };

  const resendVerificationOtp = async (email: string) => {
    const result = await dispatch(resendOtpAction(email));
    if (resendOtpAction.fulfilled.match(result)) {
      return { ok: true, message: result.payload };
    } else {
      return { ok: false, message: result.payload as string };
    }
  };

  const forgotPassword = async (email: string) => {
    const result = await dispatch(forgotPasswordAction(email));
    if (forgotPasswordAction.fulfilled.match(result)) {
      return { ok: true, message: result.payload };
    } else {
      return { ok: false, message: result.payload as string };
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    const result = await dispatch(resetPasswordAction({ email, otp, newPassword }));
    if (resetPasswordAction.fulfilled.match(result)) {
      return { ok: true, message: result.payload };
    } else {
      return { ok: false, message: result.payload as string };
    }
  };

  const signout = async () => {
    await dispatch(signoutAction());
  };

  const refresh = async () => {
    await dispatch(checkSession());
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isInitialized,
    signin,
    signup,
    verifyEmail,
    resendVerificationOtp,
    forgotPassword,
    resetPassword,
    signout,
    refresh,
    clearError: () => dispatch(clearError()),
  };
};