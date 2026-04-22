import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../api/axiosInstance';

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: { status: axiosError.response?.status, data: axiosError.response?.data },
      };
    }
  };

export const authApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'Post'], 
  endpoints: (builder) => ({
    // --- AUTH ENDPOINTS ---
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        data: userData,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    // --- USER MANAGEMENT ENDPOINTS ---
    getUsers: builder.query({
      query: (id) => ({ 
        url: id ? `?id=${id}` : '/', 
        method: 'GET' 
      }),
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/create',
        method: 'POST',
        data: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PUT',
        data: patch,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    deleteManyUsers: builder.mutation({
      query: (ids) => ({
        url: '/api/users',
        method: 'DELETE',
        data: { ids }, 
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteManyUsersMutation,
} = authApiSlice;