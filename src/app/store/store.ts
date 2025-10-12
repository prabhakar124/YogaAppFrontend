import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import blogReducer from './slices/blogSlice';
import courseReducer from './slices/courseSlice';
import cartReducer from './slices/cartSlice';
import paymentReducer from './slices/paymentSlice';
import profileReducer from './slices/profileSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Add this
    blog: blogReducer,
    course: courseReducer,
    cart: cartReducer,
    payment: paymentReducer,
    profile: profileReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;