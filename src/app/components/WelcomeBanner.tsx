"use client";

import React from "react";
import { Box, Container, Card, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import reusable utilities
import MotionBox from "./Motion/MotionBox";
import {
  spacing,
  borderRadius,
  flexLayouts,
  buttonStyles,
  mergeSx,
} from "../styles/sharedStyles";

type WelcomeBannerProps = {
  userName: string;
  onDashboardClick: () => void;
};

export default function WelcomeBanner({
  userName,
  onDashboardClick,
}: WelcomeBannerProps) {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #284258 0%, #1a2f3f 100%)",
        py: 3,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox animation="fadeInDown" duration={0.5}>
          <Card
            elevation={0}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.98)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: borderRadius.medium,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                ...flexLayouts.spaceBetween,
                ...spacing.card,
                gap: 3,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {/* Icon/Badge */}
              <MotionBox
                animation="scaleIn"
                delay={0.2}
                sx={flexLayouts.center}
              >
                <Box
                  sx={{
                    ...flexLayouts.center,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    bgcolor: "#e8f5e9",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{
                      fontSize: 36,
                      color: "#2e7d32",
                    }}
                  />
                </Box>
              </MotionBox>

              {/* Content */}
              <MotionBox
                animation="fadeInLeft"
                delay={0.3}
                sx={{
                  flex: 1,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a2f3f",
                    mb: 0.5,
                  }}
                >
                  Welcome back, {userName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.95rem",
                  }}
                >
                  Access your courses, track your progress, and continue your
                  yoga teacher training journey.
                </Typography>
              </MotionBox>

              {/* Action Button */}
              <MotionBox
                animation="fadeInRight"
                delay={0.4}
                hover="scale"
                sx={{ flexShrink: 0 }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={onDashboardClick}
                  sx={{
                    ...buttonStyles.primary,
                    bgcolor: "#284258",
                    boxShadow: "0 4px 12px rgba(40, 66, 88, 0.15)",
                    "&:hover": {
                      bgcolor: "#1a2f3f",
                      boxShadow: "0 6px 16px rgba(40, 66, 88, 0.25)",
                    },
                  }}
                >
                  View Dashboard
                </Button>
              </MotionBox>
            </Box>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
}