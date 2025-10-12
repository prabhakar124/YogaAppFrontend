"use client";

import React from "react";
import { useAuth } from "./hooks/useAuth";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Navbar from "./components/Navbar";
// ❌ Remove: import AuthModal from "./components/AuthModal";
import WelcomeBanner from "./components/WelcomeBanner";
import BannerCarousel from "./components/BannerCarousel";
import TrainerInfo from "./components/Trainer&InstituteInfo";
import WhatWeOffer from "./components/WhatWeOffer";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";

export default function Home() {
    const { user, loading } = useAuth();
    const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

    // Show login prompt after 3 seconds for non-authenticated users
    React.useEffect(() => {
        if (!loading && !user) {
            const timer = setTimeout(() => {
                setShowLoginPrompt(true);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setShowLoginPrompt(false);
        }
    }, [loading, user]);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Toolbar />

            {/* ❌ Remove the AuthModal - let Navbar handle all modals */}

            {/* ✅ Show a banner prompt instead of forcing a modal */}
            {showLoginPrompt && !user && !loading && (
                <Container maxWidth="lg" sx={{ mt: 2 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            background: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, #4c5fd5 0%, #5a3880 100%)'
                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 2
                        }}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                🧘‍♀️ Start Your Yoga Journey Today
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.95 }}>
                                Sign in to access courses, track progress, and join our community
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'white',
                                    color: '#667eea',
                                    '&:hover': { bgcolor: '#f5f5f5' }
                                }}
                                onClick={() => {
                                    // Trigger Navbar's login modal
                                    // You'll need to expose a method or use an event
                                    const loginBtn = document.querySelector('[aria-label="login"]') as HTMLElement;
                                    loginBtn?.click();
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        bgcolor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                                onClick={() => setShowLoginPrompt(false)}
                            >
                                Maybe Later
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            )}

            {/* {user && !loading && (
                <WelcomeBanner 
                    userName={user.name || 'Student'}
                    onDashboardClick={() => {
                        // Trigger Navbar's login modal or redirect to dashboard
                        window.location.href = '/dashboard';
                    }}
                />
            )} */}

            <BannerCarousel />
            <TrainerInfo />
            <WhatWeOffer />
            <TestimonialSection />
            <Footer />
        </Box>
    );
}