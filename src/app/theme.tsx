'use client';
import { createTheme, PaletteMode } from '@mui/material/styles';

// Function to create theme based on mode
export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // ✅ Light mode colors
            background: {
              default: '#f8f9fa', // Off-white
              paper: '#ffffff',   // White for cards
            },
            primary: {
              main: '#667eea',
              light: '#8b9fee',
              dark: '#4c5fd5',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#764ba2',
              light: '#9468c7',
              dark: '#5a3880',
              contrastText: '#ffffff',
            },
            text: {
              primary: '#1a1a1a',
              secondary: '#666666',
            },
            divider: 'rgba(0, 0, 0, 0.12)',
          }
        : {
            // ✅ Dark mode colors
            background: {
              default: '#0a0e27', // Deep dark blue
              paper: '#151a35',   // Slightly lighter for cards
            },
            primary: {
              main: '#8b9fee',
              light: '#a8b5f5',
              dark: '#667eea',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#9468c7',
              light: '#b08dd9',
              dark: '#764ba2',
              contrastText: '#ffffff',
            },
            text: {
              primary: '#ffffff',
              secondary: 'rgba(255, 255, 255, 0.7)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
          }),
    },
    typography: {
      fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'light' ? '#f8f9fa' : '#0a0e27',
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};

// Export default light theme for initial load
export default getTheme('light');