'use client';

import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

// This component updates the HTML class for theme
export default function ThemeInitializer() {
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  useEffect(() => {
    // Update HTML class for theme
    const htmlElement = document.documentElement;
    htmlElement.className = themeMode;
  }, [themeMode]);

  return null; // This component renders nothing
}