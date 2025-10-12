import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogAPI } from '@/app/services/api';

// Types
export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tableOfContents: string[];
  content?: any[];
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  relatedPosts: BlogPost[];
  searchResults: BlogPost[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    sortBy: string;
    searchQuery: string;
  };
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  relatedPosts: [],
  searchResults: [],
  loading: false,
  error: null,
  filters: {
    category: 'All Blogs',
    sortBy: 'latest',
    searchQuery: '',
  },
};

// ========================================
// Async Thunks
// ========================================

// Fetch all blogs with filters
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (params?: { category?: string; page?: number; per_page?: number }, { rejectWithValue }: any) => {
    try {
      const data = await blogAPI.getAll({
        page: params?.page || 1,
        per_page: params?.per_page || 100,
        category: params?.category && params.category !== 'All Blogs' ? params.category : undefined,
      });
      return data.blogs;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch single blog by slug
export const fetchBlogBySlug = createAsyncThunk(
  'blog/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      return await blogAPI.getBySlug(slug);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch related blogs
export const fetchRelatedBlogs = createAsyncThunk(
  'blog/fetchRelated',
  async (blogId: string, { rejectWithValue }) => {
    try {
      return await blogAPI.getRelated(blogId, 3);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Search blogs
export const searchBlogs = createAsyncThunk(
  'blog/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await blogAPI.search(query, 5);
      return data.blogs;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// Slice
// ========================================

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.filters.searchQuery = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all blogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single blog
    builder
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPost = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentPost = null;
      });

    // Fetch related blogs
    builder
      .addCase(fetchRelatedBlogs.pending, (state) => {
        // Don't set global loading for related posts
      })
      .addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
        state.relatedPosts = action.payload;
      })
      .addCase(fetchRelatedBlogs.rejected, (state, action) => {
        console.error('Failed to fetch related posts:', action.payload);
      });

    // Search blogs
    builder
      .addCase(searchBlogs.pending, (state) => {
        // Don't set global loading for search
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(searchBlogs.rejected, (state, action) => {
        state.searchResults = [];
      });
  },
});

export const { setCategory, setSortBy, setSearchQuery, clearSearchResults, clearError } = blogSlice.actions;
export default blogSlice.reducer;