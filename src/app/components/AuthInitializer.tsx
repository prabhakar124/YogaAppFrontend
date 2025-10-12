'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkSession } from '../store/slices/authSlice';

// This component runs once when the app loads to check for existing session
export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(checkSession());
    }
  }, [dispatch, isInitialized]);

  return null; // This component renders nothing
}