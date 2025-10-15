"use client";
import * as React from "react";
import { Box, Container, Typography, Divider, Card, CardContent, Grid } from "@mui/material";
import Image from "next/image";

// Import reusable utilities
import MotionBox from "./Motion/MotionBox";
import {
  spacing,
  borderRadius,
  typography,
  cardStyles,
  dividerStyles,
  flexLayouts,
  mergeSx,
} from "../styles/sharedStyles";

import ornament from "../../../public/Logo3.png";

/** Inline SVG icons */
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
  {
    id: 1,
    icon: IconVideo,
    title: "Regular Live Classes",
    text: "We offer regular live classes following a schedule. In these classes you'll learn about different subjects and have the chance to ask questions.",
  },
  {
    id: 2,
    icon: IconDoc,
    title: "Recorded Lectures",
    text: "Watch recorded lectures to learn at your own speed and convenience. Catch up on lessons whenever you want.",
  },
  {
    id: 3,
    icon: IconBook,
    title: "Detailed Study Material",
    text: "Explore study materials crafted by our internal research team covering both theoretical and practical sides of YTT.",
  },
  {
    id: 4,
    icon: IconKit,
    title: "Complete Yoga Training Kit",
    text: "You get a free student kit including books, mat, T-shirt and essentials to make your learning experience better.",
  },
  {
    id: 5,
    icon: IconSupport,
    title: "Lifetime Support",
    text: "Our support lasts a lifetime, provided through our Student Care Portal. We're here whenever you need help or advice.",
  },
  {
    id: 6,
    icon: IconBrief,
    title: "Assistance in Job Placement",
    text: "We help connect certified students with job opportunities and career support to turn certification into a career.",
  },
];

export default function WhatWeOffer() {
  return (
    <Box component="section" sx={{ ...spacing.section, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox animation="fadeInDown">
          <Box sx={{ textAlign: "center", mb: { xs: 3, md: 6 } }}>
            <Box sx={{ ...flexLayouts.center, mb: 2 }}>
              <Image src={ornament} alt="ornament" width={72} height={48} priority />
            </Box>

            <Typography sx={typography.sectionTitle}>
              What do we Offer at Yogkulam Jaipur
            </Typography>

            <Typography sx={{ ...typography.sectionSubtitle, maxWidth: 920, mx: "auto", mb: 2 }}>
              Our team is working hard to ensure that you receive all technical and non-technical resources that will help enhance your experience during your YTT journey. Here is our promise regarding what you can expect from our side.
            </Typography>

            <Box sx={flexLayouts.center}>
              <Divider sx={dividerStyles.section} />
            </Box>
          </Box>
        </MotionBox>

        {/* Cards grid */}
        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <MotionBox
                    animation="fadeInUp"
                    delay={index * 0.1}
                    hover="lift"
                    sx={{ height: "100%" }}
                  >
                    <Card
                      elevation={2}
                      sx={{
                        position: "relative",
                        borderRadius: borderRadius.large,
                        border: "1px dotted",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        ...spacing.card,
                        height: "100%",
                        overflow: "visible",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 20px 36px rgba(0,0,0,0.14)",
                        },
                      }}
                    >
                      {/* Corner badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: 56,
                          height: 56,
                          borderRadius: `0 ${borderRadius.large * 8}px 0 ${borderRadius.large * 8}px`,
                          bgcolor: "#B53D19",
                          ...flexLayouts.center,
                          boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                          transition: "background-color .2s ease",
                        }}
                      >
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            bgcolor: "common.white",
                            ...flexLayouts.center,
                            color: "#B53D19",
                          }}
                        >
                          <Icon />
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 0 }}>
                        <Typography sx={{ ...typography.cardTitle, mb: 1 }}>
                          {item.title}
                        </Typography>

                        <Divider sx={{ width: "100%", my: 1.5 }} />

                        <Typography sx={typography.cardText}>{item.text}</Typography>
                      </CardContent>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}