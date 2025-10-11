import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  const response = await fetch('http://localhost:4000/api/profile', {
    credentials: 'include',
  });
  return response.json();
});

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (updates: Partial<UserProfile>) => {
    const response = await fetch('http://localhost:4000/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
      credentials: 'include',
    });
    return response.json();
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  },
});

export default profileSlice.reducer;
