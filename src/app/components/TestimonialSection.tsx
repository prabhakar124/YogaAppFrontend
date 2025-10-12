// src/app/components/TestimonialSection.tsx
"use client";

import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import avatar1 from "../../../public/profile.png"
import avatar2 from "../../../public/human.png"
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * TestimonialSection
 * - self-contained testimonials array (no props)
 * - groups testimonials into slides (3 per slide)
 * - each slide shows up to 3 testimonials horizontally on md+, stacks on small screens
 */

/* Sample testimonials (update avatar paths to images in /public) */
const testimonials = [
  {
    id: 1,
    avatar: avatar1,
    quote:
      "YogKulam is one of the best institutes to learn yoga for professional practice. Staff is very well behaved, organised and always ready to help — learning is easy and fun.",
    name: "UTKARSHA SINGH",
    location: "Azamgarh",
    rating: 5,
  },
  {
    id: 2,
    avatar: avatar2,
    quote:
      "I am doing the PGDYT course from YogKulam. All the teachers here make us understand every subject very well. Teachers cover topics completely and clear all the doubts.",
    name: "NEETU MEHTO",
    location: "Lucknow",
    rating: 4,
  },
  {
    id: 3,
    avatar: avatar1,
    quote:
      "Got to learn and understand a lot by joining YogKulam. My physical, mental and social health has become full of positive energy thanks to the gurus’ guidance.",
    name: "DR. KAUSHALYA",
    location: "Jaunpur",
    rating: 4,
  },
  {
    id: 4,
    avatar: avatar2,
    quote:
      "Excellent support and resources — recorded lectures and study materials helped me revise at my own pace. The student community is very encouraging.",
    name: "SONIA VERMA",
    location: "Jaipur",
    rating: 5,
  },
  {
    id: 5,
    avatar: avatar1,
    quote:
      "Friendly teachers and thorough lessons. The practical sessions built my confidence to teach and the course was well organized.",
    name: "RAHUL KUMAR",
    location: "Aligarh",
    rating: 5,
  },
  {
    id: 6,
    avatar: avatar2,
    quote:
      "The instructors are knowledgeable and very supportive. This course truly transformed my understanding of yoga practice and teaching.",
    name: "PRIYA SINGH",
    location: "Jaipur",
    rating: 5,
  },
];

/* helper: chunk array into subarrays of n */
function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) {
    out.push(arr.slice(i, i + n));
  }
  return out;
}

export default function TestimonialSection(): JSX.Element {
  // group 3 per slide
  const slides = useMemo(() => chunk(testimonials, 3), []);

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.paper" }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "1.5rem", md: "2.4rem" }, fontWeight: 800, mb: 1, color: "text.primary" }}
          >
            Our Student's Feedback and Success Stories in Jaipur
          </Typography>

          <Typography
            component="div"
            sx={{
              color: "text.secondary",
              maxWidth: 980,
              mx: "auto",
              mb: 2,
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.6,
            }}
          >
            Here is our community on social media. Keep up with our latest news, events, and ideas! Follow us on social
            media to get regular updates and join our lively community.
          </Typography>
                    <Divider sx={{ width: 120, height: 2, bgcolor: "text.secondary", mx: "auto", opacity: 0.6, my: 1 }} />

        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {/* left heading column */}
          <Grid key="left" size={{ xs: 12, md: 4 }}>
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: 800,
                lineHeight: 1.05,
                color: "text.primary",
                mb: 2,
              }}
            >
              What Yoga Students Say
              <Box component="br" />
              About YogKulam in Jaipur
            </Typography>

            <Typography component="div" sx={{ color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.8 }}>
              <strong>YogKulam</strong> gives wisdom and receives value, good word of mouth, and a lot of love from its
              students. Read some stories below from our recent graduates — their journeys show how learning yoga changes
              lives.
            </Typography>
          </Grid>

          {/* right Swiper column */}
          <Grid key="right" size={{ xs: 12, md: 8 }}>
            <Box sx={{ px: { xs: 0, md: 2 } }}>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                // navigation
                style={{ width: "100%" }}
              >
                {slides.map((group, slideIndex) => (
                  <SwiperSlide key={slideIndex}>
                    {/* slide content: grid with up to 3 testimonials */}
                    <Box sx={{ width: "100%", py: { xs: 1, md: 2 } }}>
                      <Grid container spacing={3}>
                        {group.map((t) => (
                          <Grid key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card
                              elevation={0}
                              sx={{
                                height: "100%",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                                p: { xs: 2, md: 2.5 },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                position: "relative",
                                bgcolor: "common.white",
                              }}
                            >
                              {/* avatar */}
                              <Box
                                sx={{
                                  width: 84,
                                  height: 84,
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  mb: 1.5,
                                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                                  border: "3px solid #fff",
                                  background: "#f5f5f5",
                                }}
                              >
                                <Image src={t.avatar} alt={t.name} width={84} height={84} style={{ objectFit: "cover" }} />
                              </Box>

                              {/* quote */}
                              <CardContent sx={{ p: 0 }}>
                                <Typography
                                  component="p"
                                  sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: "0.88rem", md: "0.95rem" },
                                    lineHeight: 1.6,
                                    mb: 1.25,
                                  }}
                                >
                                  {t.quote}
                                </Typography>

                                {/* Read more link */}
                                <Typography
                                  component="div"
                                  sx={{ color: "primary.main", fontSize: "0.9rem", mb: 1, cursor: "pointer" }}
                                >
                                  Read More
                                </Typography>

                                {/* name, location, rating */}
                                <Box sx={{ mt: 0.5 }}>
                                  <Typography sx={{ fontWeight: 700 }}>{t.name}</Typography>
                                  <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 0.75 }}>
                                    {t.location}
                                  </Typography>
                                  <Rating name="read-only" value={t.rating} readOnly size="small" />
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* center the pagination bullets (swiper injects pagination elements) */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  ".swiper-pagination": {
                    display: "flex",
                    gap: 1.25,
                    alignItems: "center",
                    "& .swiper-pagination-bullet": {
                      width: 10,
                      height: 10,
                      opacity: 0.6,
                      background: "#cfcfcf",
                    },
                    "& .swiper-pagination-bullet-active": {
                      background: "#1976d2",
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
