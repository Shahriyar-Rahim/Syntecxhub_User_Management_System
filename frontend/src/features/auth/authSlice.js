import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    token: null 
  },
  reducers: {
    setCredentials: (state, action) => {
      // Destructure based on your backend response keys
      // Backend uses 'data' for user info and 'token' for the JWT
      const { data, token } = action.payload;
      
      state.user = data; 
      state.token = token;
      
      // Optional: Persist to localStorage for session survival
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      
      // Clear persistence
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

// Selectors to make getting data easier in components
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;