"use client";

import React, { useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ✅ Import Redux hooks and actions
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  fetchBlogs,
  setCategory,
  setSortBy,
  setSearchQuery,
} from "../store/slices/blogSlice";

const categories = ["All Blogs", "YTT", "Disease Cure", "Asanas", "Pranayam", "Philosophy", "Meditation"];

export default function BlogPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ✅ Get state from Redux
  const { posts, loading, error, filters } = useAppSelector((state) => state.blog);
  const { category: selectedCategory, sortBy, searchQuery } = filters;

  // ✅ Fetch blogs when component mounts or filters change
  useEffect(() => {
    dispatch(fetchBlogs({
      category: selectedCategory,
      page: 1,
      per_page: 100,
    }));
  }, [dispatch, selectedCategory]);

  // Filter and sort logic (client-side)
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "popular") {
      filtered = [...filtered].reverse();
    } else if (sortBy === "trending") {
      filtered = [...filtered];
    }

    return filtered;
  }, [posts, searchQuery, sortBy]);

  const handleBlogClick = (blogSlug: string) => {
    router.push(`/blog/${blogSlug}`);
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleSortChange = (sort: string) => {
    dispatch(setSortBy(sort));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Toolbar />

      {/* Hero Header */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #4c5fd5 0%, #5a3880 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: "white",
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Yoga Insights & Wisdom
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: 0.95,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Explore ancient practices and modern wellness techniques
          </Typography>
        </Container>
      </Box>

      {/* Category Navigation Bar */}
      <Box
        sx={{
          bgcolor: 'background.paper', // ✅ Use theme color
          borderBottom: "1px solid",
          borderColor: 'divider', // ✅ Use theme color
          position: "sticky",
          top: 64,
          zIndex: 10,
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 2px 8px rgba(255,255,255,0.05)'
              : '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              gap: 2,
              py: 2,
              overflowX: "auto",
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 3,
              },
            }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                sx={{
                  px: 3,
                  py: 1,
                  whiteSpace: "nowrap",
                  borderBottom: selectedCategory === category ? "3px solid #667eea" : "3px solid transparent",
                  borderRadius: 0,
                  color: selectedCategory === category ? "#667eea" : "#555",
                  fontWeight: selectedCategory === category ? 600 : 500,
                  "&:hover": {
                    bgcolor: "rgba(102, 126, 234, 0.08)",
                    borderBottomColor: "#667eea",
                  },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Search and Filter Section */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            mb: 4,
          }}
        >
          <TextField
            placeholder="🔍 Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{
              flex: 1,
              minWidth: 250,
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant={sortBy === "latest" ? "contained" : "outlined"}
            onClick={() => handleSortChange("latest")}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Latest
          </Button>
          <Button
            variant={sortBy === "popular" ? "contained" : "outlined"}
            onClick={() => handleSortChange("popular")}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Popular
          </Button>
          <Button
            variant={sortBy === "trending" ? "contained" : "outlined"}
            onClick={() => handleSortChange("trending")}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Trending
          </Button>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button
              variant="contained"
              onClick={() => dispatch(fetchBlogs({ category: selectedCategory }))}
              sx={{ mt: 2 }}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Blog Cards */}
        {!loading && !error && (
          <Box sx={{ pb: 8 }}>
            {filteredPosts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No articles found matching your criteria
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Try adjusting your search or filter
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredPosts.map((post) => (
                  <Grid size={{ xs: 12 }} key={post.id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        bgcolor: "white",
                        borderRadius: 2,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                        },
                      }}
                      onClick={() => handleBlogClick(post.slug)}
                    >
                      {/* Image */}
                      <Box
                        sx={{
                          width: { xs: "100%", md: 280 },
                          height: { xs: 200, md: "auto" },
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                      </Box>

                      {/* Content */}
                      <CardContent sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            bgcolor: post.categoryColor,
                            color: "white",
                            fontWeight: 600,
                            mb: 1.5,
                          }}
                        />

                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 1.5,
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                            lineHeight: 1.3,
                          }}
                        >
                          {post.title}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 1.5,
                            flexWrap: "wrap",
                            color: "text.secondary",
                            fontSize: "0.875rem",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <PersonIcon fontSize="small" />
                            {post.author}
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CalendarTodayIcon fontSize="small" />
                            {post.date}
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <AccessTimeIcon fontSize="small" />
                            {post.readTime}
                          </Box>
                        </Box>

                        <Typography
                          sx={{
                            color: "text.secondary",
                            mb: 2,
                            lineHeight: 1.6,
                          }}
                        >
                          {post.excerpt}
                        </Typography>

                        {/* Table of Contents Preview */}
                        <Box
                          sx={{
                            bgcolor: "#f8f9fa",
                            p: 2,
                            borderRadius: 1.5,
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              fontSize: "0.9rem",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            📋 Table of Contents:
                          </Typography>
                          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                            {post.tableOfContents.map((item, index) => (
                              <Typography
                                component="li"
                                key={index}
                                sx={{
                                  fontSize: "0.875rem",
                                  color: "text.secondary",
                                  py: 0.5,
                                }}
                              >
                                {item}
                              </Typography>
                            ))}
                          </Box>
                        </Box>

                        <Button
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            bgcolor: "#667eea",
                            borderRadius: 2,
                            px: 3,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#5568d3",
                            },
                          }}
                        >
                          Read Full Article
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}