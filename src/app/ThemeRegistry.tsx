'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import { getTheme } from './theme';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { initializeTheme } from './store/slices/uiSlice';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  // Initialize theme from localStorage on mount
  React.useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  // Create theme based on current mode
  const theme = React.useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}