import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await fetch('http://localhost:4000/api/blogs');
  return response.json();
});

export const fetchBlogBySlug = createAsyncThunk('blog/fetchBySlug', async (slug: string) => {
  const response = await fetch(`http://localhost:4000/api/blogs/${slug}`);
  return response.json();
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.blogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      });
  },
});

export default blogSlice.reducer;

