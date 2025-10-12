// TrainerInfo.tsx (corrected)
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; // <- Grid2
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import img from "../../../public/certification.jpg";
import Image from "next/image";
import logo from "../../../public/lotus.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import logo1 from "../../../public/Logo2.png";
import svg1 from "../../../public/svg1.svg";
import svg2 from "../../../public/svg2.svg";
import svg3 from "../../../public/svg3.svg";
import svg4 from "../../../public/svg4.svg";

const items = [
  {
    id: 1,
    icon: "🧘‍♀️",
    title: "Expert Yoga Teachers",
    subtitle: "Experienced & Certified Yoga Teachers",
  },
  {
    id: 2,
    icon: "💡",
    title: "Ed-Tech Experience",
    subtitle: "Innovative & Ed-Tech learning in YTT",
  },
  {
    id: 3,
    icon: "👩‍🏫",
    title: "Personalized Guidance",
    subtitle: "Receive individual attention.",
  },
  {
    id: 4,
    icon: "🌱",
    title: "Student-Led Learning",
    subtitle: "Meditation, Naturopathy & Yogic",
  },
];

const items2 = [
  {
    id: 1,
    icon: svg1,
    title: "Personalized Experiences",
    subtitle:
      "At YogKulam, we believe in making your yoga journey truly yours — personalized learning to align with your goals.",
  },
  {
    id: 2,
    icon: svg2,
    title: "Real Guidance",
    subtitle:
      "Our real guidance comes from a mix of wise mentors and thoughtful ed-tech to keep you on the right track.",
  },
  {
    id: 3,
    icon: svg3,
    title: "Community Experience",
    subtitle:
      "Being part of YogKulam feels like joining a family that supports your growth through yoga and community.",
  },
  {
    id: 4,
    icon: svg4,
    title: "Flexible Schedules",
    subtitle:
      "We offer flexible schedules so your yoga training fits your life — learn at your pace, from anywhere.",
  },
];

export default function TrainerInfo() {
  return (
    <>
      {/* ABOUT HERO */}
      <Box component="section" sx={{ py: { xs: 6, md: 5 }, bgcolor: "background.paper" }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <Image src={logo} alt="Logo" width={70} height={70} />
            </Box>

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.7rem", md: "2.75rem" },
                fontWeight: 800,
                color: "text.primary",
                mb: 1,
              }}
            >
              About{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                YTT
              </Box>{" "}
              at Yogkulam in Jaipur
            </Typography>

            <Divider
              sx={{
                width: 120,
                height: 2,
                bgcolor: "text.secondary",
                mx: "auto",
                mt: 1.5,
                opacity: 0.6,
              }}
            />
          </Box>

          {/* Content grid */}
          <Grid container spacing={4} alignItems="center">
            {/* Left: text */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ pr: { md: 5 } }}>
                {/* IMPORTANT: the small decorative box inside the paragraph must render inline.
                    We use component="span" for both Boxes to avoid <div> inside <p>. */}
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "text.secondary",
                    lineHeight: 1.7,
                  }}
                >
                  <Box component="span" sx={{ display: "inline-flex", verticalAlign: "top", mr: 1 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        display: "inline-block",
                        mt: "6px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                      }}
                    />
                  </Box>
                  For more than a decade, YogKulam has been a place for learning to become a Yoga Teacher. At YogKulam, we offer different programs for our students. They can choose the ones they like, depending on what they're good at and interested in. These programs teach everything in a simple and organized manner, helping our students become great yoga teachers.
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    fontSize: "1rem",
                    color: "text.secondary",
                    lineHeight: 1.7,
                  }}
                >
                  <Box component="span" sx={{ display: "inline-flex", verticalAlign: "top", mr: 1 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        display: "inline-block",
                        mt: "6px",
                      }}
                    />
                  </Box>
                  As we bring our services to Jaipur, we’re eager to blend the city’s royal heritage with our innovative yoga training programs. Known as the Pink City, Jaipur offers a rich cultural backdrop ideal for a transformative yoga journey. Our mission is to enhance the way our students experience yoga teacher training, combining Jaipur's historical splendor with state-of-the-art technology.
                </Typography>
              </Box>
            </Grid>

            {/* Right: image */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, alignItems: "center" }}>
                <Box
                  sx={{
                    width: { xs: 320, sm: 380, md: 460 },
                    height: { xs: 220, sm: 260, md: 340 },
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <Image
                    src={img}
                    alt="Graduation group"
                    width={460}
                    height={340}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    priority
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Responsive gradient cards row */}
    {/* Responsive gradient cards row */}
<Box
  component="section"
  sx={{
    py: { xs: 4, md: 8 },
    bgcolor: 'transparent',
    px: { xs: 2, sm: 3, md: 12 },
  }}
>
  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
    {items.map((it) => (
      <Grid key={it.id} size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          elevation={6}
          sx={{
            height: "100%",
            minHeight: { xs: 160, md: 200 },
            borderRadius: 2,
            // ✅ Change from hardcoded gradient to theme-aware gradient
            background: (theme) => 
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(139, 159, 238, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
                : 'linear-gradient(180deg, rgba(63, 91, 107, 0.98) 0%, rgba(91, 115, 178, 0.95) 100%)',
            color: "common.white", // ✅ Keep white text in both modes
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 2, md: 3 },
            overflow: "visible",
            transition: "transform .22s ease, box-shadow .22s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            },
          }}
        >
          <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: "white",
                color: "primary.main", // ✅ Use theme color
                width: { xs: 56, md: 72 },
                height: { xs: 56, md: 72 },
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                fontSize: { xs: 22, md: 30 },
              }}
            >
              {it.icon}
            </Avatar>

            <Typography variant="h6" component="h3" sx={{ fontWeight: 700, letterSpacing: "-0.02em", fontSize: { xs: "0.95rem", md: "1.15rem" }, color: "#fff", mt: 0.5 }}>
              {it.title}
            </Typography>

            <Typography sx={{ mt: 0.5, fontSize: { xs: "0.8rem", md: "0.95rem" }, color: "rgba(255,255,255,0.92)", fontWeight: 400, maxWidth: { xs: 260, sm: 320, md: "none" } }}>
              {it.subtitle}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

      {/* Feature list two-column cards */}
      <Box component="section" sx={{ py: { xs: 6, md: 4 }, bgcolor: "background.paper" }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 3, md: 6 } }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Image src={logo1} alt="brand" width={72} height={48} />
            </Box>

            <Typography component="h2" sx={{ fontSize: { xs: "1.6rem", md: "2.6rem" }, fontWeight: 800, color: "text.primary", mb: 1 }}>
              Why Choose YogKulam in Jaipur
            </Typography>

            {/* Changed to component="div" to avoid nested block elements inside <p> */}
            <Typography
              component="div"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: "text.secondary", maxWidth: 920, mx: "auto", mb: 2, lineHeight: 1.6 }}
            >
              At YogKulam, we're not just another YTT brand—we're your yoga journey companions. Our promise: personalized experiences, real guidance, and a community that feels like family. Discover the YogKulam difference — it's more than learning yoga, it's a warm, authentic space for your growth.
            </Typography>

            <Divider sx={{ width: 140, height: 2, bgcolor: "text.secondary", mx: "auto", opacity: 0.6 }} />
          </Box>

          {/* Cards grid (two-column on md, one on xs) */}
          <Box sx={{ mt: { xs: 3, md: 6 } }}>
            <Grid container spacing={3}>
              {items2.map((it) => (
                <Grid key={it.id} size={{ xs: 12, md: 6 }}>
                  <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1.5, backgroundColor: "common.white", p: { xs: 2, md: 3 } }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                        <Box sx={{ minWidth: 82, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Avatar sx={{ width: 70, height: 70, bgcolor: "#FFF1E0", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
                            <Image src={it.icon} alt={it.title} width={70} height={70} />
                          </Avatar>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.05rem", md: "1.15rem" }, color: "text.primary" }}>
                            {it.title}
                          </Typography>

                          <Typography sx={{ mt: 1, color: "text.secondary", fontSize: { xs: "0.9rem", md: "0.95rem" }, lineHeight: 1.6 }}>
                            {it.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
