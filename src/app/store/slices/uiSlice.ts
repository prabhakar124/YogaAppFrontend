import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  notifications: Notification[];
  loading: boolean;
  themeMode: 'light' | 'dark'; // ✅ Add this
}

const initialState: UIState = {
  notifications: [],
  loading: false,
  themeMode: 'light', // ✅ Default to light mode
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // ✅ Add theme toggle actions
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', action.payload);
      }
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', state.themeMode);
      }
    },
    initializeTheme: (state) => {
      // Load from localStorage on init
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedTheme) {
          state.themeMode = savedTheme;
        }
      }
    },
  },
});

export const { 
  addNotification, 
  removeNotification, 
  setLoading,
  setThemeMode, // ✅ Export
  toggleTheme, // ✅ Export
  initializeTheme, // ✅ Export
} = uiSlice.actions;

export default uiSlice.reducer;