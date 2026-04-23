import { createSlice } from '@reduxjs/toolkit';

// Helper to safely parse user from localStorage
const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: getStoredUser(), 
    token: localStorage.getItem('token') || null 
  },
  reducers: {
    setCredentials: (state, action) => {
      const { data, token } = action.payload;
      state.user = data; 
      state.token = token;
      
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;