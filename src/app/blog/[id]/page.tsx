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
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Types
interface BlogSection {
    heading: string;
    text: string;
    image?: string;
    imageAlt?: string;
}

interface BlogPost {
    id: string;
    slug: string;
    category: string;
    categoryColor: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    tableOfContents: string[];
    content: BlogSection[];
}

interface RelatedPost {
    id: string;
    slug: string;
    category: string;
    categoryColor: string;
    title: string;
    author: string;
    readTime: string;
    image: string;
}

// Helper function to create URL-friendly IDs from headings
const createId = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<RelatedPost[]>([]);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);

    // Fetch blog post
    useEffect(() => {
        const fetchBlogPost = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setPost(data);
                
                // Fetch related posts
                if (data.id) {
                    fetchRelatedPosts(data.id);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [id]);

    // Fetch related posts
    const fetchRelatedPosts = async (blogId: string) => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${blogId}/related?limit=3`);
            const data = await response.json();
            setRelatedPosts(data);
        } catch (error) {
            console.error('Error fetching related posts:', error);
        }
    };

    // Debounced search functionality
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) {
                searchBlogs(searchQuery);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Search blogs
    const searchBlogs = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs?search=${encodeURIComponent(query)}&per_page=5`);
            const data = await response.json();
            setSearchResults(data.blogs);
        } catch (error) {
            console.error('Error searching blogs:', error);
            setSearchResults([]);
        }
    };

    // Handle search input change
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
    };

    // Smooth scroll function
    const scrollToSection = (heading: string) => {
        const elementId = createId(heading);
        const element = document.getElementById(elementId);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    // Loading state
    if (loading) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    // Not found state
    if (!post) {
        return (
            <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
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
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Navbar />
            <Toolbar />

            <Container maxWidth="xl" sx={{ py: 4 }}>
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

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        gap: 4,
                    }}
                >
                    {/* Main Content Column */}
                    <Box sx={{ flex: 1 }}>
                        <Card sx={{ p: { xs: 3, md: 5 }, bgcolor: "white", borderRadius: 2, mb: 4 }}>
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

                        {/* Table of Contents - Mobile */}
                        <Card sx={{ p: 3, mb: 4, bgcolor: "white", borderRadius: 2, display: { xs: "block", lg: "none" } }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                            >
                                📋 Table of Contents
                            </Typography>
                            <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                                {post.tableOfContents.map((item, index) => (
                                    <Box
                                        component="li"
                                        key={index}
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

                        {/* Search Bar - Mobile */}
                        <Card sx={{ p: 3, mb: 4, bgcolor: "white", borderRadius: 2, display: { xs: "block", lg: "none" } }}>
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
                                            <IconButton
                                                size="small"
                                                onClick={handleClearSearch}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {searchQuery.trim() && (
                                <Box sx={{ mt: 2 }}>
                                    {searchResults.length > 0 ? (
                                        searchResults.map((result) => (
                                            <Box
                                                key={result.id}
                                                onClick={() => router.push(`/blog/${result.slug}`)}
                                                sx={{
                                                    p: 1.5,
                                                    mb: 1,
                                                    borderRadius: 1,
                                                    cursor: "pointer",
                                                    border: "1px solid #f0f0f0",
                                                    transition: "all 0.2s",
                                                    "&:hover": {
                                                        bgcolor: "#f8f9fa",
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
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "0.875rem",
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {result.title}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Box
                                            sx={{
                                                p: 2,
                                                textAlign: "center",
                                                bgcolor: "#f8f9fa",
                                                borderRadius: 1,
                                                border: "1px solid #e0e0e0",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    fontWeight: 500,
                                                    mb: 0.5,
                                                }}
                                            >
                                                No blogs found
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: "text.secondary",
                                                    fontSize: "0.75rem",
                                                }}
                                            >
                                                Try searching with different keywords
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Card>

                        {/* Article Content */}
                        <Card sx={{ p: { xs: 3, md: 5 }, bgcolor: "white", borderRadius: 2, mb: 4 }}>
                            {post.content.map((section, index) => (
                                <Box key={index} sx={{ mb: 4 }} id={createId(section.heading)}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            fontSize: { xs: "1.5rem", md: "2rem" },
                                            color: "#333",
                                            scrollMarginTop: "100px",
                                        }}
                                    >
                                        {section.heading}
                                    </Typography>
                                    
                                    {/* Content with optional image */}
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
                            ))}
                        </Card>

                        {/* Related Posts Section */}
                        {relatedPosts.length > 0 && (
                            <Card sx={{ p: { xs: 3, md: 4 }, bgcolor: "white", borderRadius: 2, mb: { xs: 4, lg: 0 } }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    📚 Related Articles
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    {relatedPosts.map((relatedPost) => (
                                        <Box
                                            key={relatedPost.id}
                                            onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                cursor: "pointer",
                                                p: 2,
                                                borderRadius: 2,
                                                border: "1px solid #f0f0f0",
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
                                                <Image
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                />
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
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 2,
                                                        flexWrap: "wrap",
                                                        color: "text.secondary",
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
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
                                    ))}
                                </Box>
                            </Card>
                        )}

                        {/* Post Info - Mobile */}
                        <Card sx={{ p: 3, bgcolor: "white", borderRadius: 2, display: { xs: "block", lg: "none" } }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                Post Information
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Category
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {post.category}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Published
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {post.date}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Author
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {post.author}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Read Time
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {post.readTime}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Box>

                    {/* Desktop Sidebar */}
                    <Box
                        sx={{
                            width: 320,
                            flexShrink: 0,
                            display: { xs: "none", lg: "block" },
                        }}
                    >
                        <Box sx={{ position: "sticky", top: 100 }}>
                            {/* Search Bar - Desktop */}
                            <Card sx={{ p: 3, mb: 3, bgcolor: "white", borderRadius: 2 }}>
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
                                                <IconButton
                                                    size="small"
                                                    onClick={handleClearSearch}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {searchQuery.trim() && (
                                    <Box sx={{ mt: 2 }}>
                                        {searchResults.length > 0 ? (
                                            searchResults.map((result) => (
                                                <Box
                                                    key={result.id}
                                                    onClick={() => router.push(`/blog/${result.slug}`)}
                                                    sx={{
                                                        p: 1.5,
                                                        mb: 1,
                                                        borderRadius: 1,
                                                        cursor: "pointer",
                                                        border: "1px solid #f0f0f0",
                                                        transition: "all 0.2s",
                                                        "&:hover": {
                                                            bgcolor: "#f8f9fa",
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
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: "0.875rem",
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {result.title}
                                                    </Typography>
                                                </Box>
                                            ))
                                        ) : (
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    textAlign: "center",
                                                    bgcolor: "#f8f9fa",
                                                    borderRadius: 1,
                                                    border: "1px solid #e0e0e0",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "text.secondary",
                                                        fontWeight: 500,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    No blogs found
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "text.secondary",
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Try searching with different keywords
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Card>

                            {/* Table of Contents - Desktop */}
                            <Card sx={{ p: 3, mb: 3, bgcolor: "white", borderRadius: 2 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                                >
                                    📋 Table of Contents
                                </Typography>
                                <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                                    {post.tableOfContents.map((item, index) => (
                                        <Box
                                            component="li"
                                            key={index}
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
                            <Card sx={{ p: 3, bgcolor: "white", borderRadius: 2, mb: 0 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    Post Information
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Category
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {post.category}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Published
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {post.date}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Author
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {post.author}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Read Time
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {post.readTime}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
}