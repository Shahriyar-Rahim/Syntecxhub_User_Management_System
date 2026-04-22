import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../features/auth/authApiSlice'; // Ensure this match
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});