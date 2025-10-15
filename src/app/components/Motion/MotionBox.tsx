'use client';
import { motion, MotionProps } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';
import { forwardRef } from 'react';

// Predefined animation variants
export const animationVariants = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  
  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  
  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

// Common transition presets
export const transitions = {
  // Use Framer Motion's string-based easings for compatibility
  smooth: { duration: 0.6, ease: 'easeOut' }, // easeOut
  fast: { duration: 0.3, ease: 'easeInOut' },   // easeInOut
  slow: { duration: 0.8, ease: 'easeOut' },   // easeOut
  bounce: { type: 'spring', stiffness: 300, damping: 20 },
};

// Common hover animations
export const hoverAnimations = {
  lift: { y: -8, transition: transitions.fast },
  scale: { scale: 1.05, transition: transitions.fast },
  glow: { 
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)', 
    transition: transitions.fast 
  },
};

type AnimationType = keyof typeof animationVariants;
type TransitionType = keyof typeof transitions;
type HoverType = keyof typeof hoverAnimations;

interface MotionBoxProps extends Omit<BoxProps, 'component'> {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  transition?: TransitionType;
  hover?: HoverType | boolean;
  viewport?: boolean;
  children: React.ReactNode;
}

// Create a motion-enabled Box component
const MotionBox = forwardRef<HTMLDivElement, MotionBoxProps>(
  (
    {
      animation = 'fadeInUp',
      delay = 0,
      duration,
      transition = 'smooth',
      hover,
      viewport = true,
      children,
      sx,
      ...boxProps
    },
    ref
  ) => {
    const variant = animationVariants[animation];
    const transitionConfig = {
      ...transitions[transition],
      delay,
      ...(duration && { duration }),
    };

    const motionProps: MotionProps = {
      initial: 'hidden',
      animate: viewport ? undefined : 'visible',
      whileInView: viewport ? 'visible' : undefined,
      viewport: viewport ? { once: true, margin: '-100px' } : undefined,
      variants: variant,
      transition: transitionConfig,
    };

    // Add hover animation if specified
    if (hover) {
      if (hover === true) {
        motionProps.whileHover = hoverAnimations.lift;
      } else {
        motionProps.whileHover = hoverAnimations[hover];
      }
    }

    return (
      <Box
        ref={ref}
        component={motion.div}
        {...motionProps}
        sx={sx}
        {...boxProps}
      >
        {children}
      </Box>
    );
  }
);

MotionBox.displayName = 'MotionBox';

export default MotionBox;