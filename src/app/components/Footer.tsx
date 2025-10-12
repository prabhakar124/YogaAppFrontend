// src/app/components/Footer.tsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import BoltIcon from "@mui/icons-material/Bolt";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0a0e27' : '#0f2a2a', color: "grey.100", pt: { xs: 6, md: 8 }, pb: { xs: 10, md: 2 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              {/* Sidebar logo - replace with your logo path in public/ */}
              <Box sx={{ width: 48, height: 48, position: "relative" }}>
                <Image src="/lotus.png" alt="YogKulam" fill style={{ objectFit: "contain" }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 18 }, color: "common.white" }}>YogKulam</Typography>
            </Box>

            <Typography sx={{ color: "grey.300", mb: 2, maxWidth: 420 }}>
              3/133, Vikas Nagar, Lucknow, Uttar Pradesh (INDIA)-226022.
              <br />
              For Admission: 1800-891-9232 • Franchise: 1800-891-9232
              <br />
              Support: +91-81888 86939
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<MailOutlineIcon />}
                sx={{
                  color: "grey.200",
                  borderColor: "rgba(255,255,255,0.12)",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                }}
                href="mailto:info@yogkulam.com"
              >
                info@yogkulam.com
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton aria-label="twitter" size="small" sx={{ bgcolor: "rgba(255,255,255,0.04)", color: "white" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="facebook" size="small" sx={{ bgcolor: "rgba(255,255,255,0.04)", color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="youtube" size="small" sx={{ bgcolor: "rgba(255,255,255,0.04)", color: "white" }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton aria-label="instagram" size="small" sx={{ bgcolor: "rgba(255,255,255,0.04)", color: "white" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Middle columns */}
          <Grid size={{ xs: 12,sm: 6, md: 4 }}>
            <Typography sx={{ fontWeight: 700, color: "common.white", mb: 1 }}>Important</Typography>
            <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Join Our Team</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Join YTT Webinar</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Corporate Yoga</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Latest Events</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Media Coverage</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Authorized Study Center</Typography>
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12,sm:6, md: 4 }}>
            <Typography sx={{ fontWeight: 700, color: "common.white", mb: 1 }}>Quick Links</Typography>
            <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Refund Policy</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Privacy Policy</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>FAQ's</Typography>
              </Link>
              <Link href="#" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "grey.300" }}>Raise Ticket</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Right visitors box */}
          {/* <Grid size={{ xs: 12, md: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", md: "flex-end" } }}>
              <Box
                sx={{
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.06)",
                  p: 2,
                  minWidth: 160,
                  textAlign: "center",
                  bgcolor: "rgba(255,255,255,0.02)",
                }}
              >
                <Typography sx={{ color: "grey.400", fontSize: 12 }}>Total visitors</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: 24, color: "common.white", mt: 0.5 }}>9,87,678</Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#c59a5b",
                  color: "common.black",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  "&:hover": { backgroundColor: "#b07f3f" },
                }}
              >
                Mark Attendance
              </Button>
            </Box>
          </Grid> */}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.04)", my: { xs: 4, md: 6 } }} />

        {/* Bottom row: copyright + crafted + pay-now */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Typography sx={{ color: "grey.400", fontWeight: 700 }}>
            © BHARATSHILA INITIATIVE PRIVATE LIMITED. <Box component="span" sx={{ fontWeight: 400 }}>All rights reserved.</Box>
          </Typography>

          <Typography sx={{ color: "grey.400", display: "flex", alignItems: "center", gap: 1 }}>
            Crafted with care •
            <Box component="span" sx={{ ml: 1 }}>
              <Button
                variant="contained"
                startIcon={<BoltIcon />}
                sx={{
                  background: "linear-gradient(90deg,#ffd27a,#ffb35c)",
                  color: "black",
                  textTransform: "none",
                  borderRadius: 4,
                  px: 2,
                  py: 0.6,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                }}
              >
                Pay now
              </Button>
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
