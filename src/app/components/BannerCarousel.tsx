"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography, Container, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Banner_1 from "../../../public/Yoga1.jpg";
import Banner_2 from "../../../public/Yoga1.jpg";

const slides = [
  { id: 1, src: Banner_1, alt: "Slide 1" },
  { id: 2, src: Banner_2, alt: "Slide 2" },
];

export default function BannerCarousel() {
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: { xs: 520, md: 500 },
                borderRadius: 2,
                overflow: "hidden",
                // main warm gradient background
                background:
                  "linear-gradient(180deg, rgba(84,30,2,0.95) 0%, rgba(216,67,21,0.95) 35%, rgba(244,162,97,1) 100%)",
              }}
            >
              {/* subtle right diagonal highlight */}
              <Box
                sx={{
                  position: "absolute",
                  right: "-10%",
                  top: "-10%",
                  width: "70%",
                  height: "120%",
                  background:
                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06), rgba(255,255,255,0) 40%)",
                  transform: "rotate(-12deg)",
                  pointerEvents: "none",
                }}
              />

              {/* Since 2012 vertical text */}
              <Box
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%) rotate(-90deg)",
                  color: "rgba(255,255,255,0.18)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: 2,
                  zIndex: 3,
                }}
              >
                SINCE 2012
              </Box>

              <Container
                maxWidth="xl"
                sx={{
                  position: "relative",
                  zIndex: 4,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  py: { xs: 4, md: 6 },
                  gap: 4,
                }}
              >
                {/* Left content */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "60%" },
                    color: "common.white",
                    pr: { xs: 0, md: 4 },
                  }}
                >
                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: "2rem", md: "3.8rem" },
                      fontWeight: 800,
                      lineHeight: 1.05,
                      color: "#fff",
                      mb: 2,
                      textShadow: "0 4px 18px rgba(0,0,0,0.25)",
                    }}
                  >
                    Best Yoga Training{" "}
                    <Box component="span" sx={{ display: "inline-block" }}>
                      (YTT) Institute In Jaipur
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.9)",
                      mb: 3,
                    }}
                  >
                    Transform your Yoga Passion into Profession
                  </Typography>

                 

                  {/* Stats */}
                  <Box sx={{ mt: 3, mb: 4 }}>
                    {[
                      "500+ satisfied students",
                      "Experienced and dedicated yoga teachers",
                      "Best Yoga-ed-tech Experience & Support",
                      "Career support for yoga professionals",
                    ].map((s, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "flex-start",
                          mb: 1.2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            backgroundColor: "#FFCC02",
                            borderRadius: "50%",
                            mt: "6px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.95)",
                            fontWeight: 500,
                            fontSize: "0.95rem",
                          }}
                        >
                          {s}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Course icon rows (small) */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      alignItems: "center",
                      mb: { xs: 6, md: 2 },
                    }}
                  >
                    {/* simplified small icons — you can expand */}
                    {[
                      "Advance Diploma",
                      "PG Diploma",
                      "Diploma",
                      "Certificate",
                      "Certificate Pranayama",
                      "Foundation Course",
                      "RYT (Yoga Alliance)",
                    ].map((txt, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          minWidth: 140,
                        }}
                      >
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            background: "#FFF3E0",
                            border: "3px solid #FFCC02",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            color: "#D84315",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                          }}
                        >
                          🧘
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {txt}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Right content: circular image */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "40%" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-end" },
                    position: "relative",
                    pr: { md: 6 },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 220, md: 420 },
                      height: { xs: 220, md: 420 },
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "6px solid rgba(255,255,255,0.9)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                      background: "#fff",
                    }}
                  >
                    {/* use next/image for optimization */}
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      sizes="(max-width: 900px) 220px, 420px"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </Box>
                </Box>
              </Container>

              {/* Apply button center-bottom */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 28,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 5,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#7B1F0F",
                    color: "#fff",
                    px: 4,
                    py: 1.3,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: "0 8px 18px rgba(0,0,0,0.3)",
                    "&:hover": { backgroundColor: "#5A140A" },
                  }}
                >
                  Start your Yogkulam Journey →
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
