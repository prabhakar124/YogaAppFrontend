"use client";

import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // optional callback when sign-in succeeds
};

export default function SignInDialog({ open, onClose, onSuccess }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Please enter a valid email";
    if (!password || password.length < 6) e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();
    if (!validate()) return;
    // TODO: call your auth API
    // On success:
    if (onSuccess) onSuccess();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-label="Sign in dialog"
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 0,
          overflow: "visible",
          // subtle drop shadow similar to Dropbox example
          boxShadow: "0 12px 40px rgba(10,20,30,0.18)",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}>
        <IconButton size="small" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Avatar sx={{ bgcolor: "transparent", width: 36, height: 36 }}>
            {/* replace with your logo Image if you like */}
            <Box component="span" sx={{ display: "block", width: 32, height: 32, bgcolor: "transparent" }} />
          </Avatar>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Sign in
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            size="small"
            fullWidth
            autoComplete="email"
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            type="password"
            size="small"
            fullWidth
            autoComplete="current-password"
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
              label="Remember me"
            />
            <Button variant="text" onClick={() => alert("Open forgot password flow")} size="small">
              Forgot your password?
            </Button>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ py: 1.2 }}>
            Sign in
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Button startIcon={<GoogleIcon />} variant="outlined" fullWidth sx={{ textTransform: "none" }}>
            Sign in with Google
          </Button>
          <Button startIcon={<FacebookIcon />} variant="outlined" fullWidth sx={{ textTransform: "none" }}>
            Sign in with Facebook
          </Button>

          <Typography align="center" variant="body2" sx={{ mt: 1 }}>
            Don't have an account? <Button variant="text" onClick={() => alert("Go to sign up")} sx={{ p: 0 }}>Sign up</Button>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
