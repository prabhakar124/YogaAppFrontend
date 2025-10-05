// src/app/Home.tsx
"use client";

import React from "react";
import { useAuth } from "./context/AuthContext";
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

export default function Home() {
    const [open, setOpen] = React.useState<boolean>(false);
    const { user, loading } = useAuth();

    React.useEffect(() => {
        if (!loading && !user) {
            const timer = setTimeout(() => {
                setOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [loading, user]);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Toolbar />

            <AuthModal
                isOpen={open}
                onClose={() => setOpen(false)}
                defaultView="signin"
            />

            {user && !loading && (
                <WelcomeBanner 
                    userName={user.name || 'Student'}
                    onDashboardClick={() => setOpen(true)}
                />
            )}

            <BannerCarousel />
            <TrainerInfo />
            <WhatWeOffer />
            <TestimonialSection />
            <Footer />
        </Box>
    );
}