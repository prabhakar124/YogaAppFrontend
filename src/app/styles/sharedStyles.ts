import { SxProps, Theme } from '@mui/material';

// Common spacing values
export const spacing = {
  section: { py: { xs: 6, md: 8 } },
  sectionLarge: { py: { xs: 8, md: 12 } },
  container: { py: { xs: 4, md: 6 } },
  card: { p: { xs: 2, md: 3 } },
  cardLarge: { p: { xs: 3, md: 5 } },
};

// Common border radius
export const borderRadius = {
  small: 1,
  medium: 1.5,
  large: 2,
  round: '50%',
};

// Common shadows
export const shadows = {
  card: '0 4px 12px rgba(0,0,0,0.08)',
  cardHover: '0 8px 24px rgba(0,0,0,0.12)',
  elevated: '0 10px 30px rgba(0,0,0,0.12)',
};

// Common gradients
export const gradients = {
  primary: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #4c5fd5 0%, #5a3880 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  
  banner: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #4c5fd5 0%, #3d4ea8 50%, #1a3050 100%)'
      : 'linear-gradient(135deg, #5e95ccff 0%, #255aa8ff 50%, #18743fff 100%)',
  
  card: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(139, 159, 238, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
      : 'linear-gradient(180deg, rgba(63, 91, 107, 0.98) 0%, rgba(91, 115, 178, 0.95) 100%)',
};

// Typography styles
export const typography = {
  sectionTitle: {
    fontSize: { xs: '1.5rem', md: '2.5rem' },
    fontWeight: 800,
    color: 'text.primary',
    mb: 1,
  } as SxProps<Theme>,
  
  sectionSubtitle: {
    fontSize: { xs: '0.9rem', md: '1rem' },
    color: 'text.secondary',
    lineHeight: 1.6,
  } as SxProps<Theme>,
  
  cardTitle: {
    fontSize: { xs: '1.05rem', md: '1.15rem' },
    fontWeight: 700,
    color: 'text.primary',
  } as SxProps<Theme>,
  
  cardText: {
    fontSize: { xs: '0.9rem', md: '0.95rem' },
    color: 'text.secondary',
    lineHeight: 1.6,
  } as SxProps<Theme>,
};

// Common card styles
export const cardStyles = {
  base: {
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  } as SxProps<Theme>,
  
  elevated: {
    ...spacing.card,
    borderRadius: borderRadius.medium,
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: shadows.cardHover,
      transform: 'translateY(-4px)',
    },
  } as SxProps<Theme>,
  
  gradient: {
    ...spacing.card,
    borderRadius: borderRadius.medium,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as SxProps<Theme>,
};

// Common flex layouts
export const flexLayouts = {
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,
  
  spaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as SxProps<Theme>,
  
  column: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
  
  columnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as SxProps<Theme>,
};

// Common image styles
export const imageStyles = {
  cover: {
    position: 'relative' as const,
    overflow: 'hidden',
    borderRadius: borderRadius.medium,
    '& img': {
      objectFit: 'cover' as const,
    },
  },
  
  avatar: {
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    boxShadow: shadows.card,
  },
};

// Common button styles
export const buttonStyles = {
  primary: {
    bgcolor: 'primary.main',
    color: 'white',
    px: 3,
    py: 1.5,
    borderRadius: borderRadius.medium,
    textTransform: 'none' as const,
    fontWeight: 600,
    '&:hover': {
      bgcolor: 'primary.dark',
    },
  } as SxProps<Theme>,
  
  outlined: {
    borderColor: 'primary.main',
    color: 'primary.main',
    px: 3,
    py: 1.5,
    borderRadius: borderRadius.medium,
    textTransform: 'none' as const,
    fontWeight: 600,
    '&:hover': {
      bgcolor: 'rgba(102, 126, 234, 0.08)',
    },
  } as SxProps<Theme>,
};

// Divider styles
export const dividerStyles = {
  section: {
    width: 120,
    height: 2,
    bgcolor: 'text.secondary',
    mx: 'auto',
    opacity: 0.6,
    my: 1.5,
  } as SxProps<Theme>,
};

// Helper function to merge sx props
export const mergeSx = (...sxProps: (SxProps<Theme> | undefined)[]): SxProps<Theme> => {
  const filtered = sxProps.filter(Boolean) as SxProps<Theme>[];
  if (filtered.length === 0) return {};
  return filtered.reduce((acc, sx) => {
    if (Array.isArray(sx)) {
      return [...(Array.isArray(acc) ? acc : [acc]), ...sx];
    }
    if (Array.isArray(acc)) {
      return [...acc, sx];
    }
    return [acc, sx];
  });
};

export default {
  spacing,
  borderRadius,
  shadows,
  gradients,
  typography,
  cardStyles,
  flexLayouts,
  imageStyles,
  buttonStyles,
  dividerStyles,
  mergeSx,
};