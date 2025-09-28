// src/app/components/Home.tsx
"use client";

import BannerCarousel from "../app/components/BannerCarousel";
import TrainerInfo from "../app/components/Trainer&InstituteInfo";
import WhatWeOffer from "../app/components/WhatWeOffer";
import TestimonialSection from "../app/components/TestimonialSection";
import Footer from "../app/components/Footer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import DialogContent from "@mui/material/DialogContent";
import SignIn from "./components/SignIn";
// import SignIn from "./SignIn"; // uncomment if needed

export default function Home() {

    const [open, setOpen] = React.useState<boolean>(true);

    // keep dialog open on mount — optional: ensures true on client mount
    React.useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                {/* Title bar with close button */}
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* Content */}
                <DialogContent sx={{ p: 0 }}>
                    <SignIn compact onSuccess={() => setOpen(false)} />
                </DialogContent>
            </Dialog>

            <BannerCarousel />
            <TrainerInfo />
            <WhatWeOffer />
            <TestimonialSection />
            <Footer />
        </div>

    );
}
