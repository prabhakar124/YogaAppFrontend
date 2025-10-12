// WhatWeOffer.tsx
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Image from "next/image";

import ornament from "../../../public/Logo3.png";

/** inline SVG icons */
const IconVideo = () => (
    <svg width="18" height="14" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="0.75" y="1" width="14" height="14" rx="2" stroke="none" fill="currentColor" />
        <path d="M16 4l6-3v14l-6-3V4z" fill="currentColor" />
    </svg>
);
const IconDoc = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="3" y="3" width="14" height="18" rx="2" stroke="none" fill="currentColor" />
        <path d="M7 8h8M7 12h8M7 16h6" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconBook = () => (
    <svg width="18" height="16" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 18V5a2 2 0 0 0-2-2H6.5A1.5 1.5 0 0 0 5 4.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconKit = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="3" y="8" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconSupport = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2a7 7 0 0 0-7 7v3a7 7 0 0 0 7 7 7 7 0 0 0 7-7V9a7 7 0 0 0-7-7z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M9 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);
const IconBrief = () => (
    <svg width="18" height="16" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="2" y="5" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 5V3h8v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const items = [
    { id: 1, icon: IconVideo, title: "Regular Live Classes", text: "We offer regular live classes following a schedule. In these classes you’ll learn about different subjects and have the chance to ask questions." },
    { id: 2, icon: IconDoc, title: "Recorded Lectures", text: "Watch recorded lectures to learn at your own speed and convenience. Catch up on lessons whenever you want." },
    { id: 3, icon: IconBook, title: "Detailed Study Material", text: "Explore study materials crafted by our internal research team covering both theoretical and practical sides of YTT." },
    { id: 4, icon: IconKit, title: "Complete Yoga Training Kit", text: "You get a free student kit including books, mat, T-shirt and essentials to make your learning experience better." },
    { id: 5, icon: IconSupport, title: "Lifetime Support", text: "Our support lasts a lifetime, provided through our Student Care Portal. We're here whenever you need help or advice." },
    { id: 6, icon: IconBrief, title: "Assistance in Job Placement", text: "We help connect certified students with job opportunities and career support to turn certification into a career." },
];

export default function WhatWeOffer() {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: { xs: 3, md: 6 } }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Image src={ornament} alt="ornament" width={72} height={48} priority />
                    </Box>

                    <Typography component="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 1 }}>
                        What do we Offer at Yogkulam Jaipur
                    </Typography>

                    <Typography component="div" sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: "text.secondary", maxWidth: 920, mx: "auto", mb: 2, lineHeight: 1.6 }}>
                        Our team is working hard to ensure that you receive all technical and non-technical resources that will help enhance your experience during your YTT journey. Here is our promise regarding what you can expect from our side.
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                        <Divider sx={{ width: 220, height: 2, bgcolor: "text.secondary", opacity: 0.6 }} />
                    </Box>
                </Box>

                {/* Cards grid (Grid2: using `size` on children) */}
                <Box sx={{ mt: { xs: 3, md: 4 } }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch"> {/* ensure children stretch */}
                        {items.map((it) => {
                            const Icon = it.icon;
                            return (
                                <Grid
                                    key={it.id}
                                    size={{ xs: 12,sm: 6, md: 4 }}
                                    sx={{
                                        display: "flex",          // make the grid item a flex container
                                    }}

                                >
                                    <Card
                                        elevation={2}
                                        sx={{
                                            position: "relative",
                                            borderRadius: 1.25,
                                            border: "1px dotted rgba(0,0,0,0.18)",
                                            backgroundColor: "common.white",
                                            // remove fixed minHeight and let flex sizing control it
                                            display: "flex",
                                            flexDirection: "column",
                                            flex: 1,                 // <-- key: stretch to fill the grid item's height
                                            p: { xs: 2, md: 3 },
                                            overflow: "visible",
                                            transition: "transform .25s ease, box-shadow .25s ease",
                                            "&:hover": {
                                                transform: "translateY(-6px)",
                                                boxShadow: "0 20px 36px rgba(0,0,0,0.14)",
                                            },
                                            "&:hover .corner-badge": {
                                                bgcolor: "#8b2b10",
                                            },
                                            "&:hover .corner-badge .corner-icon": {
                                                transform: "scale(1.08) rotate(12deg)",
                                                transition: "transform .28s cubic-bezier(.2,.9,.3,1)",
                                            },
                                        }}
                                    >
                                        {/* corner badge */}
                                        <Box
                                            className="corner-badge"
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                width: 56,
                                                height: 56,
                                                borderRadius: "0 12px 0 12px",
                                                bgcolor: "#B53D19",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                                                transition: "background-color .2s ease",
                                            }}
                                        >
                                            <Box
                                                className="corner-icon"
                                                sx={{
                                                    width: 34,
                                                    height: 34,
                                                    borderRadius: "50%",
                                                    bgcolor: "common.white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#B53D19",
                                                    transform: "scale(1) rotate(0deg)",
                                                    transition: "transform .2s ease",
                                                }}
                                                aria-hidden
                                            >
                                                <Box component="span" sx={{ display: "inline-flex", color: "#B53D19" }}>
                                                    <Icon />
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* make CardContent stretch to push content and keep equal height */}
                                        <CardContent sx={{ p: 0, width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
                                            {/* Title */}
                                            <Box>
                                                <Typography
                                                    component="h3"
                                                    sx={{ fontSize: { xs: "1.05rem", md: "1.15rem" }, fontWeight: 700, color: "text.primary", mb: 1 }}
                                                >
                                                    {it.title}
                                                </Typography>

                                                {/* small divider under title */}
                                                <Box sx={{ width: "100%", borderTop: "1px solid rgba(0,0,0,0.08)", my: 1.5 }} />
                                            </Box>

                                            {/* Body - this box will take the remaining vertical space */}
                                            <Box sx={{ color: "text.secondary", fontSize: { xs: "0.9rem", md: "0.95rem" }, lineHeight: 1.6, mt: 0 }}>
                                                {it.text}
                                            </Box>

                                            {/* If you want bottom spacing or an action area you can add it here.
                  Using flex: 1 ensures every card's vertical distribution is consistent. */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
