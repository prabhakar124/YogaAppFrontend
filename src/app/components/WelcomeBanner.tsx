// src/app/components/WelcomeBanner.tsx
"use client";

import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type WelcomeBannerProps = {
    userName: string;
    onDashboardClick: () => void;
};

export default function WelcomeBanner({ userName, onDashboardClick }: WelcomeBannerProps) {
    return (
        <Box 
            sx={{ 
                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                background: 'linear-gradient(135deg, #284258 0%, #1a2f3f 100%)',
                py: 3,
                borderBottom: '1px solid rgba(0,0,0,0.08)'
            }}
        >
            <Container maxWidth="lg">
                <Card 
                    elevation={0}
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.98)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 3,
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' }
                    }}>
                        {/* Icon/Badge */}
                        <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            bgcolor: '#e8f5e9',
                            flexShrink: 0
                        }}>
                            <CheckCircleOutlineIcon 
                                sx={{ 
                                    fontSize: 36, 
                                    color: '#2e7d32' 
                                }} 
                            />
                        </Box>

                        {/* Content */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: '#1a2f3f',
                                    mb: 0.5
                                }}
                            >
                                Welcome back, {userName}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'text.secondary',
                                    fontSize: '0.95rem'
                                }}
                            >
                                Access your courses, track your progress, and continue your yoga teacher training journey.
                            </Typography>
                        </Box>

                        {/* Action Button */}
                        <Box sx={{ flexShrink: 0 }}>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={onDashboardClick}
                                sx={{
                                    bgcolor: '#284258',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(40, 66, 88, 0.15)',
                                    '&:hover': {
                                        bgcolor: '#1a2f3f',
                                        boxShadow: '0 6px 16px rgba(40, 66, 88, 0.25)',
                                    }
                                }}
                            >
                                View Dashboard
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
}