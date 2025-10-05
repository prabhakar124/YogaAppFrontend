// src/app/components/Home.tsx
"use client";

import BannerCarousel from "../app/components/BannerCarousel";
import TrainerInfo from "../app/components/Trainer&InstituteInfo";
import WhatWeOffer from "../app/components/WhatWeOffer";
import TestimonialSection from "../app/components/TestimonialSection";
import Footer from "../app/components/Footer";
import Navbar from "./components/Navbar"; // Optional: Add navbar
import React from "react";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./context/AuthContext";

export default function Home() {
    const [open, setOpen] = React.useState<boolean>(false);
    const { user, loading } = useAuth();

    // Open dialog on mount only if user is not logged in
    React.useEffect(() => {
        if (!loading && !user) {
            setOpen(true);
        }
    }, [loading, user]);

    return (
        <div className="min-h-screen">
            {/* Optional: Add Navbar */}
            <Navbar />

            {/* Auth Modal - replaces Material-UI Dialog */}
            <AuthModal
                isOpen={open}
                onClose={() => setOpen(false)}
                defaultView="signin"
            />

            {/* Welcome Banner for Logged-in Users */}
            {user && !loading && (
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="text-lg font-semibold">
                                Welcome back, {user.name || user.email}! 🙏
                            </p>
                            <p className="text-sm opacity-90">
                                Continue your yoga journey with us
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                            >
                                My Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing page sections */}
            <BannerCarousel />
            <TrainerInfo />
            <WhatWeOffer />
            <TestimonialSection />
            <Footer />
        </div>
    );
}