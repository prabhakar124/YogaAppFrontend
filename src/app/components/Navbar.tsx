// src/app/components/Home.tsx
"use client";

import BannerCarousel from "./BannerCarousel";
import TrainerInfo from "./Trainer&InstituteInfo";
import WhatWeOffer from "./WhatWeOffer";
import TestimonialSection from "./TestimonialSection";
import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Toolbar from '@mui/material/Toolbar';

export default function Home() {
    const [open, setOpen] = React.useState<boolean>(false);
    const { user, loading } = useAuth();

    // Open dialog on mount only if user is not logged in
    React.useEffect(() => {
        if (!loading && !user) {
            // Optional: Auto-open modal after a delay
            const timer = setTimeout(() => {
                setOpen(true);
            }, 2000); // Opens after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [loading, user]);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar />

            {/* Spacer for fixed AppBar */}
            <Toolbar />

            {/* Auth Modal */}
            <AuthModal
                isOpen={open}
                onClose={() => setOpen(false)}
                defaultView="signin"
            />

            {/* Welcome Banner for Logged-in Users */}
            {user && !loading && (
                <Box sx={{ bgcolor: '#ff6b35', py: 2 }}>
                    <Container maxWidth="lg">
                        <Alert 
                            severity="success" 
                            sx={{ 
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                '& .MuiAlert-icon': {
                                    color: '#ff6b35'
                                }
                            }}
                        >
                            <AlertTitle sx={{ fontWeight: 600 }}>
                                Welcome back, {user.name || user.email}! 🙏
                            </AlertTitle>
                            Continue your yoga journey with us. Ready to practice?
                        </Alert>
                    </Container>
                </Box>
            )}

            {/* Existing page sections */}
            <BannerCarousel />
            <TrainerInfo />
            <WhatWeOffer />
            <TestimonialSection />
            <Footer />
        </Box>
    );
}