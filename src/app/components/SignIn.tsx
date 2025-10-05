// src/app/components/SignIn.tsx
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../utils/ForgotPassword";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../utils/CustomIcons";
import { useAuth } from "../context/AuthContext";

/*
  This SignIn component supports two modes:
   - Full page (default): wraps with AppTheme + full-height layout
   - Compact (compact={true}): no AppTheme wrapper, no full-height background;
     suitable to render inside a Dialog. Pass onSuccess to close dialog on success.
*/

type SignInProps = {
  disableCustomTheme?: boolean;
  onSuccess?: () => void;
  compact?: boolean; // render compact dialog-friendly version
};

const CardRoot = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact?: boolean }>(({ theme, compact }) => ({
  height: compact ? "auto" : "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: compact ? "auto" : "100%",
  padding: compact ? theme.spacing(2) : theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: compact ? theme.spacing(3) : theme.spacing(4),
  },
  position: "relative",
  // background decoration for full-page mode only
  "&::before": compact
    ? undefined
    : {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
          "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
      },
}));

export default function SignIn(props: SignInProps) {
  const { onSuccess, compact } = props;

   // Auth hook from context
  const { signin } = useAuth();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // loading state while calling signin
  const [submitting, setSubmitting] = React.useState(false);

  // local submit handler now triggers onSuccess on success:
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    
    event.preventDefault();

    // local validation
    const ok = validateInputs();
    if (!ok) return;

    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      setSubmitting(true);
      // call the signin from AuthContext
      const result = await signin(email, password);
      if (!result.ok) {
        // show server message as a password error (or adjust as needed)
        setPasswordError(true);
        setPasswordErrorMessage(result.message || "Invalid credentials");
        return;
      }
       // success: close dialog or do callback
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (err) {
      console.error("Sign in error", err);
      setPasswordError(true);
      setPasswordErrorMessage("Something went wrong. Try again.");
    }
     finally {
      setSubmitting(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement | null;
    const password = document.getElementById("password") as HTMLInputElement | null;

    let isValid = true;

    if (!email || !email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || !password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  // inner form UI (shared between compact & full)
  const content = (
    <>
      {/* Only include CssBaseline in full (AppTheme) mode.
          When used inside a dialog (compact), parent will control baseline */}
      {!compact && <CssBaseline enableColorScheme />}

      <SignInContainer compact={compact} direction="column" justifyContent="space-between">
        {/* Color toggle stays available; position differs in compact mode */}
        <ColorModeSelect sx={{ position: compact ? "absolute" : "fixed", top: "1rem", right: "1rem", zIndex: 40 }} />

        <CardRoot variant="outlined" sx={compact ? { maxWidth: 560, p: 3 } : {}}>
          <SitemarkIcon />
          <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(1.5rem, 6vw, 2.15rem)" }}>
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <ForgotPassword open={open} handleClose={() => setOpen(false)} />

            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
              Sign in
            </Button>

            <Link component="button" type="button" onClick={() => setOpen(true)} variant="body2" sx={{ alignSelf: "center" }}>
              Forgot your password?
            </Link>
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => alert("Sign in with Google")} startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>

            <Button fullWidth variant="outlined" onClick={() => alert("Sign in with Facebook")} startIcon={<FacebookIcon />}>
              Sign in with Facebook
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardRoot>
      </SignInContainer>
    </>
  );

  // If compact is true we do NOT wrap with AppTheme; otherwise keep original AppTheme wrapper.
  if (compact) {
    return <>{content}</>;
  }

  return (
    <AppTheme disableCustomTheme={props.disableCustomTheme}>
      {content}
    </AppTheme>
  );
}
