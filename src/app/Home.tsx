"use client";

import React from "react";
import { useAuth } from "./hooks/useAuth";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import WelcomeBanner from "./components/WelcomeBanner";
import BannerCarousel from "./components/BannerCarousel";
import TrainerInfo from "./components/Trainer&InstituteInfo";
import WhatWeOffer from "./components/WhatWeOffer";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

export default function Home() {
    const { user, loading, isInitialized } = useAuth();
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    // Automatically show AuthModal after 3 seconds for non-authenticated users
    React.useEffect(() => {
        if (isInitialized && !loading && !user) {
            const timer = setTimeout(() => {
                setShowAuthModal(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loading, user, isInitialized]);

    return (
        <PageTransition>
            <Box sx={{ minHeight: '100vh' }}>
                <Navbar />
                <Toolbar />

                {/* ✅ Auth Modal - Appears automatically after 3 seconds for non-authenticated users */}
                <AuthModal 
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    defaultView="signin"
                />

                {/* ✅ Welcome Banner for Authenticated Users */}
                {user && !loading && isInitialized && (
                    <WelcomeBanner 
                        userName={user.name || 'Student'}
                        onDashboardClick={() => {
                            window.location.href = '/dashboard';
                        }}
                    />
                )}

                <BannerCarousel />
                <TrainerInfo />
                <WhatWeOffer />
                <TestimonialSection />
                <Footer />
            </Box>
        </PageTransition>
    );
}