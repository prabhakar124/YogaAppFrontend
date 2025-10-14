"use client";

import React, { use, useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Chip,
    Button,
    Card,
    Divider,
    Toolbar,
    TextField,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
    fetchBlogBySlug,
    fetchRelatedBlogs,
    searchBlogs,
    clearSearchResults,
} from "../../store/slices/blogSlice";

const createId = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id } = use(params);

    const { currentPost: post, relatedPosts, searchResults, loading, error } = useAppSelector(
        (state) => state.blog
    );

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchBlogBySlug(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (post?.id) {
            dispatch(fetchRelatedBlogs(post.id));
        }
    }, [dispatch, post?.id]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) {
                dispatch(searchBlogs(searchQuery));
            } else {
                dispatch(clearSearchResults());
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, dispatch]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        dispatch(clearSearchResults());
    };

    const scrollToSection = (heading: string) => {
        const elementId = createId(heading);
        const element = document.getElementById(elementId);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return (
            <Box sx={{ minHeight: "100vh" }}>
                <Navbar />
                <Toolbar />
                <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4">Blog post not found</Typography>
                    <Button variant="contained" onClick={() => router.push("/blog")}>
                        Back to Blogs
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <PageTransition>
            <Box sx={{ minHeight: "100vh" }}>
                <Navbar />
                <Toolbar />

                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => router.push("/blog")}
                            sx={{
                                mb: 3,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Back to All Blogs
                        </Button>
                    </motion.div>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", lg: "row" },
                            gap: 4,
                        }}
                    >
                        {/* Main Content Column */}
                        <Box sx={{ flex: 1 }}>
                            {/* Header Card */}
                            <Card
                                component={motion.div}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                sx={{ p: { xs: 3, md: 5 }, bgcolor: "background.paper", borderRadius: 2, mb: 4 }}
                            >
                                <Chip
                                    label={post.category}
                                    sx={{
                                        bgcolor: post.categoryColor,
                                        color: "white",
                                        fontWeight: 600,
                                        mb: 2,
                                    }}
                                />

                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 3,
                                        fontSize: { xs: "1.75rem", md: "2.5rem" },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {post.title}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 3,
                                        flexWrap: "wrap",
                                        color: "text.secondary",
                                        mb: 3,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <PersonIcon fontSize="small" />
                                        <Typography variant="body2">By {post.author}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <CalendarTodayIcon fontSize="small" />
                                        <Typography variant="body2">{post.date}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <AccessTimeIcon fontSize="small" />
                                        <Typography variant="body2">{post.readTime}</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ mb: 3 }} />

                                <Box
                                    component={motion.div}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    sx={{
                                        width: "100%",
                                        height: { xs: 250, md: 400 },
                                        position: "relative",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} priority />
                                </Box>
                            </Card>

                            {/* Mobile TOC & Search */}
                            <Box sx={{ display: { xs: "block", lg: "none" } }}>
                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    sx={{ p: 3, mb: 4, bgcolor: "background.paper", borderRadius: 2 }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                                    >
                                        📋 Table of Contents
                                    </Typography>
                                    <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                                        {post.tableOfContents.map((item, index) => (
                                            <Box
                                                component={motion.li}
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                onClick={() => scrollToSection(item)}
                                                sx={{
                                                    py: 1,
                                                    pl: 2,
                                                    cursor: "pointer",
                                                    borderLeft: "3px solid transparent",
                                                    transition: "all 0.2s",
                                                    "&:hover": {
                                                        borderLeftColor: "#667eea",
                                                        color: "#667eea",
                                                        pl: 2.5,
                                                    },
                                                }}
                                            >
                                                <Typography variant="body2">{item}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Card>

                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    sx={{ p: 3, mb: 4, bgcolor: "background.paper", borderRadius: 2 }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                                    >
                                        🔍 Search Blogs
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Search by title..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: searchQuery && (
                                                <InputAdornment position="end">
                                                    <IconButton size="small" onClick={handleClearSearch}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <AnimatePresence>
                                        {searchQuery.trim() && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <Box sx={{ mt: 2 }}>
                                                    {searchResults.length > 0 ? (
                                                        searchResults.map((result, idx) => (
                                                            <motion.div
                                                                key={result.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                            >
                                                                <Box
                                                                    onClick={() => router.push(`/blog/${result.slug}`)}
                                                                    sx={{
                                                                        p: 1.5,
                                                                        mb: 1,
                                                                        borderRadius: 1,
                                                                        cursor: "pointer",
                                                                        border: "1px solid",
                                                                        borderColor: "divider",
                                                                        transition: "all 0.2s",
                                                                        "&:hover": {
                                                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
                                                                            borderColor: "#667eea",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Chip
                                                                        label={result.category}
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: result.categoryColor,
                                                                            color: "white",
                                                                            height: 20,
                                                                            fontSize: "0.7rem",
                                                                            mb: 0.5,
                                                                        }}
                                                                    />
                                                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.4 }}>
                                                                        {result.title}
                                                                    </Typography>
                                                                </Box>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        <Box sx={{ p: 2, textAlign: "center", bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f9fa', borderRadius: 1, border: "1px solid", borderColor: "divider" }}>
                                                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, mb: 0.5 }}>
                                                                No blogs found
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                                                Try searching with different keywords
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </Box>

                            {/* Article Content */}
                            <Card
                                component={motion.div}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                sx={{ p: { xs: 3, md: 5 }, bgcolor: "background.paper", borderRadius: 2, mb: 4 }}
                            >
                                {post.content?.map((section: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Box sx={{ mb: 4 }} id={createId(section.heading)}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: { xs: "1.5rem", md: "2rem" },
                                                    color: "text.primary",
                                                    scrollMarginTop: "100px",
                                                }}
                                            >
                                                {section.heading}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: { xs: "column", md: section.image ? "row" : "column" },
                                                    gap: section.image ? 3 : 0,
                                                    alignItems: section.image ? "flex-start" : "stretch",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        flex: 1,
                                                        color: "text.secondary",
                                                        lineHeight: 1.8,
                                                        fontSize: "1.05rem",
                                                        whiteSpace: "pre-line",
                                                    }}
                                                >
                                                    {section.text}
                                                </Typography>

                                                {section.image && (
                                                    <Box
                                                        sx={{
                                                            width: { xs: "100%", md: 350 },
                                                            height: { xs: 250, md: 280 },
                                                            position: "relative",
                                                            borderRadius: 2,
                                                            overflow: "hidden",
                                                            flexShrink: 0,
                                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                            order: { xs: -1, md: 0 },
                                                            mb: { xs: 2, md: 0 },
                                                        }}
                                                    >
                                                        <Image
                                                            src={section.image}
                                                            alt={section.imageAlt || section.heading}
                                                            fill
                                                            style={{ objectFit: "cover" }}
                                                        />
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Card>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    sx={{ p: { xs: 3, md: 4 }, bgcolor: "background.paper", borderRadius: 2, mb: { xs: 4, lg: 0 } }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                                    >
                                        📚 Related Articles
                                    </Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        {relatedPosts.map((relatedPost, idx) => (
                                            <motion.div
                                                key={relatedPost.id}
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <Box
                                                    onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                                                    sx={{
                                                        display: "flex",
                                                        gap: 2,
                                                        cursor: "pointer",
                                                        p: 2,
                                                        borderRadius: 2,
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        transition: "all 0.3s",
                                                        "&:hover": {
                                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                            transform: "translateY(-2px)",
                                                            borderColor: "#667eea",
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: { xs: 80, sm: 120 },
                                                            height: { xs: 80, sm: 120 },
                                                            position: "relative",
                                                            borderRadius: 1.5,
                                                            overflow: "hidden",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <Image src={relatedPost.image} alt={relatedPost.title} fill style={{ objectFit: "cover" }} />
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Chip
                                                            label={relatedPost.category}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: relatedPost.categoryColor,
                                                                color: "white",
                                                                fontWeight: 600,
                                                                mb: 1,
                                                                height: 22,
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 700,
                                                                mb: 1,
                                                                fontSize: { xs: "1rem", sm: "1.1rem" },
                                                                lineHeight: 1.3,
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                            }}
                                                        >
                                                            {relatedPost.title}
                                                        </Typography>
                                                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", color: "text.secondary", fontSize: "0.8rem" }}>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                                <PersonIcon sx={{ fontSize: 14 }} />
                                                                {relatedPost.author}
                                                            </Box>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                                <AccessTimeIcon sx={{ fontSize: 14 }} />
                                                                {relatedPost.readTime}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </motion.div>
                                        ))}
                                    </Box>
                                </Card>
                            )}

                            {/* Mobile Post Info */}
                            <Card
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, display: { xs: "block", lg: "none" } }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    Post Information
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Category</Typography>
                                        <Typography variant="body2" fontWeight={600}>{post.category}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Published</Typography>
                                        <Typography variant="body2" fontWeight={600}>{post.date}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Author</Typography>
                                        <Typography variant="body2" fontWeight={600}>{post.author}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Read Time</Typography>
                                        <Typography variant="body2" fontWeight={600}>{post.readTime}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>

                        {/* Desktop Sidebar */}
                        <Box sx={{ width: 320, flexShrink: 0, display: { xs: "none", lg: "block" } }}>
                            <Box sx={{ position: "sticky", top: 100 }}>
                                {/* Search - Desktop */}
                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    sx={{ p: 3, mb: 3, bgcolor: "background.paper", borderRadius: 2 }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                        🔍 Search Blogs
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Search by title..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: searchQuery && (
                                                <InputAdornment position="end">
                                                    <IconButton size="small" onClick={handleClearSearch}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <AnimatePresence>
                                        {searchQuery.trim() && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <Box sx={{ mt: 2 }}>
                                                    {searchResults.length > 0 ? (
                                                        searchResults.map((result, idx) => (
                                                            <motion.div
                                                                key={result.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                            >
                                                                <Box
                                                                    onClick={() => router.push(`/blog/${result.slug}`)}
                                                                    sx={{
                                                                        p: 1.5,
                                                                        mb: 1,
                                                                        borderRadius: 1,
                                                                        cursor: "pointer",
                                                                        border: "1px solid",
                                                                        borderColor: "divider",
                                                                        transition: "all 0.2s",
                                                                        "&:hover": {
                                                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
                                                                            borderColor: "#667eea",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Chip
                                                                        label={result.category}
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: result.categoryColor,
                                                                            color: "white",
                                                                            height: 20,
                                                                            fontSize: "0.7rem",
                                                                            mb: 0.5,
                                                                        }}
                                                                    />
                                                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.4 }}>
                                                                        {result.title}
                                                                    </Typography>
                                                                </Box>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        <Box sx={{ p: 2, textAlign: "center", bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f9fa', borderRadius: 1, border: "1px solid", borderColor: "divider" }}>
                                                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, mb: 0.5 }}>
                                                                No blogs found
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                                                Try searching with different keywords
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>

                                {/* TOC - Desktop */}
                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    sx={{ p: 3, mb: 3, bgcolor: "background.paper", borderRadius: 2 }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                        📋 Table of Contents
                                    </Typography>
                                    <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                                        {post.tableOfContents.map((item, index) => (
                                            <Box
                                                component={motion.li}
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                onClick={() => scrollToSection(item)}
                                                sx={{
                                                    py: 1,
                                                    pl: 2,
                                                    cursor: "pointer",
                                                    borderLeft: "3px solid transparent",
                                                    transition: "all 0.2s",
                                                    "&:hover": {
                                                        borderLeftColor: "#667eea",
                                                        color: "#667eea",
                                                        pl: 2.5,
                                                    },
                                                }}
                                            >
                                                <Typography variant="body2">{item}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Card>

                                {/* Post Info - Desktop */}
                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                        Post Information
                                    </Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">Category</Typography>
                                            <Typography variant="body2" fontWeight={600}>{post.category}</Typography>
                                        </Box>
                                        <Divider />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">Published</Typography>
                                            <Typography variant="body2" fontWeight={600}>{post.date}</Typography>
                                        </Box>
                                        <Divider />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">Author</Typography>
                                            <Typography variant="body2" fontWeight={600}>{post.author}</Typography>
                                        </Box>
                                        <Divider />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">Read Time</Typography>
                                            <Typography variant="body2" fontWeight={600}>{post.readTime}</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                </Container>

                <Footer />
            </Box>
        </PageTransition>
    );
}