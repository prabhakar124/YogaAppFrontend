"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography, Container, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Banner_1 from "../../../public/profile.png";
import Banner_2 from "../../../public/human.png";

const slides = [
  { id: 1, src: Banner_1, alt: "Yoga Training Institute" },
  { id: 2, src: Banner_2, alt: "Professional Yoga Training" },
];

const highlights = [
  "500+ satisfied students",
  "Experienced and dedicated yoga teachers",
  "Best Yoga-ed-tech Experience & Support",
  "Career support for yoga professionals",
];

export default function BannerCarousel() {
  return (
    <Box sx={{ width: "100%", mt: { xs: 2, md: 4 } }}>
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
                minHeight: { xs: "auto", sm: 450, md: 550 },
                borderRadius: { xs: 0, md: 2 },
                overflow: "hidden",
                background: (theme) => 
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #4c5fd5 0%, #3d4ea8 50%, #1a3050 100%)'
        : 'linear-gradient(135deg, #5e95ccff 0%, #255aa8ff 50%, #18743fff 100%)',
              }}
            >
              <Container
                maxWidth="lg"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  py: { xs: 6, sm: 8, md: 10 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 4, md: 6 },
                  }}
                >
                  {/* Left Content */}
                  <Box
                    sx={{
                      flex: 1,
                      color: "white",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {/* Badge */}
                    <Box
                      sx={{
                        display: "inline-block",
                        bgcolor: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                        px: 2,
                        py: 0.5,
                        borderRadius: 3,
                        mb: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: 1,
                          color: "white",
                        }}
                      >
                        SINCE 2012
                      </Typography>
                    </Box>

                    {/* Main Heading */}
                    <Typography
                      component="h1"
                      sx={{
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                        fontWeight: 800,
                        lineHeight: 1.1,
                        color: "white",
                        mb: 2,
                        textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      Best Yoga Training Institute In Jaipur
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.95)",
                        mb: 4,
                        maxWidth: 600,
                        mx: { xs: "auto", md: 0 },
                      }}
                    >
                      Transform your Yoga Passion into Profession
                    </Typography>

                    {/* Highlights */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        mb: 4,
                        alignItems: { xs: "center", md: "flex-start" },
                      }}
                    >
                      {highlights.map((highlight, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              fontSize: 20,
                              color: "#ffd54f",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: { xs: "0.875rem", md: "1rem" },
                              color: "rgba(255,255,255,0.95)",
                              fontWeight: 500,
                            }}
                          >
                            {highlight}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* CTA Button */}
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: "white",
                        color: "#255aa8ff",
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: "none",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                        "&:hover": {
                          bgcolor: "#fafafa",
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Start Your Journey →
                    </Button>
                  </Box>

                  {/* Right Content - Image (Circular) */}
                  <Box
                    sx={{
                      flex: { xs: "none", md: 1 },
                      width: { xs: "100%", sm: "80%", md: "auto" },
                      maxWidth: { xs: 400, md: 500 },
                      position: "relative",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        border: "8px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                        sizes="(max-width: 768px) 80vw, 500px"
                        priority
                      />
                    </Box>
                  </Box>
                </Box>
              </Container>

              {/* Decorative Elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: -100,
                  right: -100,
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -50,
                  left: -50,
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: white;
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </Box>
  );
}